import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import apiLink from "../data/ApiLink";

// creating the authContext
const AuthContext = createContext();

// Providing the AuthContext to components
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect( () => {
    const checkForStoredToken=async()=>{
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      // fetch the user using toekn
      try {
        const response = await axios.get(`${apiLink}/user`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setUser(response.data.user)
      } catch (error) {
        console.log('Failed to fetch user',error);
      }finally{
        setLoading(false);
      }
    }else{
      setLoading(false);
    }
  };
    checkForStoredToken();
  },[]);
  const login = async (formData) => {
    try {
      const response = await axios.post('/login', formData);
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
  
  // Logout function using async/await
  const logout = async () => {
    try {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setUser(null); // Clear user from context
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