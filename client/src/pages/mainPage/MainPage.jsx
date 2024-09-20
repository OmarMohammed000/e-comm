import React from 'react';
import NavBar from '../../components/NavBar';
import HeroSection from './HeroSection';
import { Container } from '@mui/material';
import NewArrival from './NewArrival';
function MainPage() {
  return (
    <>
    <NavBar ></NavBar>
    <Container maxWidth={'xl'} sx={{mt:5}}>
    <HeroSection ></HeroSection>
    </Container>
    <Container sx={{mt:2}}>
      <NewArrival></NewArrival>
    </Container>
    </>
  )
}

export default MainPage