import Navbar from "./Navbar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Review from "../../components/Review";
import "./MyReview.css";

export default function MyReviews() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        let response = await fetch(
          `http://localhost:8000/reviews/${username}`
        );
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        let data = await response.json();
        setUser(data.user);
        setReviews(data.reviews);
      } catch {
        console.error("Error fetching reviews");
      }
    }
    fetchData();
    console.log(user, reviews);
  }, []);

  async function handleDelete(reviewId) {
    console.log(reviewId);
    try {
      const response = await fetch(
        `http://localhost:8000/reviews/user/${reviewId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (response.status != 204) {
        throw new Error("Character not found");
      } else {
        const updated = reviews.filter((review) => {
          return review._id !== reviewId;
        });
        setReviews(updated);
      }
    } catch (e) {
      console.log(e);
    }
  }

  if (!user || !reviews) return <div>Loading...</div>;

  return (
    // copy pasted from loading page - fix later
    <div className="loading-text">
      <Navbar withLogo={true} />
      <div className="reviewsPage">
        <div className="userSide">
          <AccountCircleIcon></AccountCircleIcon>
          <h1>{user.username}</h1>
        </div>
        <div className="reviewsSide">
          {reviews.map((review) => (
            <Review
              key={review._id}
              review={review}
              rightUser={
                localStorage.getItem("username") == username
              }
              handleDelete={() => handleDelete(review._id)}
            ></Review>
          ))}
        </div>
      </div>
    </div>
  );
}
