import React from 'react'
import { Link, useParams, useLocation } from "react-router-dom";
import Button from './Button';

function ProductsDetail() {
    const {id} =useParams()
    const location = useLocation()
    const product = location.state.product

    if (!product){
        return(
            <div>
                 <p>No se pudo cargar el producto</p>
        <Link to="/productos">
          <button>Volver a Productos</button>
           <Button  text="Volver a Productos"/>
        </Link>
            </div>
        )
    }

  return (
    <div>
        <h2>{product.name}</h2>
        <br />
        <img className="product-img" src={product.img} alt={product.name}/>
        <p>{product.description}</p>
        <p>{product.price}</p>
         <Button  text="Agregar al carrito"/>
        <Link to="/productos"><Button  text="Volver"/></Link>
    </div>
  )
}

export default ProductsDetail
