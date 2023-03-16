import React, { Fragment, useEffect } from "react";
import "./Home.css";
import ProductCard from "./ProductCard";
import TopHeading from "../TopHeading";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/ProductActions";
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
       dispatch(clearErrors());
    
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
            <p> Welcome to buy, sell, giveaway</p>
            <h1>Find amazing resouces</h1>
            <a href="#container">
              <button className="myButton">Scroll</button>
            </a>
          </div>
          <h2 className="homeHeading"> Featured Products</h2>

          <div className="containar" id="container">
            {products &&
              products.map((product) => <ProductCard key={product._id} product={product} />)}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
