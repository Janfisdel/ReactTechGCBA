import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/NavBar'
import Footer from './components/Footer'
import Products from './components/Products'
import Inicio from './components/Inicio'
import ProductsDetail from './components/ProductsDetail'
import RutaProtegida from './components/RutaProtegida'
import Pagar from './components/Pagar'
import IniciarSesion from './components/IniciarSesion'



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [usuario, setUsuario] = useState({nombre:"", email:""})

  return (
   <>
     <Navbar />
     <main>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path='/productos' element={<Products />} />
        <Route path='/productos/:categoria/:id' element={<ProductsDetail />} />
       <Route path="/iniciar-sesion" element={<IniciarSesion setIsAuthenticated={setIsAuthenticated} setUsuario={setUsuario}/>}/>
        <Route path="/pagar" element={ <RutaProtegida isAuthenticated={isAuthenticated}>
                <Pagar setIsAuthenticated={setIsAuthenticated} setUsuario={setUsuario} usuario={usuario} />
            </RutaProtegida>
          }
        />
     </Routes>
     </main>
     
    <Footer/>
   </>
  )
}

export default App
