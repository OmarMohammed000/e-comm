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
import Admin from "./pages/admin/Admin";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import AdminProduct from "./pages/admin/AdminProduct";
import CreateProduct from "./pages/admin/CreateProduct";
import EditProduct from "./pages/admin/EditProduct";
import Users from "./pages/admin/Users";
import Tags from "./pages/admin/Tags";
import Subcategory from "./pages/admin/Subcategory";
import Categories from "./pages/admin/Categories";
import ErrorComponent from "./components/ErrorComponent";


const router=createBrowserRouter([{
  path:'/',
  element:<MainPage></MainPage>,
  errorElement:<ErrorComponent></ErrorComponent>
},{
  path:`/search`,
  element:<SearchResult></SearchResult>
},{
  path:`collection/:subOrcategoryName`,
  element:<Collection></Collection>
},{
  path:`products/:proudctname/:productId`,
  element:<ProductPage></ProductPage>
},
{
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
  element:<ProtectedRoute><OrderSuccessful></OrderSuccessful></ProtectedRoute>
},{
  path:"/admin",
  element:<ProtectedAdminRoute><Admin></Admin></ProtectedAdminRoute>
},{
  path:"/admin/products",
  element:<ProtectedAdminRoute><AdminProduct></AdminProduct></ProtectedAdminRoute>
},{
  path:"admin/products/productCreation",
  element:<ProtectedAdminRoute><CreateProduct></CreateProduct></ProtectedAdminRoute>
},{
  path:"admin/products/EditProduct",
  element:<ProtectedAdminRoute><EditProduct></EditProduct></ProtectedAdminRoute>
},{
  path:"admin/users",
  element:<ProtectedAdminRoute><Users></Users></ProtectedAdminRoute>
},{
  path:"admin/tags",
  element:<ProtectedAdminRoute><Tags></Tags></ProtectedAdminRoute>
},{
  path:"admin/subcategories",
  element:<ProtectedAdminRoute><Subcategory></Subcategory></ProtectedAdminRoute>
},{
  path:"admin/categories",
  element:<ProtectedAdminRoute><Categories></Categories></ProtectedAdminRoute>
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
