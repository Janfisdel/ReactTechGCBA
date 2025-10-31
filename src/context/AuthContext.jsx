import { createContext, useContext, useState } from "react"

export const AuthContext = createContext()

export function AuthProvider({children}){
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [usuario, setUsuario] = useState(null)

    const cerrarSesion =()=>{
        setIsAuthenticated(false)
        setUsuario({nombre:"", email:""})
        vaciarCarrito()
    }

    const value={
        //Autenticacion
        isAuthenticated,
        setIsAuthenticated,
        usuario,
        setUsuario,
        cerrarSesion,
    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}

export function useAuthContext(){
    const context = useContext(AuthContext)
    if(!context){
        throw new Error("useAuthContext debe usarse dentro de AuthProvider")
    }
    return context
}


//ver after 9 min 57