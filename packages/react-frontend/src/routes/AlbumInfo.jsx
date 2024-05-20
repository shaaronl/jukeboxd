import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import "./AlbumInfo.css";

export default function AlbumDetail() {
  const { id } = useParams(); // Get the album id from the URL
  const [album, setAlbum] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAlbumById(id)
      .then(data => setAlbum(data))
      .catch(error => setError(error.message));
  }, [id]);

  if (error) return <div>Error: {error}</div>;
  if (!album) return <div>Loading...</div>;

  return (
    <div>
      <Navbar withLogo={true} />
      <div className="content">
        <img src={album.album_cover} alt={`Album ${album.album_name}`} />
        <div className="track-list">
          <h3>Track List</h3>
          <ul>
            {album.track_list.map(track => (
              <li key={track}>{track}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="album-title">{album.album_name}</h2>
          <div className="artistname">
          <h3>Artist</h3>
            <p>{album.artists}</p>
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
