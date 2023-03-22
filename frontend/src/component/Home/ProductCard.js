import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";

/**/
/*
productCard
NAME
    productCard
SYNOPSIS
    productCard({product})
    product -> The product object to be displayed in the card.
DESCRIPTION
    This function takes a product object as a parameter and returns the JSX for a product card component.
    The component displays the product's image, name, rating, number of reviews, and price.
    The rating is displayed using the Rating component from the Material-UI library.
RETURNS
    Returns the JSX for the product card component.
*/
/**/
const productCard = ({ product }) => {

  // Options for the rating component
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Link className="productCard" to={`/product/${product._id}`}>

      {/* Render product image */}
      {product.images && product.images.length > 0 && (
        <img src={product.images[0].url} alt="not found" />
      )}
      <p>{product.name}</p>
      <div>
        
        {/* Render Rating component */}
        <Rating {...options} />
        <span className="">( {product.numberOfReviews} Reviews )</span>
      </div>

      {/* Render product price */}
      <span>{`$${product.price}`}</span>
    </Link>
  );
};
/* productCard({product}) */

export default productCard;
