  import React, { useState } from "react";
  import Box from "@mui/material/Box";
  import Button from "@mui/material/Button";
  import CssBaseline from "@mui/material/CssBaseline";
  import FormControl from "@mui/material/FormControl";
  import FormLabel from "@mui/material/FormLabel";
  import Link from "@mui/material/Link";
  import TextField from "@mui/material/TextField";
  import Typography from "@mui/material/Typography";
  import Stack from "@mui/material/Stack";
  import MuiCard from "@mui/material/Card";
  import { styled } from "@mui/material/styles";
  import { ThemeProvider, createTheme } from "@mui/material/styles"; // Material UI Theme Provider
  import axios from "axios";
  import { useAuth } from "../../context/AuthContext";
  import { useLocation, useNavigate } from "react-router-dom";
  import { Alert } from "@mui/material";
import apiLink from "../../data/ApiLink";

  const theme = createTheme({
    palette: {
      primary: {
        main: "#1976d2",
      },
      mode: "light",
    },
  });

  const Card = styled(MuiCard)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    width: "100%",
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: "auto",
    [theme.breakpoints.up("sm")]: {
      maxWidth: "450px",
    },
    boxShadow:
      "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
    ...theme.applyStyles("dark", {
      boxShadow:
        "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
    }),
  }));

  const SignInContainer = styled(Stack)(({ theme }) => ({
    padding: 20,
    marginTop: "10vh",
    "&::before": {
      content: '""',
      display: "block",
      position: "absolute",
      zIndex: -1,
      inset: 0,
      backgroundImage:
        "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
      backgroundRepeat: "no-repeat",
      ...theme.applyStyles("dark", {
        backgroundImage:
          "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
      }),
    },
  }));

  function Login(props) {
    const { register } = props; // Get the register prop to differentiate between login and registration
    const {login} =useAuth();
    const navigate = useNavigate();
    const { state } = useLocation();
    const [emailError, setEmailError] =useState(false);
    const [emailErrorMessage, setEmailErrorMessage] =useState("");
    const [passwordError, setPasswordError] =useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] =useState("");
    const [usernameError, setUsernameError] =useState(false);
    const [usernameErrorMessage, setUsernameErrorMessage] =useState("");
    const [formSubmitted, setFormSubmitted] =useState(false);
    const [errorMessage, setErrorMessage] =useState('');
    const aleart='You need to login first before adding items to cart';

    const handleSubmit = async (event) => {
      event.preventDefault();
      const isValid = validateInputs();

      if (isValid) {
        const data = new FormData(event.currentTarget);
        const formData = {
          email: data.get("email"),
          password: data.get("password"),
        };
      
        if (register) {
          formData.username = data.get("username");
          formData.phone = data.get("phone");
          formData.address = data.get("address");
          try {
            // Make the POST request to the server using Axios
            const response = await axios.post(`${apiLink}/register`, formData);

            if (response.status === 201) {
              try {
                const user = await login(formData);
                // On successful register, redirect and assign the user
                
                navigate('/'); 
              } catch (error) {
                setErrorMessage('Login failed. Please check your credentials.');
              }
            }
          } catch (error) {
            // Handle errors (like email already registered or server issues)
            if (error.response) {
              setErrorMessage(error.response.data.message);
              setFormSubmitted(false);
            } else {
              setErrorMessage('An error occurred. Please try again.');
              setFormSubmitted(false);
            }
          }
          
          console.log(formData);
        }
        try {
          const userReq = await login(formData);
          // On successful login, redirect and assign the user
          
          navigate('/'); // Navigate to dashboard
        } catch (error) {
          setErrorMessage('Login failed. Please check your credentials.');
        }
      }
    };

    const validateInputs = () => {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      let isValid = true;

      // Email validation
      if (!email || !/\S+@\S+\.\S+/.test(email)) {
        setEmailError(true);
        setEmailErrorMessage("Please enter a valid email address.");
        isValid = false;
      } else {
        setEmailError(false);
        setEmailErrorMessage("");
      }

      // Password validation
      if (!password || password.length < 6) {
        setPasswordError(true);
        setPasswordErrorMessage("Password must be at least 6 characters long.");
        isValid = false;
      } else {
        setPasswordError(false);
        setPasswordErrorMessage("");
      }

      // Username validation (only when registering)
      if (register) {
        const username = document.getElementById("username").value;
        if (!username || username.length < 1) {
          setUsernameError(true);
          setUsernameErrorMessage("User Name must not be empty.");
          isValid = false;
        } else {
          setUsernameError(false);
          setUsernameErrorMessage("");
        }
      }

      return isValid;
    };

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {state &&<Alert severity="warning">{aleart}</Alert>}
        <SignInContainer direction="column" justifyContent="space-between">
          <Card variant="outlined">
            <Typography
              component="h1"
              variant="h4"
              sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
            >
              {register ? "Register" : "Login"}
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: 2,
              }}
            >
              {register && (
                <FormControl>
                  <FormLabel htmlFor="username">User Name</FormLabel>
                  <TextField
                    error={usernameError}
                    helperText={usernameErrorMessage}
                    id="username"
                    type="text"
                    name="username"
                    placeholder="Your Name"
                    autoComplete="username"
                    required
                    fullWidth
                    variant="outlined"
                  />
                </FormControl>
              )}

              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField
                  error={emailError}
                  helperText={emailErrorMessage}
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  autoComplete="email"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <TextField
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  name="password"
                  placeholder="••••••"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  required
                  fullWidth
                  variant="outlined"
                />
              </FormControl>

              {register && (
                <>
                  <FormControl>
                    <FormLabel htmlFor="phone">Phone</FormLabel>
                    <TextField
                      id="phone"
                      type="tel"
                      name="phone"
                      placeholder="Your Phone"
                      autoComplete="phone"
                      fullWidth
                      variant="outlined"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel htmlFor="address">Address</FormLabel>
                    <TextField
                      id="address"
                      type="text"
                      name="address"
                      placeholder="Your Address"
                      autoComplete="address"
                      fullWidth
                      variant="outlined"
                    />
                  </FormControl>
                </>
              )}

              <Button type="submit" fullWidth variant="contained">
                {register ? "Register" : "Login"}
              </Button>

              {formSubmitted && <Typography color="green">Form submitted successfully!</Typography>}
              {errorMessage && <Typography color="red">{errorMessage}</Typography>}


              <Typography sx={{ textAlign: "center" }}>
                {register ? (
                  <>
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      variant="body2"
                      sx={{ alignSelf: "center" }}
                    >
                      Login
                    </Link>
                  </>
                ) : (
                  <>
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/register"
                      variant="body2"
                      sx={{ alignSelf: "center" }}
                    >
                      Register
                    </Link>
                  </>
                )}
              </Typography>
            </Box>
          </Card>
        </SignInContainer>
      </ThemeProvider>
    );
  }
  export default Login;
