  import { createContext, useContext, useState, useEffect } from "react";
  import axios from "axios";
  import {jwtDecode} from "jwt-decode"; 
  import apiLink from "../data/ApiLink";

  // creating the authContext
  const AuthContext = createContext();

  // Function to check if a token is expired
  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        return true; // Token is expired
      }
      return false; // Token is valid
    } catch (error) {
      return true; // Invalid token
    }
  };

  // Providing the AuthContext to components
  export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkForStoredToken = async () => {
        const accessToken = localStorage.getItem("accessToken");

        // Check if the accessToken exists and is not expired
        if (accessToken && !isTokenExpired(accessToken)) {
          // Fetch the user using the valid token
          try {
            const response = await axios.get(`${apiLink}/user`, {
              withCredentials: true,
              headers: { Authorization: `Bearer ${accessToken}` },
            });
            
            setUser(response.data.user);
          } catch (error) {
            console.log("Failed to fetch user from JWT", error.response);
          } finally {
            setLoading(false);
          }
        } else {
          // If token is expired or not present, remove it from localStorage
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");

          // Fallback to session-based authentication (non-admin users)
          try {
            const response = await axios.get(`${apiLink}/user`, {
              withCredentials: true, // Send session cookie if available
            });
            setUser(response.data.user);
          } catch (error) {
            console.log("Failed to fetch user from session", error);
          } finally {
            setLoading(false);
          }
        }
      };

      checkForStoredToken();
    }, []);

    const login = async (formData) => {
      try {
        const response = await axios.post(`${apiLink}/login`, formData,{withCredentials:true});
        const { accessToken, refreshToken, user } = response.data;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        setUser(user); // Set the user in context
        return user;
      } catch (error) {
        console.error('Login failed', error);
        throw error; // Re-throw the error for handling in the login form
      }
    };

    const logout = async () => {
      try {
        // Get the refresh token from local storage
        const refreshToken = localStorage.getItem('refreshToken');
    
        // Call backend logout route with the refresh token
        await axios.post(`${apiLink}/logout`, { refreshToken }, { withCredentials: true });
    
        // Clear tokens and user from the frontend
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setUser(null);
      } catch (error) {
        console.error('Logout failed', error);
      }
    };

    return (
      <AuthContext.Provider value={{ user, login, logout, loading }}>
        {!loading && children}
      </AuthContext.Provider>
    );
  };

  export const useAuth = () => {
    return useContext(AuthContext);
  };
