import Navbar from "./Navbar";
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
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `https://jukeboxd-music.azurewebsites.net/reviews/${username}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          }
        );
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        const data = await response.json();
        setUser(data.user);
        setReviews(data.reviews);
      } catch {
        console.error("Error fetching reviews");
      }
    }
    fetchData();
    setChanged(false);
  }, [changed, username]);

  async function handleDelete(reviewId) {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `https://jukeboxd-music.azurewebsites.net/reviews/user/${reviewId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
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
    const token = localStorage.getItem("token");

    // change the user's image in the database
    const response = await fetch(
      `https://jukeboxd-music.azurewebsites.net/user/picture/${localStorage.getItem("username")}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          imageAddress: imageAddress
        })
      }
    );
    if (!response) {
      throw Error("Error updating user picture");
    }
    localStorage.setItem("profilePic", imageAddress);
    setChanged(true);
  }

  if (!user || !reviews)
    return (
      <div className="loading-text">
        <Navbar withLogo={true} />
        <div>Loading...</div>
      </div>
    );

  return (
    // copy pasted from loading page - fix later
    <div className="loading-text">
      <Navbar withLogo={true} />
      <div className="reviewsPage">
        <div className="userSide">
          <Avatar
            alt={username}
            src={user.profilePic}
            sx={{ height: "200px", width: "200px" }}
          />
          <h1>{user.username}</h1>
          {localStorage.getItem("username") == username && (
            <button
              onClick={() =>
                setChangeImageDisplay(!changeImageDisplay)
              }
            >
              Change Profile Picture
            </button>
          )}
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
