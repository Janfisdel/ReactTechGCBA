import {useState, useEffect} from 'react'
import { Link, useNavigate} from 'react-router-dom'
import Button from './Button';
import Loading from './Loading';
import { useCartContext } from '../context/CartContext'
import { useAuthContext} from '../context/AuthContext'
import { useProducts } from '../context/ProductsContext';


function Products() {
  const {products, cargando, error} = useProducts()
  const navigate = useNavigate()
  const {agregarCarrito} = useCartContext()
  const {esAdmin} = useAuthContext()

  useEffect(()=>{
    document.title= "Tienda TLV - Deli, fit & fresh"

    //Función para actualizar meta tags
    const updateMetaTag = (name, content, attribute = 'name') =>{
      let meta = document.querySelector(`meta[${attribute}="${name}"]`)
      if(!meta){
        meta = document.createElement('meta')
        meta.setAttribute(attribute, name)
        document.head.appendChild(meta)
      }
      meta.content = content
    }

    updateMetaTag('description', 'Visita nuestra tienda de productos saludables y frescos. Conoce nuestros productos para una vida mas fit')
    updateMetaTag('keywords', 'Alimentos, bebidas, snack, saludable, fit, fresh')
    updateMetaTag('author', 'Jana Fisdel')
    updateMetaTag('robots', 'index, follow')

    //Open Graph
    updateMetaTag('og:title', 'Tienda TLV', 'property');
    updateMetaTag('og:description', 'Visita nuestra tienda de productos saludables y frescos.', 'property');
    updateMetaTag('og:type', 'website', 'property');
    updateMetaTag('og:image', 'https://tudominio.com/logo.jpg', 'property');
    updateMetaTag('og:url', window.location.href, 'property');
  },[])

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
    <ul id='product-list'>
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

        {/* <Button text="Agregar al carrito" onClick={()=>onAgregarCarrito()} /> */}

        {esAdmin ? (
          <div>
            <Button onClick={()=>onEditar()} text="Editar" />
            <Button onClick={()=>onEliminar()} text="Eliminar" />
          </div>
        ): <Button text="Agregar al carrito" onClick={()=>onAgregarCarrito()} /> }

    </li>
)

export default Products

