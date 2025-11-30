import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import Loading from './Loading'

function RutaProtegida({children}) {
    const {isAuthenticated, cargando} =useAuthContext()
    const location = useLocation()

    if(cargando){
        return(
            <Loading />
        )
    }
    if (!isAuthenticated){
        return(
            <Navigate to="/iniciar-sesion" state={location.state} replace />
        )
    }
  return children
}

export default RutaProtegida