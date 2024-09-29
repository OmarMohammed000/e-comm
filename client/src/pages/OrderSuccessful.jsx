import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping'; // Import truck icon
import { useNavigate } from 'react-router-dom'; // For navigation

const OrderSuccessful = () => {
  const navigate = useNavigate(); // Use navigate hook from react-router-dom

  const handleContinueShopping = () => {
    navigate('/'); // Navigate to home page
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', // Full viewport height
        textAlign: 'center',
        bgcolor: 'background.default',
        p: 2,
      }}
    >
      <LocalShippingIcon sx={{ fontSize: 100, color: 'primary.main', mb: 2 }} />
      <Typography variant="h4" gutterBottom>
        Order Placed Successfully!
      </Typography>
      <Typography variant="h6" color='black' gutterBottom>
        Estimated Delivery Time: Never
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleContinueShopping}
        sx={{ mt: 2 }}
      >
        Continue Shopping
      </Button>
    </Box>
  );
};

export default OrderSuccessful;
