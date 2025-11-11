import React, {useState} from 'react'

function FormProducto() {
    const [product, setProduct] = useState({name:'', price:'', description:'', category:'', img:''})
    const [errores, setErrores] = useState({})
    const [cargando, setCargando] = useState(false)

    const manejarCambio = (e) =>{
        const {name, value} = e.target 

        setProduct(prev =>({...prev, [name]: value}))

        if (errores[name]){
            setErrores(prev=>({...prev, [name]:""}))
        }
    }

    const validarForm = ()=>{
        const errorCarga = {}

        if(!product.name.trim()){
            errorCarga.name = "El nombre es obligatorio"
        }

        if(!product.price.trim()){
            errorCarga.price = "El precio es obligatorio"
        }else {
            const precioLimpio = product.price.replace(/\./g, '').replace(',', '.')
            const precioNumerico = parseFloat(precioLimpio)

             if (!/^[\d.,]+$/.test(product.price.replace(/\./g, ''))) {
                 errorCarga.price = 'Solo números, puntos o comas.';
              } else if (isNaN(precioNumerico)) {
                    errorCarga.price = 'Precio no válido.';
              } else if (precioNumerico <= 0) {
                errorCarga.price= 'Debe ser mayor a 0.';
                }
         }

        if (!product.description.trim()){
            errorCarga.description = "La descripcion es obligatoria"
        }

        setErrores(errorCarga)
        return Object.keys(errorCarga).length ===0

    }
        const agregarProducto = async(product) =>{
            try {
                 const productoEnviar = {...product, price: product.price.replace(',', '.')}

                 const respuesta = await fetch('https://68d876bf2144ea3f6da823e1.mockapi.io/api/tiendaTLV', {
                     method: 'POST',
                     headers: { 'Content-Type': 'application/json' },
                     body: JSON.stringify(productoEnviar),
                })

                if(!respuesta.ok) throw new Error ('Error al agregar el producto.')
                const data = await respuesta.json()
                alert('Producto agregado correctamente')
                return data
            }catch(error){
                alert('Ocurrió un problema al agregar el producto')
                throw error
            }
        }

        const manejarEnvio = async(e) =>{
            e.preventDefault()

            if (!validarForm()) return;

            setCargando(true)
            try{
                await agregarProducto(product)
                setProduct({name:'', price:'', description:'', category:'', img:''})
                setErrores({})
            }catch(error){
                console.error('Error:', error)
            }finally{
                setCargando(false)
            }
        }

    return(
        <form onSubmit={manejarEnvio}>
            <h2>Agregar producto</h2>

            <div>
                <label>Nombre: *</label>
                <input type="text" name="name" value={product.name} onChange={manejarCambio} disabled={cargando} placeholder='Ingrese el nombre del producto' />
                {errores.name &&<p style={{ color: 'red', margin: '5px 0', fontSize: '14px' }}>{errores.name}</p>}
            </div>

            <div>
                <label>Precio: *</label>
                <input type="number" name="price" value={product.price} onChange={manejarCambio} disabled={cargando} placeholder='Ingrese el precio del producto' />
                {errores.price &&<p style={{ color: 'red', margin: '5px 0', fontSize: '14px' }}>{errores.price}</p>}
            </div>

            <div>
                <label>Categoria: *</label>
                <input type="text" name="category" value={product.category} onChange={manejarCambio} disabled={cargando} placeholder='Ingrese  la categoria del producto' />
            </div>

            <div>
                <label>Imagen (URL): *</label>
                <input type="text" name="img" value={product.img} onChange={manejarCambio} disabled={cargando} placeholder='Ingrese la direccion URL de la imagen del producto' />
            </div>

            <div>
                <label>Descripción: *</label>
                <textarea name="description" value={product.description} onChange={manejarCambio} rows="4" disabled={cargando} maxLength="200" placeholder="Ingrese la descripción del producto"></textarea>
                {errores.description &&<p style={{ color: 'red', margin: '5px 0', fontSize: '14px' }}>{errores.description}</p>}
            </div>

            <button type="submit" disabled={cargando}>{cargando ? 'Agregando...' : 'Agregar Producto'}  </button>

            <p>(*) Campos obligatorios</p>
        </form>
      
    )
}      


export default FormProducto