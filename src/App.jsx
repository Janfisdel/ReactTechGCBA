import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/navBar'
import Footer from './components/Footer'
import Products from './components/Products'



function App() {

  return (
   <>
     <Navbar />
     <main>
      <Routes>
        <Route path='/' element={<Products />} />
     </Routes>
     </main>
     
    <Footer/>
   </>
  )
}

export default App
