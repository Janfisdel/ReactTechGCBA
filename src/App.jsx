import { Routes, Route } from 'react-router-dom'
import Navbar from './components/NavBar'
import Footer from './components/Footer'
import Products from './components/Products'
import Inicio from './components/Inicio'
import ProductsDetail from './components/ProductsDetail'
import Cart from './components/Cart'
import RutaProtegida from './components/RutaProtegida'
import Pagar from './components/Pagar'
import IniciarSesion from './components/IniciarSesion'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import Dashboard from './components/Dashboard'
import FormProducto from './components/FormProducto'
import EditarProductos from './components/editarProductos'

function App() {
 
  return (
    <AuthProvider>
    <CartProvider>    
   <>
     <Navbar />
     <main>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path='/productos' element={<Products />} />
        <Route path='/productos/:categoria/:id' element={<ProductsDetail />} />
        <Route path="/iniciar-sesion" element={<IniciarSesion />}/>
        <Route path="/carrito" element={<Cart />}  />
        <Route path="/pagar" element={ <RutaProtegida> <Pagar/> </RutaProtegida> }/>
        <Route path="/Dashboard" element={<RutaProtegida soloAdmin={true}><Dashboard/></RutaProtegida>}  />
        <Route path="/agregarProducto" element={<RutaProtegida soloAdmin={true}><FormProducto/></RutaProtegida>}  />
        <Route path ="/editar-productos" element={<RutaProtegida soloAdmin={true}><EditarProductos /></RutaProtegida>}/>
      </Routes>
     </main>
     
    <Footer/>
   </>
   </CartProvider>
   </AuthProvider>
  )
}

export default App
