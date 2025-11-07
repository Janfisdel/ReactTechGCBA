import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCartContext } from '../context/CartContext'
import {useAuthContext} from '../context/AuthContext'

function Navbar() {

  const {cart, vaciarCarrito} = useCartContext()
  const {isAuthenticated, cerrarSesion, usuario} =useAuthContext()
  const navigate =useNavigate()
  const cantTotal = cart.reduce((sum, item) => sum + Number(item.cantidad), 0);

   const manejarCerrarSesion = () => {
    navigate("/productos");
    
    setTimeout(() => {
      vaciarCarrito();
      cerrarSesion();
    }, 100);
  };
 
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
        <h2 className='subtitulo'>Deli, fit & fresh</h2>
      </div>
        <ul>
           <li> <Link to={`/productos`}>  Productos</Link></li>
          <li >
          {isAuthenticated ? 
           usuario.nombre === "admin"?(
            <>
            <Link to="/dashboard">Dashboard</Link>
            <a onClick={cerrarSesion}> Cerrar sesión</a>
            </>
           ):(        
            <div className='navCarrito'>
              <Link to="/carrito">Carrito:<div className='cart-length'> {cantTotal} </div></Link>
              <a onClick={manejarCerrarSesion}> Cerrar sesión</a>
            
            </div>
          ) : (
            <Link to="/iniciar-sesion">Iniciar Sesión</Link>
          )}
        </li>

            
        </ul>
    </nav>
  )
}

export default Navbar
