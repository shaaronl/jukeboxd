import Navbar from "./Navbar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Review from "../../components/Review";
import "./MyReview.css";
import Avatar from "@mui/material/Avatar";

export default function MyReviews() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [changeImageDisplay, setChangeImageDisplay] =
    useState(false);
  const [imageAddress, setImageAddress] = useState(null);

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

  async function handleChangeImage() {
    // change the user's image in the database
    const response = await fetch(
      `http://localhost:8000/user/picture/${localStorage.getItem("username")}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          imageAddress: imageAddress
        })
      }
    );
    if (!response) {
      throw Error("Error updating user picture");
    }
  }

  if (!user || !reviews) return <div>Loading...</div>;

  return (
    // copy pasted from loading page - fix later
    <div className="loading-text">
      <Navbar withLogo={true} />
      <div className="reviewsPage">
        <div className="userSide">
          <Avatar
            alt={username}
            src="https://preview.redd.it/a-picture-is-worth-a-1-000-questions-for-the-culture-v0-f65u21w2uc3d1.jpeg?auto=webp&s=9d6ec8822653dc1d8fb7ccc1a639bbec81cdced1"
          />
          <h1>{user.username}</h1>
          <button
            onClick={() =>
              setChangeImageDisplay(!changeImageDisplay)
            }
          >
            Change Profile Picture
          </button>
          {changeImageDisplay && (
            <div className="imageURLInput">
              <input
                type="text"
                placeholder="Image address"
                onChange={(e) =>
                  setImageAddress(e.target.value)
                }
              ></input>
              <button onClick={() => handleChangeImage()}>
                Save
              </button>
            </div>
          )}
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
