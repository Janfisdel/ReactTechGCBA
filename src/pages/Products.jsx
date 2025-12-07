import {useState} from 'react'
import { Link, useNavigate} from 'react-router-dom'
import Button from './Button';
import Loading from './Loading';
import { useCartContext } from '../context/CartContext'
import { useAuthContext} from '../context/AuthContext'
import { useProducts } from '../context/ProductsContext';


function Products() {
  const {products, cargando, error} = useProducts()
  const navigate = useNavigate()
  const {agregarCarrito} = useCartContext()
  const {esAdmin} = useAuthContext()

  const [busqueda, setBusqueda] = useState("")
  const [paginaActual, setPaginaActual] = useState(1)

  const productosPorPagina = 6
  const productosFiltrados = products.filter((product)=>
    product.name.toLowerCase().includes(busqueda.toLocaleLowerCase()) || (product.category.toLowerCase().includes(busqueda.toLowerCase()))
)

  const indiceUltimoProducto = paginaActual * productosPorPagina
  const indicePrimerProducto = indiceUltimoProducto- productosPorPagina
  const productosActuales = productosFiltrados.slice(indicePrimerProducto, indiceUltimoProducto)

  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina)
  const cambiarPagina = (numeroPagina) =>setPaginaActual(numeroPagina)

  const manejarBusqueda = (e)=>{
    setBusqueda(e.target.value)
    setPaginaActual(1)
  }

  const manejarEliminar = (product) =>{
    navigate('/eliminar-productos', {state:{product}} )
  }

  const manejarEditar = (product) =>{
    navigate('/formulario-producto',{state:{product}})
  }

  if (cargando) return (<Loading/>)
  if (error) return <p></p>

  return(
    <>
    <div className='container mt-4'>
      <div clasName ='row mb-4'>
          <div className='col-12 col-md-6'>
           <label className="form-label fw-bold">Buscar productos</label>
           <input type="text" placeholder='Buscar por nombre o categoría' className='form-control' value={busqueda} onChange={manejarBusqueda} />
            {busqueda && (
             <small className='text-muted'>Mostrando {productosFiltrados.length} de {products.length} </small>
            )}
          </div>
      </div>

      <div className='row mt-5'>
        {productosActuales.map((product)=>(
          <div key={product.id} className="col-12 col-md-6 col-lg-4 mb-4" >
            <div className='card h-100 p-2' style={{"background-color":"rgba(224, 141, 177, 0.45)"}}>
              <h5 className='card-title'>{product.name} </h5>
              <img src={product.img} alt={product.name} className='card-img-top p-2' style={{height:"200px", objectFit:"cover"}} />
              <div className='card-body d-flex flex-column'>
                
                <p className='card-text flex-grow-1'>{product.description} </p>
                <p className='card-text fw-bold'>${product.price} </p>
                <div className='mt-auto'>
                  <div className='d-grid gap-2'>
                    <Link to={`/productos/${product.id}`} state={{product}}>
                      <Button text="Más detalles" />
                    </Link>
                  </div>

                  {esAdmin ? (
                    <div className='mt-3 pt-3 border-top'>
                      <div className='d-flex gap-2'>
                          <Button onClick={()=>manejarEditar(product)} text="Editar" />
                          <Button onClick={()=>manejarEliminar(product)} text="Eliminar" />
                      </div> 
                   </div>
                  ): <Button text="Agregar al carrito" onClick={()=>agregarCarrito(product)} /> }

                </div>

              </div>

            </div>
          </div>

        ))}

        {/* Paginador  */}
        {productosFiltrados.length> productosPorPagina &&(
          <div className='d-flex justify-content-center my-4'>
            {Array.from({length: totalPaginas}, (_, index)=>(
              <button key={index + 1} className={`btn mx-1 ${paginaActual === index+1 ? "pagActual" : "pagOtras"}`}
              onClick={()=>cambiarPagina(index + 1)}>{index +1} </button>
            ))}
          </div>
        )}

        {/* Información página actual */}
        {productosFiltrados.length >0 &&(
          <div className='text-center text-muted mt-2'>
              <small>
                Mostrando {productosActuales.length} productos
                (página {paginaActual} de {totalPaginas})
              </small>
          </div>
        )}
      </div>
       
    </div>
    
    </>
  )

}

export default Products

