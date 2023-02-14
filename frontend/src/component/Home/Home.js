import React, { Fragment } from 'react';
import "./Home.css"
const Home = () => {
    return (
        <Fragment>
            <div className='banner'>
            <p> Welcome to buy, sell , giveaway</p>
            <h1>Find amazing resouces</h1>
            <a href="#container">
            <button className='myButton'>
                Scroll 
            </button>

            </a>
            </div>
            <h2> Featured Products</h2>


        </Fragment>
    );
}

export default Home;
