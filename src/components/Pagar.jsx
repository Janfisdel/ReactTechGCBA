import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCartContext } from '../context/CartContext';
import { useAuthContext } from '../context/AuthContext';
import Button from './Button'

export default function Pagar() {
  const location = useLocation();
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

      <div>
        <h2>Tu compra:</h2>

        {cart.map((product) => (
          <div key={product.id}>
            <img src={product.img} alt={product.name} width="60" />
            <span>{product.name} - cantidad:{product.cantidad} - </span>
            <strong>${product.price*product.cantidad}</strong>
          </div>
        ))}

        <h3>Total a pagar: ${total}</h3>
      </div>

      <div>
        <Button onClick={()=>comprar() }text="Comprar y pagar" />
        <Button onClick={()=>{navigate("/productos")}} text="Cancelar" />
       
      </div>
    </div>
  );
}