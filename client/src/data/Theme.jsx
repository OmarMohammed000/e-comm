import { createTheme } from '@mui/material/styles';
const theme = createTheme({
    palette: {
      primary: {
        main: '#000000', 
      },
      secondary: {
        main: '#FFFFFF', 
      },
      error: {
        main: '#FF0000', 
      },
      background: {
        default: '#FFFFFF', 
        paper: '#F5F5F5', 
      },
      text: {
        primary: '#000000', 
        secondary: '#FFFFFF',   
      },
    },
    typography: {
      fontFamily: "'Roboto', 'Arial', sans-serif",
      h6: {
        color: '#FFFFFF', // Header text color (for the navbar)
      },
      body1: {
        color: '#000000', // Default text color for body
      },
    },
  });
export default theme;