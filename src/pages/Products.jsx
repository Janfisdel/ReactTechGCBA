import {useState, useEffect} from 'react'
import { Link, useNavigate} from 'react-router-dom'
import Button from './Button';
import Loading from './Loading';
import { useCartContext } from '../context/CartContext'
import { useAuthContext} from '../context/AuthContext'
import { useProducts } from '../context/ProductsContext';


function Products() {
  // const [products, setProducts] = useState([]);
  // const [cargando, setCargando] = useState(true);
  // const [error, setError] = useState(null);
  const {products, cargando, error} = useProducts()
  const navigate = useNavigate()
  const {agregarCarrito} = useCartContext()
  const {esAdmin} = useAuthContext()

  const manejarEliminar = (product) =>{
    navigate('/eliminar-productos', {state:{product}} )
  }

  const manejarEditar = (product) =>{
    navigate('/formulario-producto',{state:{product}})
  }


  if (cargando) return (<Loading/>)
  if (error) return <p></p>

  return(
    <>
    <ul id="lista-productos">
        {products.map((product)=>(
          <ProductItem
          key={product.id}
          product={product}
          esAdmin={esAdmin}
          onEditar={()=>manejarEditar(product)}
          onEliminar={()=>manejarEliminar(product)}
          onAgregarCarrito={()=>agregarCarrito(product)}/>
        ))}
    </ul>
    </>
  )

  // useEffect( ()=>{
  //   fetch("https://68d876bf2144ea3f6da823e1.mockapi.io/api/tiendaTLV")
  //       .then((respuesta)=>respuesta.json())
  //       .then((data)=>{
  //           setProducts(data)
  //           setCargando(false)
  //       })
  //       .catch((error)=>{
  //           {console.log("Error!,", error)}
  //           setError("Hubo un problema al cargar los productos")
  //           setCargando(false)
  //       })
  //       },[])

        

        
  // return (
  //   <>
  //       <ul id='product-list'>
  //           {products.map((product)=>(
  //              <li key={product.id}>
  //               <h2>{product.name} </h2>
  //               <br />
  //               <p>{product.description} </p>
  //               <br />
  //               <p>$ {product.price} </p>
  //               <br />
  //               <img className="product-img" src={product.img} alt={product.name}/>
  //               <Link to={`/productos/${product.category || 'sin-categoria'}/${product.id}`} state={{product}}>
  //                 <Button text="Más detalles" />
  //               </Link>
  //              <Button  text="Agregar al carrito" onClick={()=>agregarCarrito(product)}/>

  //               {/* Botones solo para administradores */}
  //               {esAdmin && (
  //                 <div>
  //                   <Button text="Editar" onClick={()=>navigate("/editar-productos",{state:{product:product}})}/>
  //                   <Button text="Eliminar" onClick={()=>navigate("/eliminar-productos",{state:{product:product}})}/>
  //                 </div>

  //               )}
  //              </li> 
  //               ))}

  //       </ul>
  //              <Link to="/carrito"><Button text="Ir al carrito" /></Link>
  //   </>
  // )
}

const ProductItem =({product, esAdmin, onEditar, onEliminar, onAgregarCarrito})=>(
    <li>
        <h2>{product.name}</h2>
        <p>Descripción: {product.description}</p>
        <img src={product.img} alt={product.name} className="product-img" />
        <p>Precio: ${product.price}</p>
        <Link to={`/productos/${product.id}`} state={{product}}>
                  <Button text="Más detalles" />
         </Link>

        <Button text="Agregar al carrito" onClick={()=>onAgregarCarrito()} />

        {esAdmin && (
          <div>
            <Button onClick={()=>onEditar()} text="Editar" />
            <Button onClick={()=>onEliminar()} text="Eliminar" />
          </div>
        )}

    </li>
)

export default Products

