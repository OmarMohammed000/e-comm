import React from "react";

import MainPage from "./pages/mainPage/MainPage";

import {createBrowserRouter,RouterProvider} from 'react-router-dom'

import SearchResult from "./pages/SearchResult";
import { ThemeProvider } from "@mui/material";
import theme from "./data/Theme";
import Collection from "./pages/collections/Collection";
import ProductPage from "./components/ProductPage";

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
}
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
