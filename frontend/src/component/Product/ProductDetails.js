import React, { useEffect, Fragment, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getProductDetails, newReview } from '../../actions/ProductActions';
import './ProductDetails.css';
import { useParams } from 'react-router-dom';
import ReviewCard from "./ReviewCard"
import LoadingScreen from '../LoadingComponent/LoadingScreen';
import { useAlert } from "react-alert";
import TopHeading from '../TopHeading';
import {addItemsToCart} from "../../actions/cartAction";
import {Dialog,DialogActions, DialogContent,DialogTitle,Button } from "@material-ui/core"
import {Rating} from "@material-ui/lab"
import { NEW_REVIEW_RESET } from '../../constants/productConstants';

const ProductDetails = () => {
  const alert = useAlert();

  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { id } = useParams();

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );


  useEffect(() => {
    if(error)
    {
       alert.error(error);
       dispatch(clearErrors());
    }
    if(reviewError)
    {
       alert.error(reviewError);
       dispatch(clearErrors());
    }
    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET});
    }
    dispatch(getProductDetails(id));
  }, [alert, dispatch, error, id, reviewError, success]);

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const[quantity,setQuantity]= useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");


  const submitReviewToggel=()=>{
    open? setOpen(false):setOpen(true);
  }

  const reviewSubmitHandler=()=>{
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);
    dispatch(newReview(myForm));

    setOpen(false);

  }

  const increaseQuantity=()=>{
    if(product.Stock<=quantity)
      {
       return;
      }
    const temp= quantity+1;
    setQuantity(temp);
  }
  
  const decreaseQuantity=()=>{
    if(quantity<=1)
    {
     return;
    }

  const temp= quantity-1;
  setQuantity(temp);
  }

  const addToCartHandler = () =>{
    dispatch(addItemsToCart(id, quantity))
    alert.success("Item added to cart");


  }
  return (
  <Fragment>
    {loading? <LoadingScreen/>:
    (  <Fragment>  
      <TopHeading title={`${product.name} DETAIL`}/>                 
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
          <Rating {...options}/>
          <span className='detailsBlock-2-span'> ({product.numberOfReviews} Reviews)</span>
        </div>
        <div className='detailsBlock-3'>
          <h1>{`$${product.price}`}</h1>
          <div className='detailsBlock-3-1'>
            <div className='detailsBlock-3-1-1'>
              <button onClick={decreaseQuantity}> -</button>
              <input readOnly value={quantity} type="number" />

              <button onClick={increaseQuantity}> +</button>
            </div>
            <button disabled = {product.Stock<1?true:false} onClick={addToCartHandler}>Add to Cart</button>
          </div>
          <p>
            Status:
            <b className={product.Stock<1 ? "redColor" : "greenColor"}>{product.Stock<1? "OutOfStock":"InStock"}</b>
          </p>
        </div>
        <div className='detailsBlock-4'>
          Description: <p>{product.description} </p>
        </div>
        <button onClick={submitReviewToggel}   className='submitReview'>Submit Review</button>
      </div>
      </div>

      <h3 className='reviewsHeading'>Product Reviews</h3>
          <Dialog aria-labelledby='simple-dialog-title'
          open={open} onClose={submitReviewToggel}>

              <DialogTitle>
                Submit Review
              </DialogTitle>
              <DialogContent className='submitDialog'>
                <Rating onChange={(e)=>setRating(e.target.value)}
                value={rating} size="large" />
                <textarea className='submitDialogTextArea'
                cols="30" rows="5" value={comment}
                onChange={(e)=>setComment(e.target.value)}></textarea>
            
              </DialogContent>
              <DialogActions>
                <Button onClick={reviewSubmitHandler}>Submit</Button>
                <Button onClick={submitReviewToggel}>Cancel</Button>
              </DialogActions>

          </Dialog>






      {product.reviews && product.reviews[0]?(
        <div className='reviews'>
        {product.reviews&&product.reviews.map((review)=><ReviewCard key={review._id} review={review}/>)}
        </div>
      ):(
        <p className='noReviews'>No Reviews Yet</p>
      )}
    </Fragment>)}
  </Fragment>
  );
};

export default ProductDetails;
