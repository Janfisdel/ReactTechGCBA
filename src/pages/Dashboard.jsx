import React from 'react'
import { useAuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import Button from './Button'

function Dashboard() {
    const {usuario, cerrarSesion} = useAuthContext()

    const tokenActual = localStorage.getItem("authToken")
  return (
    <div>
        <h1>Dashboar administativo</h1>
        <div>
            <p>Sesión iniciadad como {usuario.nombre} </p>
            <p>Token de autenticacion:</p>
            <code>{tokenActual} </code>
        </div>

        <div>
            <h3>Acciones:</h3>
            <div>
               <Link to="/agregarProducto"> <Button text="Agregar producto"/></Link>
               <Link to="/productos"><Button text="Ver/Editar todos los productos"/></Link>
            </div>
        </div>

        <Button onClick={()=>cerrarSesion() }text="Cerrar sesión" />

    </div>
  )
}

export default Dashboard