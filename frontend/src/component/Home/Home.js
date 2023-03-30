import React, { Fragment, useEffect } from "react";
import "./Home.css";
import ProductCard from "./ProductCard";
import TopHeading from "../TopHeading";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/ProductActions";
import LoadingScreen from "../LoadingComponent/LoadingScreen";
import { useAlert } from "react-alert";


/**/
/*
Home()
NAME
    Home
SYNOPSIS
    Home();
DESCRIPTION
    Renders the home page of the website, including a banner and a list of featured products.
RETURNS
    JSX element that renders the Home component
*/
/**/
const Home = () => {
  // Get the 'alert' function from the 'useAlert' hook and the 'dispatch' function from the 'useDispatch' hook
  const alert = useAlert();
  const dispatch = useDispatch();

  // Get the 'loading', 'error', and 'products' properties from the 'products' state using the 'useSelector' hook
  const { loading, error, products } = useSelector((state) => state.products);

  // Trigger the effect when the component mounts or when the 'error' state changes
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    // Fetch the products using the 'getProduct' action creator
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {/* If the 'loading' state is true, display a loading screen */}
      {loading ? (
        <LoadingScreen />
      ) : (
        // Otherwise, render the home page
        <Fragment>
          {/* TopHeading component */}
          <TopHeading title="SENIOR PROJECT" />

          <div className="banner">
            <h2> Welcome to buy, sell, giveaway</h2>
            <h1>Find amazing resouces</h1>
            <a href="#scroll">
              <button className="myButton">Find Products</button>
            </a>
          </div>

          <h2 className="homeHeading" id="scroll"> Featured Products</h2>


          <div className="containar" id="container">

            {/* If there are products, map each product to a 'ProductCard' component */}
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
/* Home(); */

export default Home;
