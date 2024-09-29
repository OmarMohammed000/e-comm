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
import ProfileDetails from "./pages/profile/ProfileDetails";
import OrderHistory from "./pages/profile/OrderHistory";
import Cart from "./pages/Cart/Cart";
import ProtectedRoute from "./components/ProtectedRoute";
import { Provider } from "react-redux";
import store from "./context/store";
import OrderSuccessful from "./pages/OrderSuccessful";


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
},{
  path:"/profile",
  element:<ProfileDetails></ProfileDetails>
},{
  path:"/profile/orderHistory",
  element:<OrderHistory></OrderHistory>,
},{
  path:"/cart",
  element:<ProtectedRoute><Cart></Cart></ProtectedRoute>
},{
  path:"/order/successful",
  element:<OrderSuccessful></OrderSuccessful>
}
])
function App() {
  return (
   <>
   <AuthProvider>
    <Provider store={store}>
    <ThemeProvider theme={theme}>
    <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
    </Provider>
    </AuthProvider>
   </>
  );
}

export default App;
