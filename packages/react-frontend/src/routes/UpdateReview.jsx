import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Rating from "@mui/material/Rating";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import "./CreateReview.css";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateReview() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the review id from the URL
  const [review, setReview] = useState(null);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        let response = await fetch(
          `http://localhost:8000/reviews/user/${id}`
        );
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        let data = await response.json();
        setReview(data);
        setRating(data.rating);
        setReviewText(data.content);
      } catch {
        console.error("Error fetching review");
      }
    }
    fetchData();
  }, [id]);

  function updateRating(value) {
    setRating(value);
  }

  function updateReviewText(e) {
    setReviewText(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:8000/review/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          rating: rating,
          content: reviewText,
          username: localStorage.getItem("username")
        })
      }
    );
    if (!response) {
      throw Error("Error updating review");
    } else {
      navigate(`/reviews/${localStorage.getItem("username")}`);
    }
  }

  if (!review) return <div>Loading...</div>;

  return (
    <div>
      <Navbar withLogo={true} />
      <div className="createReview">
        <img
          src={review.album_id.album_cover}
          alt={review.album_id.album_name + "cover"}
          className="coverImage"
        />
        <form className="reviewRight" onSubmit={handleSubmit}>
          <p>I STREAMED...</p>
          <h2 className="albumName">
            {review.album_id.album_name}
          </h2>
          <p>{review.album_id.release_date.split("-")[0]}</p>
          <textarea
            placeholder="Add a review"
            onChange={updateReviewText}
            defaultValue={review.content}
          ></textarea>
          <p className="ratingText" htmlFor="rating">
            Rating
          </p>
          <Rating
            name="half-rating"
            onChange={(event, newValue) =>
              updateRating(newValue)
            }
            defaultValue={review.rating}
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
