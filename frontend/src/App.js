//importing all the components to bring together.
import "./App.css";
import Header from "./component/Header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./component/Footer/Footer";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import Login from "./component/UserLogin/Login";
import store from "./store";
import React, { useEffect, useState } from "react";
import { loadUser } from "./actions/UserAction";
import UserOptions from "./component/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./component/UserLogin/Profile";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/UserLogin/UpdateProfile";
import UpdatePassword from "./component/UserLogin/UpdatePassword";
import ForgotPassword from "./component/UserLogin/ForgotPassword";
import ResetPassword from "./component/UserLogin/ResetPassword";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import Cart from "./component/Cart/Cart";
import OrderDetails from "./component/Order/OrderDetails";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Payment from "./component/Cart/Payment";
import Dashboard from "./component/admin/Dashboard";
import ProductList from "./component/admin/ProductList";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import NewProduct from "./component/admin/NewProduct";
import UpdateProduct from "./component/admin/UpdateProduct";
import Order from "./component/admin/Order";
import ProcessOrder from "./component/admin/ProcessOrder";
import UsersList from "./component/admin/UsersList";
import UpdateUser from "./component/admin/UpdateUser";
import ProductReviews from "./component/admin/ProductReviews";
import About from "./component/About/About";
import Contact from "./component/Contact/Contact";

/**/
/*
App()   
NAME
    App 
SYNOPSIS
    App(); 
    No props passed.
DESCRIPTION
    It serves as the main point to the application by showing different features of the application
    based on the route user is at.   
RETURNS
    Returns the Javascript for different routes in the application.
*/
/**/
function App() {
  // Get user authentication state and user details from Redux store
  const { isAuth, user } = useSelector((state) => state.user);

  // Declare state variable for Stripe API key
  const [stripeApiKey, setStripeApiKey] = useState("");

  // Function to retrieve Stripe API key from the backend
  async function getStripeApiKey() {
    // Send GET request to server to retrieve Stripe API key
    const { data } = await axios.get("/api/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  // Use useEffect hook to load user details and retrieve Stripe API key on component mount
  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (
    //different paths and associated components that renders with it
    <Router>
      <Header />
      {isAuth && <UserOptions user={user}/>}
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" exact element={<Products/>} />
        <Route path="/products/:keyword" element={<Products/>} />
        <Route path="/search" exact element={<Search/>} />
        <Route path="/login" element={<Login/>} />
        <Route exact path="/password/forgot" element={<ForgotPassword/>}/>
        <Route exact path="/password/reset/:token" element={<ResetPassword/>}/>
        <Route path="/cart" element={<Cart/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route element={<ProtectedRoute />}>
        <Route exact path="/account" element={<Profile/>}/>
        <Route exact path="/me/update" element={<UpdateProfile/>}/>
        <Route exact path="/password/update" element={<UpdatePassword/>}/>
        <Route exact path="/shipping" element={<Shipping/>}/>
        {stripeApiKey && (
        <Route path="/process/payment" element={
            <Elements stripe={loadStripe(stripeApiKey)}>
              <Payment />
            </Elements>
          }
        />
      )}
          <Route exact path="/success" element={<OrderSuccess/>}/>
          <Route exact path="/orders" element={<MyOrders/>}/>
          <Route exact path="/order/confirm" element={<ConfirmOrder/>}/>
          <Route exact path="/order/:id" element={<OrderDetails/>}/>
          <Route isAdmin={true} exact path="/admin/dashboard" element={<Dashboard/>}/>
          <Route isAdmin={true} exact path="/admin/products" element={<ProductList/>}/>
          <Route isAdmin={true} exact path="/admin/product" element={<NewProduct/>}/>
          <Route isAdmin={true} exact path="/admin/product/:id" element={<UpdateProduct/>}/>
          <Route isAdmin={true} exact path="/admin/orders" element={<Order/>}/>
          <Route isAdmin={true} exact path="/admin/order/:id" element={<ProcessOrder/>}/>
          <Route isAdmin={true} exact path="/admin/users" element={<UsersList/>}/>
          <Route isAdmin={true} exact path="/admin/user/:id" element={<UpdateUser/>}/>
          <Route isAdmin={true} exact path="/admin/reviews" element={<ProductReviews/>}/>

        </Route>
     </Routes>
      <Footer />
    </Router>
  );
}

 /* App(); */
export default App;
