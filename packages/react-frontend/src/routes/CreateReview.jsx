import React, { useState } from "react";
import Navbar from "./Navbar";
import Rating from "@mui/material/Rating";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import "./CreateReview.css";

export default function CreateReview() {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  function updateRating(value) {
    setRating(value);
  }

  function updateReviewText(e) {
    setReviewText(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(rating);
    console.log(reviewText);
  }

  // note dummy data for now till we find out how we're gonna pass info in
  const albumData = {
    _id: { $oid: "664591cc2febc53240b7275b" },
    spotify_id: "07w0rG5TETcyihsEIZR3qG",
    album_name: "SOS",
    release_date: "2022-12-09",
    artists: ["7tYKF4w9nC0nq9CsPZTHyP"],
    // artist name isn't actually a field, but Idk if that's passed in or we need to look in database for it
    artist_name: "SZA",
    album_cover:
      "https://i.scdn.co/image/ab67616d0000b27370dbc9f47669d120ad874ec1"
  };
  return (
    <div>
      <Navbar withLogo={true} />
      <div className="createReview">
        <img
          src={albumData.album_cover}
          alt={albumData.album_name + "cover"}
          className="coverImage"
        />
        <form className="reviewRight" onSubmit={handleSubmit}>
          <p>I STREAMED...</p>
          <h2 className="albumName">{albumData.album_name}</h2>
          <p>
            {albumData.release_date.split("-")[0] +
              " " +
              albumData.artist_name}
          </p>
          <textarea
            placeholder="Add a review"
            onChange={updateReviewText}
          ></textarea>
          <p className="ratingText" htmlFor="rating">
            Rating
          </p>
          <Rating
            name="half-rating"
            onChange={(event, newValue) =>
              updateRating(newValue)
            }
            defaultValue={0}
            precision={0.5}
            sx={{
              fontSize: "2rem",
              margin: "0.1em"
            }}
            emptyIcon={
              <StarBorderIcon
                fontSize="inherit"
                sx={{
                  color: "#d9d9d9"
                }}
              />
            }
          />
          <button type="submit">SAVE</button>
        </form>
      </div>
    </div>
  );
}
