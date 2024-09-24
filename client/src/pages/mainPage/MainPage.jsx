import React from 'react';
import NavBar from '../../components/NavBar';
import HeroSection from './HeroSection';
import { Container } from '@mui/material';
import ProductsByTag from './ProductsByTag';
import Aboutus from './Aboutus';
import Footer from '../../components/Footer';
function MainPage() {
  return (
    <>
    <NavBar ></NavBar>
    <Container maxWidth={'xl'} sx={{mt:5,mb:5}}>
    <HeroSection ></HeroSection>
    </Container>
    <Container sx={{mt:5 ,mb:5}}>
      <ProductsByTag displayedTag="BestSellers" tag="BestSeller"></ProductsByTag>
    </Container>
    <Container  sx={{mt:5 ,mb:5}}>
      <ProductsByTag displayedTag="NewArrival" tag="New Arrival"></ProductsByTag>
    </Container>
    <Container sx={{textAlign:"center", mt:5, mb:5}} maxWidth={false} disableGutters >
      <Aboutus></Aboutus>
    </Container>
    
      <Footer></Footer>
    
    </>
  )
}

export default MainPage