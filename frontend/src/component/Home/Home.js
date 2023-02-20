import React, { Fragment, useEffect } from "react";
import "./Home.css";
import Product from "./Product.js";
import TopHeading from "../TopHeading";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../actions/ProductActions";
import LoadingScreen from "../LoadingComponent/LoadingScreen";
import { useAlert } from "react-alert";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
     if (error) {
       alert.error(error);
    
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);
  return (
    <Fragment>
      {loading ? (
        <LoadingScreen />
      ) : (
        <Fragment>
          <TopHeading title="SENIOR PROJECT" />
          <div className="banner">
            <p> Welcome to buy, sell , giveaway</p>
            <h1>Find amazing resouces</h1>
            <a href="#container">
              <button className="myButton">Scroll</button>
            </a>
          </div>
          <h2 className="homeHeading"> Featured Products</h2>

          <div className="containar" id="container">
            {products &&
              products.map((product) => <Product key={product._id} product={product} />)}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
