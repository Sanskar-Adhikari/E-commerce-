import React, { Fragment, useState } from 'react'
import "./search.css";
import { useNavigate } from 'react-router-dom';
import TopHeading from '../TopHeading';
const Search=()=> {
const navigate = useNavigate();
    const [keyword, setKeyword]= useState("");

    const searchSubmitHandler = (e)=>{
        e.preventDefault();
        console.log(keyword);
        if(keyword.trim())
        {
          
            navigate(`/products/${keyword}`);
        }
        else{
            navigate("/products");
        }
    }

  return (
  <Fragment>
    <TopHeading title="SEARCH"/>  
    <form className='searchBox' onSubmit={searchSubmitHandler}>
    <input type="text" placeholder="Search A Product" onChange={(e)=>setKeyword(e.target.value)}/>
    <input type="submit" value="Search"/>
    </form>
  </Fragment>
  );
}

export default Search;
 