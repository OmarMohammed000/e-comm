import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosNewSharpIcon from "@mui/icons-material/ArrowBackIosNewSharp";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp"; // Correct next arrow
import apiLink from "../../data/ApiLink";
import axios from "axios";
import { Container, Divider, Skeleton, Typography } from "@mui/material";
import ProductCard from "../../components/ProductCard";

// Custom Previous Arrow
const SamplePrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        width: "40px",
        height: "40px",
      }}
    >
      <ArrowBackIosNewSharpIcon style={{ color: "black" }} />
    </div>
  );
};

// Custom Next Arrow
const SampleNextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        width: "40px",
        height: "40px",
      }}
    >
      <ArrowForwardIosSharpIcon style={{ color: "black" }} />{" "}
      {/* Forward icon */}
    </div>
  );
};

function ProductByTag(props) {
  // start of pulling data form the back end

  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const apiCall = `${apiLink}/product/filter?tags=${props.tag}`;
        const response = await axios.get(apiCall);
        setProductData(response.data);
       
      } catch (error) {
        setError("Error fetching Products" + error);
      } finally {
        setLoading(false);
       
      }
    };
    fetchProductData();
  }, [props.tag]);

  const settings = {
    dots: true,
    infinite: productData ? productData.length > 1 : false,
    slidesToShow: productData ? Math.min(productData.length, 3) : 3,  // Default is 3 slides
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,  // Custom next arrow
    prevArrow: <SamplePrevArrow />,  // Custom previous arrow
    responsive: [
      {
        breakpoint: 768,  // For screen widths less than 768px
        settings: {
          slidesToShow: productData ? Math.min(productData.length, 2) : 2,  // Show 2 slides on mobile
          slidesToScroll: 1,
          infinite: productData ? productData.length > 1 : false,
        },
      },
      {
        breakpoint: 480,  // For screen widths less than 480px (small mobile)
        settings: {
          slidesToShow: 1,  // Show only 1 slide on very small screens
          slidesToScroll: 1,
        },
      },
    ],
  };
  
  if(error)return <div>{error}</div>
 
  return (
    <>
      <Container>
        <Divider>
          <Typography variant="h3">{props.displayedTag} </Typography>
        </Divider>
        <div className="slider-container ">
        <Container sx={{textAlign:"center",mt:3, }}>
          <Slider {...settings} >
            {loading ? (
              <div>
                <Skeleton variant="rounded" width={210} height={60} />
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              </div>
            ) : (
              
              productData.map((product) => (
                <ProductCard productId={product.id} title={product.title} price={product.price} imgs={product.Images} key={product.id}  ></ProductCard>
              ))
             
            )}
          </Slider>
          </Container>

          {/* CSS to hide only default Slick arrows */}
          <style >{`
            .slick-prev:before,
            .slick-next:before {
              display: none !important; /* This hides the default Slick arrows */
            }
          `}</style>
        </div>
      </Container>
    </>
  );
}

export default ProductByTag;
