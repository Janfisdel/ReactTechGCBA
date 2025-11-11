import React, {useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from './Button'

function EditarProductos() {
    const {state} =useLocation()
    const navigate = useNavigate()
    const productOriginal = state.product 

    const [product, setProduct] = useState({...productOriginal})
    const [cargando, setCargando] = useState(false)

    const manejarCambio = (e) =>{
        const {name, value} =e.target
        setProduct(prev =>({...prev, [name]:value}))
    }

    const manejarEnvio = async(e)=>{
        e.preventDefault()
        setCargando(true)
        try{
            const productEnviar = {...product}
            const respuesta = await fetch(`https://68d876bf2144ea3f6da823e1.mockapi.io/api/tiendaTLV/${product.id}`,
                {method:'PUT',
                 headers:{'Content-Type': 'application/json'},
                 body: JSON.stringify(productEnviar)
                })
            if (!respuesta.ok) throw new Error('Error al actualizar')
            alert('Producto actualizado correctamente')
            navigate('/productos')
        }catch(error){
            alert('Error al actualizar el producto')
            console.error(error)
        }finally{
            setCargando(false)
        }
    }

      const cancelarEdicion = () => {
    alert('Edición cancelada');
    navigate('/productos');
  };
  return (
    <div>
      <h2>Editar Producto</h2>
      <form onSubmit={manejarEnvio}>
        <div>
            <label>Nombre: </label>
            <input type="text" name="name" value={product.name} onChange={manejarCambio} />
        </div>

        <div>
            <label>Precio: </label>
            <input type="number" name="price" value={product.price} onChange={manejarCambio} />
        </div>
        <div>
            <label>Categoría: </label>
            <input type="text" name="category" value={product.category} onChange={manejarCambio} />
        </div>
        <div>
            <label>Imagen: </label>
            <input type="text" name="imf" value={product.img} onChange={manejarCambio} />
        </div>

        <div>
            <label>Descripción: </label>
            <textarea name="description" value={product.description} onChange={manejarCambio} rows="4"></textarea>
        </div>
        <div>
            <Button type="submit" disabled={cargando} text={cargando? 'Actualizando...' : 'Confirmar cambios'} />
            <Button text="Cancelar edición" onClick={()=>cancelarEdicion()} /> 
        </div>
      </form>
    </div>
  )
}

export default EditarProductos
