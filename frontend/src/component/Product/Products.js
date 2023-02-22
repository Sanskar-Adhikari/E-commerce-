import React, { Fragment, useEffect } from 'react';
import "./Products.css";
import { useDispatch, useSelector } from 'react-redux';
import LoadingScreen from '../LoadingComponent/LoadingScreen';
import { clearErrors, getProduct } from '../../actions/ProductActions';
import ProductCard from '../Home/ProductCard';
 
const Products = () => {

    const dispatch = useDispatch();
    const { products, loading, error,productsCount } = useSelector(
      (state) => state.products
    ); 
    useEffect(() => {
        dispatch(getProduct());
      }, [dispatch]);

    return (
        <Fragment>
          {loading? <LoadingScreen/>:
          (  <Fragment>                   
            <h2 className='productsHeading'>Products</h2>
            <div className='products'>
             
              {products&& products.map((product)=>(
                 <div className='spaces'>
                <ProductCard key={product._id} product={product}/>
                </div>
              ))}

    
            </div>
          </Fragment>)}
        </Fragment>
        );
}

export default Products;
