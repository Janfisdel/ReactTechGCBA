import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav>
      <div className="divLogo">
        <img
          className="logo"
          src="https://res.cloudinary.com/janfis/image/upload/v1747698402/GCBA%20-%20Front/earth_jxdslq.png"
          alt="logo"
        />
      </div>
      <div>
        <h1 className='titulo'>TIENDA TLV</h1>
      </div>
        <ul>
            
            <li>Productos</li>
            <li>Carrito</li>
            <li>Iniciar sesión</li>
        </ul>
    </nav>
  )
}

export default Navbar