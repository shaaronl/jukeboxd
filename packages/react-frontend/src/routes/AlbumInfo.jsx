import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import "./AlbumInfo.css";

export default function AlbumInfo() {
  const { id } = useParams(); // Get the album id from the URL
  const [album, setAlbum] = useState(null);
  const [error, setError] = useState(null);
  const [artist, setArtist] = useState(null);
  const [songs, setSongs] = useState([]); // State to hold the song data

  useEffect(() => {
    fetchAlbumById(id)
      .then(data => {
        setAlbum(data);
        fetchArtistBySpotifyId(data.artists[0]); 
        fetchSongBySpotifyId(data.track_list); // Pass the track_list to fetchSongBySpotifyId
      })
      .catch(error => setError(error.message));
  }, [id]);

  async function fetchArtistBySpotifyId(spotifyId) {
    try {
      const response = await fetch(`http://localhost:8000/artists?spotify_id=${spotifyId}`);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const artistData = await response.json();
      setArtist(artistData);
    } catch (error) {
      console.error('Error fetching artist:', error);
      setError(error.message);
    }
  }

  async function fetchSongBySpotifyId(spotifyIds) {
    try {
      // Initialize an array to store song data
      const songsData = [];
      // Loop through each Spotify ID in the array
      for (const spotifyId of spotifyIds) {
        const response = await fetch(`http://localhost:8000/songs?spotify_id=${spotifyId}`);
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const songData = await response.json();
        // Push the fetched song data into the array
        songsData.push(songData);
      }
      // Set the song data in the component state
      setSongs(songsData);
    } catch (error) {
      console.error('Error fetching songs:', error);
      setError(error.message);
    }
  }

  function fetchAlbumById(id) {
    return fetch(`http://localhost:8000/album/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error fetching album:', error);
        throw error;
      });
  }

  if (error) return <div>Error: {error}</div>;
  if (!album || !artist) return <div>Loading...</div>;

  return (
    <div>
      <Navbar withLogo={true} />
      <div className="content">
        <img src={album.album_cover} alt={`Album ${album.album_name}`} />
        <div className="track-list">
          <h3>Song List</h3>
          <ul>
            {/* Map through the songs state and render each song */}
            {songs.map(song => (
              <li key={song._id}>{song.track_name}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="album-title">{album.album_name}</h2>
          <div className="artistname">
            <h3>Artist</h3>
            <p>{artist.artist_name}</p>
          </div>
          <div className="popularity">
            <h3>Popularity</h3>
            <p>{album.popularity}</p>
          </div>
          <div className="spotify-link">
            <h3>Spotify Link</h3>
            <a href={album.spotify_link} target="_blank" rel="noopener noreferrer">
              {album.spotify_link}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}


  

