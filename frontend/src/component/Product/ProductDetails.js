import React, { useEffect, Fragment } from 'react';
import Carousel from 'react-material-ui-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../../actions/ProductActions';
import './ProductDetails.css';
import { useParams } from 'react-router-dom';
import ReactStars from'react-rating-stars-component';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { id } = useParams();

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  
  return (
    <Fragment>                   
      <div className='ProductDetails'>
       
        <Carousel>
          {product.images &&
            product.images.map((item, i) => (
              <img
                className='CarouselImage'
                key={item.url}
                src={item.url}
                alt={`${i}Slide`}
              />
            ))}
        </Carousel>
      
  
      <div>
        <div className='detailsBlock-1'>
          <h2>{product.name}</h2>
          <p>Product # {product._id}</p>
        </div>
        <div className='detailsBlock-2'>
          <ReactStars {...options}/>
          <span> ({product.numberOfReviews} Reviews)</span>
        </div>
        <div className='detailsBlock-3'>
          <h1>{`$${product.price}`}</h1>
          <div className='detailsBlock-3-1'>
            <div className='detailsBlock-3-1-1'>
              <button> -</button>
              <input value="1" type="number"/>
              <button> +</button>
            </div>
            <button>Add to Cart</button>
          </div>
          <p>
            Status:
            <b className={product.Stock<1 ? "redColor" : "greenColor"}>{product.Stock<1? "OutOfStock":"InStock"}</b>
          </p>
        </div>
        <div className='detailsBlock-4'>
          Description: <p>{product.description} </p>
        </div>
        <button className='submitReview'>Submit Review</button>
      </div>
      </div>
    </Fragment>
  );
};

export default ProductDetails;
