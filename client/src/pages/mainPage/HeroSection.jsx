import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Box ,Button} from '@mui/material';

// Sample images for the slideshow
const largeImage = 'https://via.placeholder.com/800x400?text=BESTSELLERS';
const smallImage1 = 'https://via.placeholder.com/400x200?text=NEW+ARRIVALS';
const smallImage2 = 'https://via.placeholder.com/400x200?text=HURRY+UP';

const HeroSection= () => {
  

  return (
    <>
    <Carousel indicators={false} >
    <Carousel.Item  interval={3000}>
       <Box component="img" src="https://res.cloudinary.com/dy7r2qdi0/image/upload/t_Banner 16:9/v1726667687/Gemini_Generated_Image_ttcottttcottttco_ubtd5s.jpg" className='carousel-image d-block w-100'  >

       </Box>
        <Carousel.Caption>
           
        <Button   size='large' variant='outlined' color="error" > Check it now !!</Button>
        
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item  interval={3000}>
      <Box component="img" src='https://res.cloudinary.com/dy7r2qdi0/image/upload/t_Banner 16:9/v1726738632/Gemini_Generated_Image_gqriaygqriaygqri_cr7gkj.jpg' className='carousel-image d-block w-100'   >
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