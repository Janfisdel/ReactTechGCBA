import { createContext, useContext, useState} from "react";

export const AppContext = createContext()

export function AppProvider({children}){
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [usuario, setUsuario] = useState({nombre:"", email:""})
    const [cart, setCart] = useState([]);

    const agregarCarrito = (product)=>{
            setCart(prevCart =>{
                const productExiste =prevCart.find(item=>item.id ===product.id)

                if(productExiste){
                    return prevCart.map(item=>
                        item.id === product.id 
                        ?{...item, cantidad:(item.cantidad || 1) +1}
                        :item
                    )
                }else{
                    return[...prevCart, {...product,cantidad:1}]
                }
            })
            alert(`Se agregó ${product.name} al carrito`)
    }

    const eliminarDelCarrito = (prodId)=>{
        setCart(cart.filter(item=>item.id !== prodId))
    }

    const vaciarCarrito = () => {
     setCart([]);
    };

    const quitarCantidad = (idProduct) => {
    const cartActualizado = cart.map(product => {
      if (product.id === idProduct) {
        const cantidadActual = product.cantidad || 1;
        if (cantidadActual === 1) {
          return null;
        }
        return { ...product, cantidad: cantidadActual - 1 };
      }
      return product;
    }).filter(product => product !== null);


    setCart(cartActualizado);
  };

    const agregarCantidad = (idProduct) => {
    const nuevoCart = cart.map(product => {
      if (product.id === idProduct) {
        return {
          ...product,
          cantidad: (product.cantidad || 1) + 1
        };
      }
      return product;
    });
    setCart(nuevoCart);
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
        eliminarDelCarrito,
        quitarCantidad,
        agregarCantidad

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
