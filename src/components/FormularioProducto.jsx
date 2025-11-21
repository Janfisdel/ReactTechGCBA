import React, {useState, useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ProductsProvider, useProducts } from "../context/ProductsContext";

function FormularioProducto() {
    const navigate = useNavigate()
    const location =useLocation()
    const {agregarProducto, editarProducto, validar} =useProducts()

    const productoRecibido = location.state?.product
    const modo = productoRecibido ? "editar" :"agregar"

    const [product, setProduct] = useState({
        id:'',
        name:'',
        price:'',
        description:'',
        category:'',
        img:''
    })
    
    const [errores, setErrores] =useState({})
    const [cargando, setCargando] =useState(false)

    useEffect(()=>{
        if(modo ==="editar" && productoRecibido){
            setProduct({
                id:productoRecibido.id || '',
                name: productoRecibido.name || '',
                price: productoRecibido.price || '',
                description: productoRecibido.description || '',
                category: productoRecibido.category || '',
                img: productoRecibido.img || ''
            })
        }
    }, [modo, productoRecibido])

    const manejarCambio = (e)=>{
        const {name, value} = e.target 

        if(name=== 'description' && value.length >200) return;

        setProduct(prev=>({...prev, [name]:value}))

        //limpiar errores
        if(errores[name]){
            setErrores(prev=>({...prev, [name]}))
        }
    }

    const validarFormulario =()=>{
        const resultado = validar(product)
        setErrores(resultado.errores)
        return resultado.esValido
    }

    const manejarEnvio = async(e)=>{
        e.preventDefault()

        if(!validarFormulario())return;

        setCargando(true)
        try{
            const productoEnviar ={...product}
            
            if(modo ==="agregar"){
                const nuevoProducto = await agregarProducto(productoEnviar)
                alert(`Se agregó ${nuevoProducto.name} correctamente.`)

                setProduct({
                    id:'',
                     name:'',
                price:'',
        description:'',
        category:'',
        img:''
                })
            
                setTimeout(()=>{
                    navigate('/productos')
                }, 100)
            }else {
                await editarProducto(productoEnviar)
                alert('Producto actualizado correctamente')
                setTimeout(()=>{
                    navigate('/productos')
                }, 100)
            }
        setErrores({})
        }catch(error){
            alert(`Ocurrió un problema al ${modo ==="editar" ? "actualizar" :"agregar"} el producto`)
            console.error("Error:", error)
        }finally{
            setCargando(false)
        }
    }

    const cancelarEdicion () =>{
        if (modo ==="editar"){
            alert("Edición cancelada")
            navigate("/productos")
        }
    }
  return (
    <form onSubmit={manejarEnvio}>
        <h2>{modo === "editar" ? "Editar" : "Agregar"} Producto</h2>

        {modo ==="editar" && productoRecibido &&(
            <p>Editando:{productoRecibido.name}</p>
            
        )}
    {/* NO COMPROBE QUE FUNCIONA. FALTA AGREGAR AL RETURN DESDE LINEA 135 DEL EJEMPLO. Luego probar si funciona y seguir video */}
    </form>
  )
}

export default FormularioProducto
