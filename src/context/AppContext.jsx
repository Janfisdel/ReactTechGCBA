import { createContext, useContext, useState} from "react";

export const AppContext = createContext()

export function AppProvider({children}){
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [usuario, setUsuario] = useState({nombre:"", email:""})
    const [cart, setCart] = useState([]);

    const agregarCarrito = (product)=>{
            setCart([...cart, product])
            alert(`Producto ${product.name} agregado al carrito`)
        }

    const eliminarDelCarrito = (prodId)=>{
        setCart(cart.filter(item=>item.id !== prodId))
    }

     const vaciarCarrito = () => {
    setCart([]);
  };

    const cerrarSesion =()=>{
        setIsAuthenticated(false)
        setUsuario({nombre:"", email:""})
        vaciarCarrito()
    }

    const value = {
        //Autenticacion
        isAuthenticated,
        setIsAuthenticated,
        usuario,
        setUsuario,
        cerrarSesion,

        //Carrito
        cart,
        agregarCarrito,
        vaciarCarrito,
        eliminarDelCarrito

    }

    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )

}

export function useAppContext(){
    const context = useContext(AppContext)
    if (!context) {
        throw new Error("useAppContext debe usarse dentro de AppProvider")
    }
    return context
    
}
