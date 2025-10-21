import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext';
import Button from './Button'

export default function Pagar() {
  const location = useLocation();
  const navigate = useNavigate();

  const {usuario, cerrarSesion, cart, vaciarCarrito} = useAppContext()

  // Calculo del total
  const total = cart.reduce(
    (suma, producto) => suma + Number(producto.price),
    0
  );

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

        {cart.map((producto) => (
          <div key={producto.id}>
            <img src={producto.img} alt={producto.nombre} width="60" />
            <span>{producto.name}</span>
            <strong>${producto.price}</strong>
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