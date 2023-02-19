import React from 'react';
import {Link} from "react-router-dom"
import ReactStars from 'react-rating-stars-component'



const Product = ({product}) => {
    const options={
        edit:false, //cannot let user edit
        color: "lightpink",
        activeColor:"tomato",
        size:20,
        value:product.ratings,
        isHalf:true,
    
    };
    return (
        
         <Link className='productCard' to={product._id}>
         <img src={product.images[0].url} alt="not found"/>
         <p>{product.name}</p>
         
         <div>
            <ReactStars {...options}/>
            <span>
                ( {product.numberOfReviews} Reviews )
            </span>
         </div>
         <span> 
            {`$${product.price}`}
         </span>
         </Link>
    );
}

export default Product;
