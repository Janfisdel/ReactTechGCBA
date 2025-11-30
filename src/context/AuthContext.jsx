import { createContext, useContext, useState, useEffect } from "react"

//crear contexto de autenticacion
export const AuthContext = createContext()

//Proveedor de autenticacion
export function AuthProvider({children}){
    const [usuario, setUsuario] = useState(null)
    const [cargando, setCargando]=useState(true)

    useEffect(()=>{
        const token = localStorage.getItem("authToken")
        const emailGuardado = localStorage.getItem("authEmail")
        
        if (token){
            const username = token.replace("fake-token-","")
            setUsuario({nombre:username, email:emailGuardado || ""})
        }
        setCargando(false)
    },[])

    const iniciarSesion = (username, emailIngresado) =>{
        const token = `fake-token-${username}`
        localStorage.setItem("authToken", token)
        localStorage.setItem("authEmail", emailIngresado)

        // const emailGuardado = localStorage.getItem("authEmail")
        setUsuario({nombre:username, email: emailIngresado || ""})
    }
    const cerrarSesion =()=>{
        localStorage.removeItem("authToken")
        localStorage.removeItem("authEmail")
        setUsuario(null)
    }

    const value={
        isAuthenticated: !!usuario,
        usuario,
        iniciarSesion,
        cerrarSesion,
        esAdmin: usuario?.nombre ==="admin",
        cargando
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

