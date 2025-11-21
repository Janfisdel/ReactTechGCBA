import React, {createContext, useState, useContext, useEffect, Children} from "react";

export const ProductsContext = createContext()

export const ProductsProvider = ({children}) =>{
    const [products, setProducts] =useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)

    const validarProducto = (product)=>{
        const errores ={}

        if(!product.price?.trim()){
            errores.price = "El precio es obligatorio"
        }

        if(!product.name?.trim()){
            errores.name ="El nombre es obligatorio"
        }

        if(!product.description?.trim()){
            errores.description = "La descripción es obligatoria"
        }else if(product.description.length <10){
            errores.description = "Minimo 10 caracteres"
        }else if(product.description.length>200){
            errores.description = "Máximo 200 caracteres"
        }

        return errores
    }

    //Validacion de formulario
    const validar = (product)=>{
        const errores = validarProducto(product)
        return {
            esValido:Object.keys(errores).length ===0,
            errores
        
        }
    }

    useEffect(()=>{
        const cargarProductos = async ()=> {
            try{
                const respuesta = await fetch('https://68d876bf2144ea3f6da823e1.mockapi.io/api/tiendaTLV')
                if(!respuesta.ok) throw new Error('Error al cargar productos')
                const datos = await respuesta.json()
                setProducts(datos)
            }catch(error){
                console.error('Error al cargar productos:', error)
                setError("Ocurrió un problema al cargar los productos")
            }finally{
                setCargando(false)
            }
        }
        cargarProductos()
    },[])

    const agregarProducto = async(nuevoProduto)=>{
        try{
            const respuesta = await fetch('https://68d876bf2144ea3f6da823e1.mockapi.io/api/tiendaTLV', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(nuevoProduto)
            })
            
            if(!respuesta.ok) throw new Error('Error al agregar el producto')
            
            const data = await respuesta.json()
            setProducts(prev =>[...prev, data])
            return data
        }catch(error){
            console.error('Error al agregar producto:', error)
            throw error
        }
    }

    const editarProducto = async (productoActualizado) =>{
        try{
            const respuesta = await fetch(`https://68d876bf2144ea3f6da823e1.mockapi.io/api/tiendaTLV/${productoActualizado.id}`,{
                method:'PUT',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify(productoActualizado)
            })
            
            if(!respuesta.ok) throw Error('Error al editar el producto')
            
            const data = await respuesta.json()
            setProducts(prev => prev.map(product=> product.id === productoActualizado.id?data:product))

            return data
        }catch(error){
            console.error('Error al editar el producto:', error)
            throw error
        }
    }

    return(
        <ProductsContext.Provider
            value={{
                products,
                cargando,
                error,
                agregarProducto,
                editarProducto,
                validarProducto,
                validar 
            }}>
            {children}
        </ProductsContext.Provider>
    )
}

//Hook para el contexto
export const  useProducts =()=>{
    const context = useContext(ProductsContext)
    if(!context){
        throw new Error('useProducts debe ser usado dentro de un ProductsProvider')
    }
    return context
}