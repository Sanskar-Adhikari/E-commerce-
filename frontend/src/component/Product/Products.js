import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../LoadingComponent/LoadingScreen";
import { clearErrors, getProduct } from "../../actions/ProductActions";
import ProductCard from "../Home/ProductCard";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import { Slider, Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import TopHeading from "../TopHeading";

// initializes an array of categories
const categories = [
  "Books",
  "Notes",
  "StudyMaterial",
  "Past Papers",
  "Study Guides",
  "laptop",
  "SmartPhones",
  "Shoes",
  "DormItems",
];

/**/
/*
Products
NAME
    Products
SYNOPSIS
    Products()
DESCRIPTION
    This component displays a list of products, with filtering options for price range, category, and rating.
    The component renders a ProductCard component for each product and displays a pagination component for navigating between pages of products.
RETURNS
    Returns a JSX element that displays a list of products and filtering options.
*/
/**/
const Products = () => {
  //initializes state variables using the useState hook
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 200]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  // initializes variables using the useSelector, useParams and useDispatch hooks
  const dispatch = useDispatch();
  const alert = useAlert();
  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  const { keyword } = useParams();

  // function to update the current page number
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  // function to update the price range
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  // useEffect hook to dispatch an action to get the products based on various filters
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [alert, category, currentPage, dispatch, error, keyword, price, ratings]);

  let count = filteredProductsCount;
  return (
    <Fragment>
      <TopHeading title="PRODUCTS" />
      {/* If the products are still loading, show a loading screen */}

      {loading ? (
        <LoadingScreen />
      ) : (
        <Fragment>

          {/* Show the heading and the product cards */}
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <div className="spaces" key={product._id}>
                  <ProductCard product={product} />
                </div>
              ))}
          </div>

          {/* Show the price range slider, categories, and ratings filter */}
          <div className="slidestyle">
            <Typography>Price</Typography>
            <Typography>Select price range</Typography>
            <br></br>
            <br></br>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="on"
              aria-labelledby="range-slider"
              min={0}
              max={200}
            />

            <Typography>Categories</Typography>
            <ul className="categorisBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">RatingsOver</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                min={0}
                max={5}
                valueLabelDisplay="auto"
              />
            </fieldset>
          </div>

          {/* Show the pagination component */}
          <div className="whole">
            {resultPerPage < count && (
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

/* Products() */
export default Products;
