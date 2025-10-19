import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from './Button'

export default function Pagar({
  isAuthenticated,
  setIsAuthenticated,
  usuario,
  setUsuario,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  // Datos del carrito
  const cart = location.state?.cart || [];
  // Calculo del total
  const total = cart.reduce(
    (suma, producto) => suma + Number(producto.price),
    0
  );

  // Función para finalizar compra
  const comprar = () => {
    alert("¡Compra realizada con éxito!");
    navigate("/productos");
  };

  // Función para cerrar sesión
  const cerrarSesion = () => {
    setIsAuthenticated(false);
    setUsuario({ nombre: "", email: "" });
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