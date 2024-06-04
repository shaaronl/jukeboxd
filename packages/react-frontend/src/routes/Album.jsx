import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./Album.css";
import Footer from "./FooterFiles/Footer";

// Function to fetch reviews and calculate floored average rating
async function fetchReviewsAndCalculateRatings() {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(
      "https://jukeboxd-music.azurewebsites.net/reviews",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );
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
  const navigate = useNavigate();
  const [albums, setAlbums] = useState([]);
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const years = ["2023", "2022", "2021", "2020"];
  const [selectedYear, setSelectedYear] = useState("");
  const genres = ["pop", "r&b", "rap", "hip hop", "rock"];
  const [selectedGenre, setSelectedGenre] = useState("");
  const ratings = ["1", "2", "3", "4", "5"];
  const [selectedRating, setSelectedRating] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }

    fetch("https://jukeboxd-music.azurewebsites.net/albums", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setAlbums(data);
        setFilteredAlbums(data);
      })
      .catch((error) =>
        console.error("Error fetching albums:", error)
      );
  }, [navigate]);

  useEffect(() => {
    const filterAlbums = async () => {
      setLoading(true); // Start loading

      // Fetch average ratings
      const averageRatings =
        await fetchReviewsAndCalculateRatings();

      let filteredData = albums;

      // Filter by genre
      if (selectedGenre !== "") {
        filteredData = filteredData.filter((album) =>
          album.genres.includes(selectedGenre)
        );
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

      // Filter by searching
      if (searchQuery !== "") {
        filteredData = filteredData.filter((album) =>
          album.album_name
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        );
      }

      setFilteredAlbums(filteredData);
      setLoading(false); // Finish loading
    };
    filterAlbums();
  }, [
    selectedGenre,
    selectedYear,
    selectedRating,
    searchQuery,
    albums
  ]);

  const resetFilters = () => {
    setSelectedGenre("");
    setSelectedYear("");
    setSelectedRating("");
    setSearchQuery("");
  };

  return (
    <>
      <div className="extraDiv">
        <Navbar withLogo={true} />
        <div className="contentAlbum">
          <div className="filter-container">
            <select
              id="ratingFilter"
              value={selectedRating}
              onChange={(e) =>
                setSelectedRating(e.target.value)
              }
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
            <input
              type="text"
              placeholder="Search Albums"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
            />
            <button
              className="reset-button"
              onClick={resetFilters}
            >
              Reset
            </button>
          </div>
          {loading ? (
            <div className="loading">Loading...</div>
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
      <Footer />
    </>
  );
}
