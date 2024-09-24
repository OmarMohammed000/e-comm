import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import React, { useState } from 'react';

function ProductCard(props) {
  // State to track the current image
  const [currentImage, setCurrentImage] = useState(props.imgs[1].image_location);

  // Handlers to change the image on hover
  const handleMouseEnter = () => {
    if (props.imgs[0]) {  // Only change if a second image exists
      setCurrentImage(props.imgs[0].image_location);
    }
  };

  const handleMouseLeave = () => {
    setCurrentImage(props.imgs[1].image_location); // Revert to the original image
  };

  return (
    <>
      <Card sx={{ maxWidth: 345, height:550}}>
        <CardActionArea
          onMouseEnter={handleMouseEnter}  // Change image on hover
          onMouseLeave={handleMouseLeave}  // Revert image when hover ends
        >
          <CardMedia
            component="img"
            height="400"
            image={currentImage}  // Use state to dynamically change image
            alt="product image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.title}
            </Typography>
            <Typography color='error' variant="h6">
              LE{props.price}
            </Typography>
            
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}

export default ProductCard;
