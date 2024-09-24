import { Container, Typography } from "@mui/material";
import React from "react";

function Aboutus() {
  return (
    <Container sx={{ mt: 5, mb: 5, bgcolor: "black", color: "white", pt: 1 }} maxWidth={false}>
      <Typography variant="h3" sx={{ mb: 2, mt:3}}>
        About us
      </Typography>
      <Container sx={{textAlign:"start", padding:5}}>
        <Typography variant="h5" sx={{mt:3 ,mb:1}}>Our Passion</Typography>
        <Typography variant="body1" color="white">
          At Trendy Fit, we're more than just a clothing store; we're a
          community of fashion enthusiasts dedicated to curating a unique and
          stylish experience for everyone. From trendy apparel to statement
          accessories, our carefully selected collection caters to men, women,
          and children of all ages and styles.
        </Typography>
        <Typography variant="h5" sx={{mt:3 ,mb:1}}>Our Commitment</Typography>
        <Typography variant="body1" color="white">
          We believe that fashion should be accessible, affordable, and fun.
          That's why we strive to offer high-quality products at competitive
          prices without compromising on design or comfort. Our goal is to
          inspire you to express your individuality through your wardrobe and
          empower you to feel confident and stylish.
        </Typography>
        <Typography variant="h4" sx={{mt:3 ,mb:1}}>Join Our Community</Typography>
        <Typography variant="body1" color="white">
          Whether you're a fashion-forward individual or simply looking to
          refresh your wardrobe, we invite you to explore our collection and
          become a part of our growing community. We value your feedback and are
          always on the lookout for new trends and styles to bring to you.
        </Typography>
        <Typography variant="caption" color="white" sx={{mt:5 }}>
          Disclaimer: This is a fictional e-commerce website created for
          educational purposes. The products, prices, and information provided
          are not real and are intended for illustrative purposes only.
        </Typography>
      </Container>
    </Container>
  );
}

export default Aboutus;
