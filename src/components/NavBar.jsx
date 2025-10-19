import React from 'react'
import { Link } from 'react-router-dom'


function Navbar() {

  return (
    <nav>
      <div className="divLogo">
        <Link to={`/`}>
        
        <img
          className="logo"
          src="https://res.cloudinary.com/janfis/image/upload/v1760717417/GCBAReact/TLVlogo_tmglgl.jpg"
          alt="logo"
        /></Link>
      </div>
      <div>
        <h1 className='titulo'>TIENDA TLV</h1>
      </div>
        <ul>
            <Link to={`/productos`}>  <li>Productos</li></Link>
            <Link to= {`/iniciar-sesion`}><li>Iniciar sesión</li></Link>
            
        </ul>
    </nav>
  )
}

export default Navbar