import React, { Fragment, useEffect,useState } from 'react';
import "./Products.css";
import { useDispatch, useSelector } from 'react-redux';
import LoadingScreen from '../LoadingComponent/LoadingScreen';
import { clearErrors, getProduct } from '../../actions/ProductActions';
import ProductCard from '../Home/ProductCard';
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";
import { Slider, Typography } from '@material-ui/core';




const categories = ["Books",
"Notes",
"StudyMaterial",
"Tops",
"Bottoms",
"Laptop",
"SmartPhones",
"Shoes",
"DormItems"]
const Products = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 200]);
  const [category, setCategory]= useState("");
  const [ratings, setRatings]= useState(0);



    const dispatch = useDispatch();
    const { products, loading, error,productsCount, resultPerPage,filteredProductsCount } = useSelector(
      (state) => state.products
    ); 
const { keyword } = useParams();
const setCurrentPageNo=(e)=>{
  setCurrentPage(e);
}

const priceHandler=(e, newPrice)=>
{
  setPrice(newPrice);
}
    useEffect(() => {
        dispatch(getProduct(keyword,currentPage,price,category,ratings));
      }, [category, currentPage, dispatch, keyword, price, ratings]);

      let count = filteredProductsCount;
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
                <div className='slidestyle'>
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

<Typography>
  Categories
  <div>
    <ul className='categorisBox'>
      {categories.map((category)=>(
        <li className='category-link' key={category}
        onClick={()=>setCategory(category)}>
          {category}
        </li>
      ))}
    </ul>
  </div>
</Typography>

                <fieldset>
                    <Typography component="legend">
                      RatingsOver
                    </Typography>
                    <Slider value = {ratings}
                    onChange={(e, newRating)=>{
                      setRatings(newRating)
                    }}
                    aria-labelledby="continuous-slider"
                    min={0}
                    max={5}
                    valueLabelDisplay="auto"

                    />
                                    

                    </fieldset>
                </div>

            <div className='whole'>
        {resultPerPage<count && 
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
          />}
            </div>
          </Fragment>)}
        </Fragment>
        );
}

export default Products;
