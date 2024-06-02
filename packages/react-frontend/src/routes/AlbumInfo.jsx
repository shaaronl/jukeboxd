import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import "./AlbumInfo.css";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Avatar from "@mui/material/Avatar";

export default function AlbumInfo() {
  const { id } = useParams(); // Get the album id from the URL
  const [album, setAlbum] = useState(null);
  const [artist, setArtist] = useState(null);
  const [songs, setSongs] = useState([]); // State to hold the song data
  const [reviews, setReviews] = useState([]); // state to hold array of reviews
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAlbumById(id)
      .then((data) => {
        setAlbum(data);
        fetchReviewsByAlbumId(data._id);
        setArtist(data.artists[0]);
        setSongs(data.track_list); // Pass the track_list to fetchSongBySpotifyId
      })
      .catch((error) => setError(error.message));
  }, [id]);

  async function fetchReviewsByAlbumId(albumId) {
    try {
      const response = await fetch(
        `http://localhost:8000/reviews/albums/${albumId}`
      );
      if (!response.ok) {
        throw new Error(
          `Network response was not ok: ${response.statusText}`
        );
      }
      const reviewData = await response.json();
      setReviews(reviewData);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setError(error.message);
    }
  }

  function fetchAlbumById(id) {
    return fetch(`http://localhost:8000/albums/${id}`)
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

  if (error) return <div>Error: {error}</div>;
  if (!album || !artist) return <div>Loading...</div>;

  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (sum, review) => sum + review.rating,
            0
          ) / reviews.length
        ).toFixed(1)
      : "No reviews";

  return (
    <div className="album-info">
      <Navbar withLogo={true} />
      <div className="content">
        <div className="left-section">
          <img
            src={album.album_cover}
            alt={`Album ${album.album_name}`}
            className="album-cover"
          />
          <div className="song-list">
            <h3>Song List</h3>
            <ul>
              {songs.map((song, index) => (
                <li key={song._id}>
                  {index + 1}. {song.track_name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="right-section">
          <div className="album-details">
            <h2 className="album-title">{album.album_name}</h2>
            <p>
              {album.release_date.split("-")[0] + " "}
              {artist.artist_name} |{"   "}
              <span className="rating-stars">
<<<<<<< Updated upstream
                {starRating}{" "}
=======
                <Rating
                  name="album-rating"
                  value={parseFloat(avgRating)}
                  precision={0.1}
                  readOnly
                />
>>>>>>> Stashed changes
                {avgRating !== "No reviews" && avgRating}
              </span>
            </p>
            <p>{album.description}</p>
            <Link to={`/CreateReview/${album._id}`}>
              <button className="rate-review-btn">
                Rate and Review
              </button>
            </Link>
          </div>
          <div className="reviews">
            <h3>Reviews</h3>
            {reviews.length === 0 ? (
              <p>No reviews yet. Be the first to review!</p>
            ) : (
              reviews.map((review) => (
                <div key={review._id} className="review">

                  <div className="reviewTop">
                    <Link
                      to={`/reviews/${review.written_by.username}`}
                    >
                      <Avatar
                        alt={review.written_by.username}
                        src={review.written_by.profilePic}
                      />
                    </Link>
                    <div className="reviewTopRight">
                      <Link
                        to={`/reviews/${review.written_by.username}`}
                        className="reviewUserName"
                      >
                        <h3>{review.written_by.username}</h3>
                      </Link>
                      <Rating
                        name="half-rating-read"
                        defaultValue={review.rating}
                        precision={0.5}
                        emptyIcon={
                          <StarBorderIcon
                            fontSize="inherit"
                            sx={{
                              color: "#d9d9d9"
                            }}
                          />
                        }
                        readOnly
                      />
                    </div>
                  </div>
                  <p>{review.content}</p>
                </div>
              ))
            )}
          </div>
          <div className="popularity">
            <h3>Popularity</h3>
            <p>{album.popularity}</p>
          </div>
          <div className="spotify-link">
            <h3>Spotify Link</h3>
            <a
              href={album.spotify_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {album.spotify_link}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
