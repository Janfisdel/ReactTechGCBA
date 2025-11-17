import React from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../context/CartContext';

export default function Cart() {
  const {cart, vaciarCarrito, eliminarDelCarrito, quitarCantidad, agregarCantidad, total} =useCartContext()
  const navigate = useNavigate()
 

  const irAPagar = ()=>{
    navigate("/pagar", {state:{cart}}
    )}

  return (
    <div>
      <h2>Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id}>
              <img src={item.img} alt={item.name} width="60" />  {item.name}  - Precio unitario: ${item.price} -  
              Subtotal: ${Number(item.price*item.cantidad)}  <Button text="+" onClick={()=>{agregarCantidad(item.id)}} />   {item.cantidad}  <Button text="-" onClick={()=>{quitarCantidad(item.id)}} />
               <Button text="Eliminar" onClick={()=>{eliminarDelCarrito(item.id)}} />             
            </div>
          ))}

          <div>
            <hr />
            Total: ${Number(total)}
          </div>
          <Button  text="Vaciar carrito" onClick={()=>{vaciarCarrito()}}/>
          <Button text="Pagar" onClick={()=>{irAPagar()}} />
        </>
      )}
    </div>
  );
}