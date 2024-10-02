import React from "react";
import { Box, Typography, Button } from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { useNavigate } from "react-router-dom";

const ErrorComponent = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        bgcolor: "background.default",
        padding: 2,
      }}
    >
      <SentimentVeryDissatisfiedIcon sx={{ fontSize: 100, color: "error.main", mb: 2 }} />
      <Typography variant="h4" sx={{ mb: 2 }}>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Sorry, we couldn’t find the page you’re looking for.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleGoHome}
        sx={{
          bgcolor: "primary.main",
          "&:hover": {
            bgcolor: "primary.dark",
          },
        }}
      >
        Go Back Home
      </Button>
    </Box>
  );
};

export default ErrorComponent;
