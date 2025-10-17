import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/navBar'
import Footer from './components/Footer'
import Products from './components/Products'
import Inicio from './components/Inicio'
import ProductsDetail from './components/ProductsDetail'



function App() {

  return (
   <>
     <Navbar />
     <main>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path='/productos' element={<Products />} />
         <Route path='/productos/:id' element={<ProductsDetail/>} />
        <Route path='/productos/:categoria/:id' element={<ProductsDetail />} />
     </Routes>
     </main>
     
    <Footer/>
   </>
  )
}

export default App
