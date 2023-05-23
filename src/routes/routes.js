import Checkout from "../privatepages/Checkout";
import ProductPage from "../privatepages/ProductPage";
import { Routes, Route } from "react-router-dom";

export const routes = [
 
  {
    path: '/',
    element: <ProductPage />,
  },
  {
    path: '/checkout',
    element: <Checkout />,
  },
  
];


