import React from 'react'
import { Link } from "react-router-dom";

function Inicio() {
  return (
<>

<div className="carousel">
  <div class="slides">
    <div className="slide"><img src="https://res.cloudinary.com/janfis/image/upload/v1760656726/GCBAReact/istockphoto-1410766826-612x612_wles06.jpg" alt="Banner 1" /></div>
    <div className="slide"><img src="https://res.cloudinary.com/janfis/image/upload/v1760656933/GCBAReact/qadsfd_f4c6rn.png" alt="Banner 2" /></div>
    <div className="slide"><img src="https://res.cloudinary.com/janfis/image/upload/v1760657029/GCBAReact/cvbn_wugwzn.jpg" alt="Banner 3" /></div>
  </div>
</div>

<Link to={`/productos`}><button>Mira todos los productos de nuestra tienda</button></Link>


  </>
   
  )
}

export default Inicio


// FALTA CAMBIAR LAS IMAGENES POR ALGUNAS QUE SE ADAPTEN COMPLETAMENTE AL FORMATO DE INICIO