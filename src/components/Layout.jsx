import{useEffect} from 'react'
import styled from 'styled-components'
import Navbar from '../pages/NavBar'
import Footer from '../pages/Footer'
import Title from '../pages/Title'

function Layout({children}) {
    //SEO Nativo con useEffect

    useEffect(()=>{
    document.title= "Tienda TLV - Deli, fit & fresh"

    //Función para actualizar meta tags
    const updateMetaTag = (name, content, attribute = 'name') =>{
      let meta = document.querySelector(`meta[${attribute}="${name}"]`)
      if(!meta){
        meta = document.createElement('meta')
        meta.setAttribute(attribute, name)
        document.head.appendChild(meta)
      }
      meta.content = content
    }

    //Meta tags básicos
    updateMetaTag('description', 'Visita nuestra tienda de productos saludables y frescos. Conoce nuestros productos para una vida mas fit')
    updateMetaTag('keywords', 'Alimentos, bebidas, snack, saludable, fit, fresh')
    updateMetaTag('author', 'Jana Fisdel')
    updateMetaTag('robots', 'index, follow')

    //Open Graph para redes sociales
    updateMetaTag('og:title', 'Tienda TLV', 'property');
    updateMetaTag('og:description', 'Visita nuestra tienda de productos saludables y frescos.', 'property');
    updateMetaTag('og:type', 'website', 'property');
    updateMetaTag('og:image', 'https://res.cloudinary.com/janfis/image/upload/v1760717417/GCBAReact/TLVlogo_tmglgl.jpg', 'property');
    updateMetaTag('og:url', window.location.href, 'property');

    //Twitter Card
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', 'TLV - Deli, fit & fresh');
    updateMetaTag('twitter:description', 'Visita nuestra tienda de productos saludables y frescos.');
    updateMetaTag('twitter:image', window.location.origin + 'https://res.cloudinary.com/janfis/image/upload/v1760717417/GCBAReact/TLVlogo_tmglgl.jpg');

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = window.location.origin;
  },[])




  return (
    <LayoutContainer>
        <Header role="banner">
            <Navbar />
        </Header>

        <Main role="main">
            <Title />
            {children}
        </Main>

        <FooterWrapper role="contentinfo">
            <Footer />
        </FooterWrapper>
    </LayoutContainer>
  )
}

export default Layout

//Styled components
const LayoutContainer = styled.div`
display:flex;
flex-direction:column;
min-height:100vh`

const Header = styled.header`
width:100%;
background-color: transparent;
z-index:100`

const Main = styled.main`
flex:1;
width:100%;
padding:0;`

const FooterWrapper = styled.footer`
width:100%;
background-color:#f8f9fa;
border-top: 1px solid #dee2e6;
margin-top: auto;
`