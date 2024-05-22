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
    return fetch(`http://localhost:8000/albums/${id}`)
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

  function fetchReviewById(id){
    return fetch(`http://localhost:8000/reviews/${id}`)
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


  return (
    <div className="album-info">
      <Navbar withLogo={true} />
      <div className="content">
        <div className = "left-section">
            <img src={album.album_cover} alt={`Album ${album.album_name}`} className="album-cover" />
          <div className="song-list">
              <h3>Song List</h3>
              <ul>
              {songs.map((song, index) => (
                <li key={song._id}>{index + 1}. {song.track_name}</li>
              ))}
            </ul>
          </div>
        </div> 
        <div className = "right-section">
            <div className="album-details">
                <h2 className="album-title">{album.album_name}</h2>
                <p>{album.release_year} {artist.artist_name} | <span className="rating-stars"> 3.0 ★★★☆☆ </span></p>
                <p>{album.description}</p>
                <button className="rate-review-btn">Rate and Review</button>
            </div>
            <div className="reviews">
              <h3>Reviews</h3>
              <div className="review">
                <span className="rating-stars">★★☆☆☆</span>
                <p>mediocre at best.</p>
              </div>
              <div className="review">
                <span className="rating-stars">★★★★★</span>
                <p>I loved this album!!</p>
              </div>
              <div className="review">
                <span className="rating-stars">☆☆☆☆☆</span>
                <p>wish i didn't have ears...</p>
              </div>
              <div className="review">
                <span className="rating-stars">★★★★★</span>
                <p>
When I first listened to this album, I was immediately struck by its depth and complexity. It's not often that you come across an album that manages to capture such a wide range of emotions and experiences in a way that feels both personal and universal. From the first track to the last, this album takes you on a journey through love, loss, joy, and sorrow, and it does so with a level of artistry that is truly remarkable.

The opening track, "Ethereal Beginnings," sets the tone perfectly. With its haunting melodies and introspective lyrics, it draws you in and prepares you for what's to come. The artist's voice is both powerful and fragile, conveying a sense of vulnerability that is incredibly moving. As the album progresses, we are treated to a variety of musical styles and influences, from the upbeat and infectious "Dance of the Heart" to the raw and gritty "Broken Dreams."

One of the standout tracks for me is "Solitude in the City." This song perfectly encapsulates the feeling of being alone in a crowd, with its poignant lyrics and beautiful instrumental arrangement. The use of strings and piano in this track is particularly effective, adding a layer of depth and emotion that is simply stunning.

Another highlight is "Requiem for Love," a powerful ballad that explores the pain of lost love. The artist's vocal performance on this track is nothing short of breathtaking, and the orchestral backing adds a sense of grandeur and drama that elevates the song to another level. It's a track that I found myself returning to again and again, each time finding something new to appreciate.

The production on this album is also top-notch. Each track is meticulously crafted, with a level of attention to detail that is truly impressive. The sound quality is crisp and clear, allowing you to fully appreciate the intricate arrangements and subtle nuances in the music.</p>
              </div>
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


  


