import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Box ,Button} from '@mui/material';

import { useTheme } from '@emotion/react';


const HeroSection= () => {
  const theme = useTheme();
  

  return (
    <>
    <Carousel indicators={false} >
    {/* could make the items its own component do not think it time effecient  */}
    <Carousel.Item  interval={3000}>
       <Box component="img" src="https://res.cloudinary.com/dy7r2qdi0/image/upload/t_Banner 16:9/v1726667687/Gemini_Generated_Image_ttcottttcottttco_ubtd5s.jpg" className='carousel-image d-block w-100 ' sx={{
            [theme.breakpoints.down('sm')]: {
              objectFit:"cover",
              height: '600px', // Taller height on mobile
            },
            [theme.breakpoints.down('xs')]: {
              height: '700px', // Even taller on very small screens
            },height:700, objectFit:"cover"
          }}  >

       </Box>
        <Carousel.Caption>
           
        <Button   size='large' variant='outlined' color="error" > Check it now !!</Button>
        
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item  interval={3000}>
      <Box component="img" src='https://res.cloudinary.com/dy7r2qdi0/image/upload/t_Banner 16:9/v1726738632/Gemini_Generated_Image_gqriaygqriaygqri_cr7gkj.jpg' className='carousel-image d-block w-100 ' sx={{
            [theme.breakpoints.down('sm')]: {
              objectFit:"cover",
              height: '600px', // Taller height on mobile
            },
            [theme.breakpoints.down('xs')]: {
              height: '700px', // Even taller on very small screens
            },height:700, objectFit:"cover"
          }}   >
      </Box>
        <Carousel.Caption>
        <Button   size='large' variant='outlined' color="error" > Check it now !!</Button>
        </Carousel.Caption>
      </Carousel.Item>
    
    </Carousel>
    </>
  );
};


export default HeroSection