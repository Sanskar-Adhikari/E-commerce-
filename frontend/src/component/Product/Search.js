import React, { Fragment, useState } from 'react'
import "./search.css";
import { useNavigate } from 'react-router-dom';
const Search=({history})=> {
console.log(history);
const navigate = useNavigate();
    const [keyword, setKeyword]= useState("");

    const searchSubmitHandler = (e)=>{
        e.preventDefault();
        if(keyword.trim())
        {
            navigate(`/products/${keyword}`, { replace: true });
        }
        else{
            navigate("/products", { replace: true });
        }
    }

  return (
  <Fragment>
    <form className='searchBox' onSubmit={searchSubmitHandler}>
    <input type="text" placeholder="Search A Product" onChange={(e)=>setKeyword(e.target.value)}/>
    <input type="submit" value="Search"/>
    </form>
  </Fragment>
  );
}

export default Search;
