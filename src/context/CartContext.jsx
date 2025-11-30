import { createContext, useContext, useEffect, useState} from "react";
import { toast} from "react-toastify";

export const CartContext = createContext()

export function CartProvider({children}){
   
    const [cart, setCart] = useState([]);
    const [cargaCompleta, setCargaCompleta] = useState(false)

    useEffect(()=>{
      const carritoGuardado = localStorage.getItem("cart")
      if(carritoGuardado){
        setCart(JSON.parse(carritoGuardado))
      }
      setCargaCompleta(true)
    },[])

    useEffect(()=>{
      if(cargaCompleta){
        localStorage.setItem("cart", JSON.stringify(cart))
      }
    },[cart, cargaCompleta])

    const agregarCarrito = (product)=>{
            setCart(prevCart =>{
                const productExiste =prevCart.find(item=>item.id ===product.id)

                if(productExiste){
                    return prevCart.map(item=>
                        item.id === product.id 
                        ?{...item, cantidad:(item.cantidad) +1}
                        :item
                    )
                }else{
                    return[...prevCart, {...product,cantidad:1}]
                }
            })
            toast.success(`Se agregó ${product.name} al carrito`)
    }

    const eliminarDelCarrito = (prodId)=>{
        setCart(cart.filter(item=>item.id !== prodId))
    }

    const vaciarCarrito = () => {
     setCart([]);
    };

    const quitarCantidad = (idProduct) => {
    const nuevoCart = cart.map(product => {
      if (product.id === idProduct) {
        const cantidadActual = product.cantidad || 1
        if (cantidadActual === 1) {
          return null
        }
        return { ...product, cantidad: cantidadActual - 1 }
      }
      return product;
    }).filter(product => product !== null);


    setCart(nuevoCart)
  };

    const agregarCantidad = (idProduct) => {
    const nuevoCart = cart.map(product => {
      if (product.id === idProduct) {
        return {...product, cantidad: (product.cantidad) + 1}
      }
      return product
    });
    setCart(nuevoCart)
  };

   const total = cart.reduce((sum, item) => sum + Number(item.price*item.cantidad), 0);

    

    const value = { 
        //Carrito
        cart,
        agregarCarrito,
        vaciarCarrito,
        eliminarDelCarrito,
        quitarCantidad,
        agregarCantidad,
        total

    }

    return(
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )

}

export function useCartContext(){
    const context = useContext(CartContext)
    if (!context) {
        throw new Error("useCartContext debe usarse dentro de CartProvider")
    }
    return context
    
}
