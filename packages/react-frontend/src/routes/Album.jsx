import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "./Album.css";

async function fetchArtistBySpotifyId(spotifyId) {
  try {
    const response = await fetch(
      `http://localhost:8000/artists?spotify_id=${spotifyId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch artist data");
    }
    const artistData = await response.json();
    return artistData;
  } catch (error) {
    console.error("Error fetching artist data:", error);
    return null; // Return null if an error occurs
  }
}

// Function to fetch reviews and calculate floored average rating
async function fetchReviewsAndCalculateRatings() {
  try {
    const response = await fetch("http://localhost:8000/reviews");
    if (!response.ok) {
      throw new Error("Failed to fetch reviews");
    }
    const reviews = await response.json();
    const albumRatings = {};

    // Calculate the total rating and count for each album
    reviews.forEach((review) => {
      const { album_id, rating } = review;
      if (!albumRatings[album_id]) {
        albumRatings[album_id] = { totalRating: 0, count: 0 };
      }
      albumRatings[album_id].totalRating += rating;
      albumRatings[album_id].count += 1;
    });

    // Calculate the floored average rating for each album
    const averageRatings = {};
    for (const albumId in albumRatings) {
      const { totalRating, count } = albumRatings[albumId];
      averageRatings[albumId] = Math.floor(totalRating / count);
    }

    return averageRatings;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return {};
  }
}

export default function Album() {
  const [albums, setAlbums] = useState([]);
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const years = ["2023", "2022", "2021", "2020"];
  const [selectedYear, setSelectedYear] = useState("");
  const genres = ["pop", "r&b", "rap", "hip hop", "rock"];
  const [selectedGenre, setSelectedGenre] = useState("");
  const ratings = ["1", "2", "3", "4", "5"];
  const [selectedRating, setSelectedRating] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/albums")
      .then((response) => response.json())
      .then((data) => {
        setAlbums(data);
        setFilteredAlbums(data);
      })
      .catch((error) =>
        console.error("Error fetching albums:", error)
      );
  }, []);

  useEffect(() => {
    const filterAlbums = async () => {
      setLoading(true); // Start loading

      // Fetch average ratings
      const averageRatings = await fetchReviewsAndCalculateRatings();

      let filteredData = albums;

      // Filter by genre
      if (selectedGenre !== "") {
        const filtered = await Promise.all(
          albums.map(async (album) => {
            for (const spotifyId of album.artists) {
              const artist = await fetchArtistBySpotifyId(spotifyId);
              if (artist && artist.genres.includes(selectedGenre)) {
                return true;
              }
            }
            return false;
          })
        );
        filteredData = albums.filter((_, index) => filtered[index]);
      }

      // Filter by year
      if (selectedYear !== "") {
        filteredData = filteredData.filter((album) =>
          album.release_date.startsWith(selectedYear)
        );
      }

      // Filter by average rating
      if (selectedRating !== "") {
        filteredData = filteredData.filter((album) => {
          const albumRating = averageRatings[album._id] || 0;
          return albumRating === parseFloat(selectedRating);
        });
      }

      setFilteredAlbums(filteredData);
      setLoading(false); // Finish loading
    };
    filterAlbums();
  }, [selectedGenre, selectedYear, selectedRating, albums]);

  return (
    <div>
      <Navbar withLogo={true} />
      <div className="content">
        <div className="filter-container">
        <select
            id="ratingFilter"
            value={selectedRating}
            onChange={(e) => setSelectedRating(e.target.value)}
          >
            <option value="">RATING</option>
            {ratings.map((rating) => (
              <option key={rating} value={rating}>
                {rating}
              </option>
            ))}
          </select>
          <select
            id="genreFilter"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <option value="">GENRE</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          <select
            id="yearFilter"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">YEAR</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="gallery-container">
            {filteredAlbums.map((album) => (
              <div className="gallery-item" key={album._id}>
                <Link
                  to={`/album/${album._id}`}
                  className="album-link"
                >
                  <img
                    src={album.album_cover}
                    alt={`Album ${album.album_name}`}
                  />
                  <span className="album-name">
                    {album.album_name}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

