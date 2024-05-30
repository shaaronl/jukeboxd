import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "./Album.css";
import Footer from "./FooterFiles/Footer";
// Assume you have a function to fetch artist data from an API
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

export default function Album() {
  const [albums, setAlbums] = useState([]);
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const years = ["2023", "2022", "2021", "2020"];
  const [selectedYear, setSelectedYear] = useState("");
  const genres = ["pop", "r&b", "rap", "hip hop", "rock"];
  const [selectedGenre, setSelectedGenre] = useState("");

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
      let filteredData = albums;

      // Filter by genre
      if (selectedGenre !== "") {
        const filtered = await Promise.all(
          albums.map(async (album) => {
            for (const spotifyId of album.artists) {
              const artist =
                await fetchArtistBySpotifyId(spotifyId);
              if (
                artist &&
                artist.genres.includes(selectedGenre)
              ) {
                return true;
              }
            }
            return false;
          })
        );
        filteredData = albums.filter(
          (_, index) => filtered[index]
        );
      }

      // Filter by year
      if (selectedYear !== "") {
        filteredData = filteredData.filter((album) =>
          album.release_date.startsWith(selectedYear)
        );
      }

      setFilteredAlbums(filteredData);
      setLoading(false); // Finish loading
    };
    filterAlbums();
  }, [selectedGenre, selectedYear, albums]);

  return (
    <>
    <div>
      <Navbar withLogo={true} />
      <div className="content">
        <div className="filter-container">
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
    <Footer />
    </>
  );
}
