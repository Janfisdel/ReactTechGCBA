import { Routes, Route, Navigate } from 'react-router-dom'
import Products from './pages/Products'
import Inicio from './pages/Inicio'
import ProductsDetail from './pages/ProductsDetail'
import Cart from './pages/Cart'
import RutaProtegida from './pages/RutaProtegida'
import Pagar from './pages/Pagar'
import IniciarSesion from './pages/IniciarSesion'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import Dashboard from './pages/Dashboard'
import EliminarProducto from './components/EliminarProducto'
import { ProductsProvider } from './context/ProductsContext'
import FormularioProducto from './components/FormularioProducto'
import Layout from './components/Layout'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"


function App() {
 
  return (
    <AuthProvider>
      <CartProvider>    
        <ProductsProvider>
          <Layout>  
   <>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path='/productos' element={<Products />} />
        <Route path='/productos/:id' element={<ProductsDetail />} />
        <Route path="/iniciar-sesion" element={<IniciarSesion />}/>
        <Route path="/carrito" element={<Cart />}  />
        <Route path="/pagar" element={ <RutaProtegida> <Pagar/> </RutaProtegida> }/>
        <Route path="/Dashboard" element={<RutaProtegida soloAdmin={true}><Dashboard/></RutaProtegida>}  />
        <Route path="/eliminar-productos" element={<RutaProtegida soloAdmin={true}><EliminarProducto /></RutaProtegida>}/>
        <Route path="/formulario-producto" element={<RutaProtegida><FormularioProducto/></RutaProtegida>}/>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>     
    <ToastContainer position ="bottom-right" autoClose={3000} hideProgressBar={false} closeOnClick draggable pauseOnHover />
   </>
   </Layout>
   </ProductsProvider>
   </CartProvider>
   </AuthProvider>
  )
}

export default App
