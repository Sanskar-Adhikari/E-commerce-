import './App.css';
import Header from './component/Header/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './component/Footer/Footer';
import Home from './component/Home/Home';
import ProductDetails from './component/Product/ProductDetails';
import Products from './component/Product/Products';
import Search from './component/Product/Search';
import Login from './component/UserLogin/Login';
import store from "./store";
import React from 'react';
import { loadUser } from './actions/UserAction';
import UserOptions from "./component/Header/UserOptions";
import { useSelector } from 'react-redux';
import Profile from "./component/UserLogin/Profile"
import ProtectedRoute from './component/Route/ProtectedRoute';
import { redirect  } from "react-router-dom";

function App() {
  
const {isAuth, user} = useSelector(state=>state.user)
  React.useEffect(()=>{
    store.dispatch(loadUser())
  },[])
  return (
    <Router>
      <Header />
      {isAuth && <UserOptions user={user}/>}
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products/>} />
        <Route path="/products/:keyword" element={<Products/>} />
        <Route path="/search" element={<Search/>} />
        <Route path="/login" element={<Login/>} />
        <Route element={<ProtectedRoute />}>
          <Route path="/account" element={<Profile/>}/>

        </Route>


     </Routes>
      <Footer />
    </Router>
  );
}

export default App;
