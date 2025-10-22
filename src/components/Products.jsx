import {useState, useEffect} from 'react'
import { Link} from 'react-router-dom'
import Button from './Button';
import Loading from './Loading';
import { useAppContext } from '../context/AppContext';

function Products() {
  const [products, setProducts] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  
  const {agregarCarrito} = useAppContext()

  useEffect( ()=>{
    fetch("https://68d876bf2144ea3f6da823e1.mockapi.io/api/tiendaTLV")
        .then((respuesta)=>respuesta.json())
        .then((data)=>{
            setProducts(data)
            setCargando(false)
        })
        .catch((error)=>{
            {console.log("Error!,", error)}
            setError("Hubo un problema al cargar los productos")
            setCargando(false)
        })
        },[])

        

        if (cargando) return (<Loading/>)
        if (error) return <p></p>
  return (
    <>
        <ul id='product-list'>
            {products.map((product)=>(
               <li key={product.id}>
                <h2>{product.name} </h2>
                <br />
                <p>{product.description} </p>
                <br />
                <p>$ {product.price} </p>
                <br />
                <img className="product-img" src={product.img} alt={product.name}/>
                <Link to={`/productos/${product.category || 'sin-categoria'}/${product.id}`} state={{product}}><Button text="Más detalles" /></Link>
               <Button  text="Agregar al carrito" onClick={()=>agregarCarrito(product)}/>
               </li> 
                ))}

        </ul>
               <Link to="/carrito"><Button text="Ir al carrito" /></Link>
    </>
  )
}

export default Products

