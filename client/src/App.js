import React from "react";

import MainPage from "./pages/mainPage/MainPage";

import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import ProductCard from "./components/ProductCard";
import SearchResult from "./pages/SearchResult";
import { ThemeProvider } from "@mui/material";
import theme from "./data/Theme";
import Collection from "./pages/collections/Collection";

const router=createBrowserRouter([{
  path:'/',
  element:<MainPage></MainPage>
},{
  path:`/products/:productId`,
  element:<ProductCard></ProductCard>
},{
  path:`/search`,
  element:<SearchResult></SearchResult>
},{
  path:`collection/:subOrcategoryName`,
  element:<Collection></Collection>
},
])
function App() {
  return (
   <>
    <ThemeProvider theme={theme}>
    <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
   </>
  );
}

export default App;
