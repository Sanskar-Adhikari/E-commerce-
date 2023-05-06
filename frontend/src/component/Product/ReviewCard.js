import React from "react";
import profilePng from "../extra/profilepng.png";
import { Rating } from "@material-ui/lab";

/**/
/*
ReviewCard
NAME
    ReviewCard
SYNOPSIS
    ReviewCard = ({review})
    review -> object containing review data.
DESCRIPTION
    This component renders a card with a user's review details including their name, rating and comment.
RETURNS
    Returns a JSX element of a review card with the user's review details.
*/
/**/
const ReviewCard = ({ review }) => {
  //options for ratings component
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <div className="reviewCard">
      {/* Show the profile picture and review details */}
      <img src={profilePng} alt="User" />
      <p>{review.name}</p>
      <Rating {...options} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

/* ReviewCard = ({review}) */
export default ReviewCard;
