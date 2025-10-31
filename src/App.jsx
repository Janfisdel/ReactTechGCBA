import { useState } from 'react'
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
        <Route path="/pagar" element={ <RutaProtegida>
                <Pagar/>
            </RutaProtegida>
          }
        />
     </Routes>
     </main>
     
    <Footer/>
   </>
   </CartProvider>
   </AuthProvider>
  )
}

export default App
