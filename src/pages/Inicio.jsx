import React from 'react'
import { Link } from "react-router-dom";
import Button from './Button';

function Inicio() {
  return (
<>
<div className='containerCarousel'>


<div className="carousel">
  <div className="slides">
    <div className="slide"><img src="https://res.cloudinary.com/janfis/image/upload/v1760717873/GCBAReact/banner_portada_horizontal_roibep.jpg" alt="Banner 1" /></div>
    <div className="slide"><img src="https://res.cloudinary.com/janfis/image/upload/v1760717873/GCBAReact/TLVcomprando_rsswzn.jpg" alt="Banner 2" /></div>
    <div className="slide"><img src="https://res.cloudinary.com/janfis/image/upload/v1760717872/GCBAReact/TLVdirecciones_zgc5m8.jpg" alt="Banner 3" /></div>
  </div>
</div>
</div>
<Link to={`/productos`}><Button text="Conocé nuestros productos" /></Link>


  </>
   
  )
}

export default Inicio


// FALTA CAMBIAR LAS IMAGENES POR ALGUNAS QUE SE ADAPTEN COMPLETAMENTE AL FORMATO DE INICIO