import React from "react";

import MainPage from "./pages/mainPage/MainPage";

import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Product from "./components/Product";
import SearchResult from "./pages/SearchResult";

const router=createBrowserRouter([{
  path:'/',
  element:<MainPage></MainPage>
},{
  path:`/products/:productId`,
  element:<Product></Product>
},{
  path:`/search`,
  element:<SearchResult></SearchResult>
}
])
function App() {
  return (
   <>
    <RouterProvider router={router}></RouterProvider>
   </>
  );
}

export default App;
