import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { useAuthContext } from "../context/AuthContext";
import styled from 'styled-components';
import { FaCartShopping } from "react-icons/fa6";

function Navbar() {
  const { cart, vaciarCarrito } = useCartContext();
  const { isAuthenticated, cerrarSesion, usuario } = useAuthContext();
  const navigate = useNavigate();
  const cantTotal = cart.reduce((sum, item) => sum + Number(item.cantidad), 0);

  const manejarCerrarSesion = () => {
    navigate("/productos");

    setTimeout(() => {
      vaciarCarrito();
      cerrarSesion();
    }, 100);
  };

  return (
    <NavbarContainer className="navbar navbar-expand-lg fixed-top">
      <div className="container-fluid">
        <Logo to="/" className="navbar-brand"><img
          className="logo"
          src="https://res.cloudinary.com/janfis/image/upload/v1760717417/GCBAReact/TLVlogo_tmglgl.jpg"
          alt="logo"
        /> </Logo>
          
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav mb-2 mb-lg-0" >
            <li className="nav-item">
              <Link to="/productos" className="nav-text nav-link">Productos</Link>
            </li>
          <li className="nav-item">
          {isAuthenticated ? 
           usuario.nombre === "admin"?(
            <>
            <span className="nav-text">Hola, {usuario.nombre} </span>
            <Link to="/dashboard" className="nav-text">Dashboard</Link>
            <a onClick={cerrarSesion} className="nav-text"> Cerrar sesión</a>
            </>
           ):(        
            <div>
              <span className="nav-text">Hola, {usuario.nombre}</span>
              {cantTotal >0 &&(
                <Link to="/carrito" className='cart-length nav-text'>
                  <div> 
                       <FaCartShopping />
                        <span className='contador'>{cantTotal}</span>
                  </div>
                </Link>
              )}
               
              <a onClick={manejarCerrarSesion} className="nav-text"> Cerrar sesión</a>
            
            </div>
          ) : (
            <Link to="/iniciar-sesion" className="nav-text">Iniciar Sesión</Link>
          )}
        </li>
          </ul>

        </div>
      </div>
    </NavbarContainer>
  );
}

export default Navbar;

//Styled components

const NavbarContainer = styled.nav`
  background-color:rgba(212, 125, 163, 1) !important;
  padding: 0.5rem 1rem;
`;

const Logo = styled(Link)`
  border-radius:50%;
  display: inline-block;
  width: 5.5rem;
  height:5.5rem;
  padding:0.3rem;
`

