import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Rating from "@mui/material/Rating";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import "./CreateReview.css";
import { useNavigate, useParams } from "react-router-dom";

export default function CreateReview() {
  const navigate = useNavigate();

  const { id } = useParams(); // Get the album id from the URL
  const [album, setAlbum] = useState({});
  const [artist, setArtist] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    fetchAlbumById(id)
      .then((data) => {
        setAlbum(data);
        setArtist(data.artists[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  function fetchAlbumById(id) {
    const token = localStorage.getItem("token");

    return fetch(
      `https://jukeboxd-music.azurewebsites.net/albums/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error fetching album:", error);
        throw error;
      });
  }

  function updateRating(value) {
    setRating(value);
  }

  function updateReviewText(e) {
    setReviewText(e.target.value);
  }

  async function handleSubmit(e) {
    const token = localStorage.getItem("token");

    e.preventDefault();
    const response = await fetch(
      `https://jukeboxd-music.azurewebsites.net/review/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
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
      throw Error("Error adding review");
    } else {
      console.log("here");
      navigate(`/album/${album._id}`);
    }
  }

  if (!album || !artist) return <div>Loading...</div>;

  return (
    <div>
      <Navbar withLogo={true} />
      <div className="createReview">
        <img
          src={album.album_cover}
          alt={album.album_name + "cover"}
          className="coverImage"
          data-testid="album-cover"
        />
        <form className="reviewRight" onSubmit={handleSubmit}>
          <p>I STREAMED...</p>
          <h2 className="albumName">{album.album_name}</h2>
          <p>
            {album.release_date.split("-")[0] +
              " " +
              artist.artist_name}
          </p>
          <textarea
            placeholder="Add a review"
            onChange={updateReviewText}
            data-testid="review-textarea"
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
            data-testid="rating"
          />
          <button type="submit" data-testid="submit-button">
            SAVE
          </button>
        </form>
      </div>
    </div>
  );
}
