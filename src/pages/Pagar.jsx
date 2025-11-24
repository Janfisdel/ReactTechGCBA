import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCartContext } from '../context/CartContext';
import { useAuthContext } from '../context/AuthContext';
import Button from './Button'

export default function Pagar() {
  const navigate = useNavigate();
  const {cart, vaciarCarrito, total} = useCartContext()
  const {usuario, cerrarSesion} =useAuthContext()

  // Función para finalizar compra
  const comprar = () => {
    alert("¡Compra realizada con éxito!");
    navigate("/productos");
    vaciarCarrito()
  };

  return (
    <div>
      <div>
        <h2>{usuario.nombre}</h2>
        <p>Email: {usuario.email}</p>
        <Button onClick= {()=>cerrarSesion()} text="Cerrar sesión" />
        <hr />
      </div>

      <div className='p-5'>
        <h2 className='mb-4'>Tu compra:</h2>

        {cart.map((product) => (
          <div key={product.id} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <img src={product.img} alt={product.name} width="60" />

             <div>
                    <div className="fs-5 fw-bold text-success">{product.name}</div>
                  
                    <div className="border-bottom">Cantidad: {product.cantidad}</div>
                    <div className="mb-4"><strong>Subtotal: ${product.price*product.cantidad} </strong></div>
             </div>
          </div>
        ))}

        <h3 className='fs-4 fw-bold text-darkk bg-light rounded-4 shadow-m p-3'>Total a pagar: ${total}</h3>
      </div>

      <div>
        <Button onClick={()=>comprar() }text="Comprar y pagar" />
        <Button onClick={()=>{navigate("/productos")}} text="Cancelar" />
        {cart.length !== 0 && (
          
            <Button onClick={()=>{vaciarCarrito()}} text="Vaciar" />
            
        )}
        
       
      </div>
    </div>
  );
}