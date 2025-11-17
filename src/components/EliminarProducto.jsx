import React,{useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../pages/Button'

function EliminarProducto() {
    const location = useLocation()
    const navigate = useNavigate()
    const product = location.state?.product
    const [cargando, setCargando] = useState(false)

    const EliminarProducto = async()=>{
        if(!product) return;

        setCargando(true)
        try{
            const respuesta = await
            fetch(`https://68d876bf2144ea3f6da823e1.mockapi.io/api/tiendaTLV/${product.id}`,{
                method:'DELETE'
            })
            if(!respuesta.ok){
                throw new Error('Error al eliminar el producto')
            }
            alert('Producto eliminado correctamente')
            navigate('/productos')
            setTimeout(()=>{
                window.location.reload()
            },100)
        }catch(error){
            console.error(error.message)
            alert('Ocurrió un problema al eliminar el producto')
        }finally{
            setCargando(false)
        }
    }

    const manejarEliminar = ()=>{
        const confirmar =window.confirm(`¿Estás seguro de que deseas eliminar el producto "${product.name}"?\n\nEsta acción no se puede deshacer.`)
        if (confirmar){
            EliminarProducto()
        }
    }
  return (
        <div>
            <h2>Eliminar Producto</h2>
            <div>

            
            <h3>¿EstásEstas seguro que deseas eliminar este producto?</h3>
            <div>
                <p>Nombre: {product.name} </p>
                <p>Precio: ${product.price} </p>
                <p>Categoria: {product.category || 'Sin categoría'}</p>
                <p>Descripción: {product.description} </p>
                {product.img && (
                    <img src={product.img} alt="Producto eliminar" style={{maxWidth:'200px', marginTop:'10px'}} />
                )}
            </div>

            <p>Esta acción no se puede deshacer.</p>
            </div>
            <div>
            <Button disabled={cargando} onClick={()=>manejarEliminar()} text={cargando? 'Eliminando' : 'Eliminar'} />
            <Button disabled={cargando} onClick={()=>navigate('/productos')} text="Cancelar"/>
            </div>
        </div>
  )
}

export default EliminarProducto

//VER QUE AL PONER NAVIGATE AL IR A PRODUCTO SALE DEL ADMIN