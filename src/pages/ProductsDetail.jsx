import React from 'react'
import { Link, useParams, useLocation } from "react-router-dom";
import { useCartContext } from '../context/CartContext';
import Button from './Button';

function ProductsDetail() {
    const {id} =useParams()
    const location = useLocation()
    const product = location.state.product

    const {agregarCarrito} = useCartContext()

    if (!product){
        return(
            <div>
                 <p>No se pudo cargar el producto</p>
        <Link to="/productos">
           <Button  text="Volver a Productos"/>
        </Link>
            </div>
        )
    }

  return (
    <div className='container-md py-3'>
        <h2 className='mb-3'>{product.name}</h2>
        <div className='row align-items-start g-0 mb-4'>
          <div className='col-md-6'>
            <div className='card border-0'>
              <div className='card-body text-center p-2'>
                  <img className="detail-img" src={product.img} alt={product.name}/>
              </div>
            </div>
          </div>

        <div className='col-md-6'>
          <div className='card border-0'>
            <div className='card-body p-1'>
              <div className='mb-2'>
                <strong>Descripción:</strong>
                <p className='card-text mb-1'>{product.description} </p>
              </div>
              <div className='mb-2'>
                <strong>Categoría:</strong>
                <span className='badge bg-secondary ms-1'>{product.category} </span>
              </div>
              <div className='mb-2'>
                <strong>Precio: $</strong>
                <span className='card-text mb-1'>{product.price} </span>

              </div>

            </div>

          </div>
        </div>
        </div>
       
         <Button  text="Agregar al carrito" onClick={()=>agregarCarrito(product)}/>
        <Link to="/productos"><Button  text="Volver"/></Link>
    </div>
  )
}

export default ProductsDetail
