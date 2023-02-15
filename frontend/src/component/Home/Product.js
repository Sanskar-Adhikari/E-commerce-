import React from 'react';
import {Link} from "react-router-dom"
import ReactStars from 'react-rating-stars-component'

const options={
    edit:false, //cannot let user edit
    color: "blue",
    activeColor:"tomato",
    size:20,
    value:3.5,
    isHalf:true,

}

const Product = ({product}) => {
    return (
         <Link className='productCard' to={product._id}>
         <img src={product.images[0].url} alt="not found"/>
         <p>{product.name}</p>
         
         <div>
            <ReactStars {...options}/>
            <span>
                100 reviews
            </span>
         </div>
         <span> 
            {product.price}
         </span>
         </Link>
    );
}

export default Product;
