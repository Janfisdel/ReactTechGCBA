import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

function RutaProtegida({children}) {
    const {isAuthenticated} =useAuthContext()
    const location = useLocation()

    if (!isAuthenticated){
        return(
            <Navigate to="/iniciar-sesion" state={location.state} replace />
        )
    }
  return children
}

export default RutaProtegida