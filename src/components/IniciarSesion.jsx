import React, {useState} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Button from './Button'
import { useAuthContext } from '../context/AuthContext'

function IniciarSesion() {
    const navigate = useNavigate()
    const ubicacion = useLocation()

    const {isAuthenticated, setIsAuthenticated, setUsuario} = useAuthContext()

    const [formulario, setFormulario] = useState({nombre:'', email: ''})

    const manejanEnvio = (e)=>{
        e.preventDefault()
        if(formulario.nombre && formulario.email){
            setIsAuthenticated(true)
            setUsuario(formulario)
            console.log(isAuthenticated)
            if (ubicacion.state?.cart){
                navigate('/pagar', {state:{cart: ubicacion.state.cart}})
            }else{
                navigate('/productos')
            }
        }else {
            alert('Complete todos los datos')
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
   </div>
  )
}

export default IniciarSesion