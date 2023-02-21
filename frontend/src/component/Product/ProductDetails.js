import React, { useEffect, Fragment } from 'react';
import Carousel from 'react-material-ui-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../../actions/ProductActions';
import './ProductDetails.css';

const ProductDetails = ({ match }) => {
    console.log(match);
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <Fragment>                   
      <div className='ProductDetails'>
        <h1>{product.name}</h1>
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
      </div>
    </Fragment>
  );
};

export default ProductDetails;