import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductCard(props) {
  const navigate=useNavigate();
  // State to track the current image
  const [currentImage, setCurrentImage] = useState(
    props.imgs[1].image_location
  );
  useEffect(() => {
    if (props.imgs[1]) {
      setCurrentImage(props.imgs[1].image_location);
    }
  }, [props.imgs]);
  // Handlers to change the image on hover
  const handleMouseEnter = () => {
    if (props.imgs[0]) {
      // Only change if a second image exists
      setCurrentImage(props.imgs[0].image_location);
    }
  };

  const handleMouseLeave = () => {
    setCurrentImage(props.imgs[1].image_location); // Revert to the original image
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
          height: 550,
          overFlow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        <CardActionArea
          onMouseEnter={handleMouseEnter} // Change image on hover
          onMouseLeave={handleMouseLeave} // Revert image when hover ends
          onClick={()=>{
            navigate(`/products/${props.title}/${props.id}`)
          }}
        >
          <CardMedia
            component="img"
            height="400"
            image={currentImage} // Use state to dynamically change image
            alt={props.title}
            key={`${props.title}-${Math.random()}`}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              color="text.primary"
              component="div"
            >
              {props.title}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Typography color="error" variant="h6">
            LE{props.price}
          </Typography>
        </CardActions>
      </Card>
    </>
  );
}

export default ProductCard;
