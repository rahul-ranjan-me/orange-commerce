import React from "react";
import Home from "../pages/home";
import Products from "../pages/products";
import Login from "../pages/login";
import Signup from "../pages/signup";
import Profile from "../pages/profile";
import CreateProduct from "../pages/createProduct";
import Cart from "../pages/reviewCart";
import PaymentSuccessful from "../pages/paymentSuccessful";

const defaultRoutes = [
  { path: "/", element: <Home /> },
  { path: "/products/:productType", element: <Products /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/profile", element: <Profile /> },
  { path: "/create-product", element: <CreateProduct /> },
  { path: "/cart", element: <Cart /> },
  { path: "/payment-successful", element: <PaymentSuccessful /> },
];

export default defaultRoutes;