import React from "react";

import MainPage from "./pages/mainPage/MainPage";

import {createBrowserRouter,RouterProvider} from 'react-router-dom'

import SearchResult from "./pages/SearchResult";
import { ThemeProvider } from "@mui/material";
import theme from "./data/Theme";
import Collection from "./pages/collections/Collection";
import ProductPage from "./components/ProductPage";
import Login from "./pages/auth/Login";
import { AuthProvider } from "./context/AuthContext";

const router=createBrowserRouter([{
  path:'/',
  element:<MainPage></MainPage>
},{
  path:`/search`,
  element:<SearchResult></SearchResult>
},{
  path:`collection/:subOrcategoryName`,
  element:<Collection></Collection>
},{
  path:`products/:proudctname/:productId`,
  element:<ProductPage></ProductPage>
},{
  path:"/login",
  element:<Login></Login>
},{
  path:"/Register",
  element:<Login register={true}></Login>
}
])
function App() {
  return (
   <>
   <AuthProvider>
    <ThemeProvider theme={theme}>
    <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
    </AuthProvider>
   </>
  );
}

export default App;
