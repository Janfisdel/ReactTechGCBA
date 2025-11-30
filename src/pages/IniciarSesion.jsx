import React, {useState} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Button from './Button'
import { useAuthContext } from '../context/AuthContext'

function IniciarSesion() {
    const {iniciarSesion} = useAuthContext()
    const navigate = useNavigate()
    const ubicacion = useLocation()

    const [formulario, setFormulario] = useState({nombre:'', email: ''})

    const manejanEnvio = (e)=>{
        e.preventDefault()

        //verificacion de credenciales
        if(formulario.nombre=== "admin" && formulario.email ==="1234@admin"){
           localStorage.setItem("authEmail", formulario.email)
           iniciarSesion("admin", formulario.email)
           navigate("/dashboard")
        }else if (formulario.nombre && formulario.email && formulario.nombre !== "admin") {
           localStorage.setItem("authEmail", formulario.email)
           iniciarSesion(formulario.nombre, formulario.email)

           if(ubicacion.state?.cart){
            navigate("/pagar", {state:{cart:ubicacion.state.cart}})
           }else{
            navigate("/productos")
           }
        }else{
            alert ("Credenciales de administrador incorrectas.")
        }
    }
    
  return (
   <div>
        <h1>Iniciar sesión para continuar</h1>
        <form onSubmit={manejanEnvio}>
            <input type="text" placeholder='Nombre completo' 
            value={formulario.nombre} onChange={(e)=>setFormulario({...formulario, nombre:e.target.value})} required />
            <input type="email" placeholder='Email'
            value={formulario.email} onChange={(e)=>setFormulario({... formulario, email:e.target.value})} required />

            <Button type={"submit"} text="Iniciar sesión" />
            <Button onClick={()=>navigate('/productos')} text="Cancelar" />
        </form>

           <p style={{ marginTop: "20px", fontSize: "12px", color: "#666" }}>
        <strong>Credenciales de prueba para Dashboard:</strong>
        <br />
        Nombre: admin
        <br />
        Email: 1234@admin
      </p>
   </div>
  )
}

export default IniciarSesion