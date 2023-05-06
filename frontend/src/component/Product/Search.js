import React, { Fragment, useState } from "react";
import "./search.css";
import { useNavigate } from "react-router-dom";
import TopHeading from "../TopHeading";


/**/
/*
Search
NAME
    Search
SYNOPSIS
    Search()
DESCRIPTION
    This component renders a search box with an input field and a submit button. The user can enter a search term
    into the input field and click the submit button to trigger a search.
RETURNS
    component that displays a search bar and handles search submissions.
*/
/**/
const Search = () => {
  // useNavigate hook for navigating
  const navigate = useNavigate();

    // state hook for keyword
  const [keyword, setKeyword] = useState("");

    // search submit handler function
  const searchSubmitHandler = (e) => {
    e.preventDefault();

    // check if keyword is not empty
    if (keyword.trim()) 
    {
      // navigate to search result page with the keyword as parameter
      navigate(`/products/${keyword}`);
    } else 
    {
      // navigate to products page if keyword is empty
      navigate("/products");
    }
  };

  // rendering search form
  return (
    <Fragment>

      {/* Display the page heading */}
      <TopHeading title="SEARCH" />

      {/* Display the search form */}
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search A Product"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

/* Search() */
export default Search;
