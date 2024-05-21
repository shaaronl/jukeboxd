import express from "express";
import cors from "cors";
import userServices from "./userServices.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

/** Routes **/

/* Albums */

// Getting a single album
app.get("/albums/:id", async (req, res) => {
  try {
    const album = await userServices.findAlbumById(
      req.params.id
    );
    if (!album) {
      return res
        .status(404)
        .json({ message: "Album not found" });
    }
    res.json(album);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Getting all albums
app.get("/albums", async (req, res) => {
  try {
    const { spotify_id } = req.query;

    if (spotify_id) {
      // If a Spotify ID is provided, retrieve the specific artist
      const album = await userServices.findAlbumBySpotifyId(spotify_id);
      if (!album) {
        return res
          .status(404)
          .json({ message: "Album not found" });
      }
      return res.json(album);
    } else {

    const albums = await userServices.findAllAlbums();
    if (!albums || albums.length === 0) {
      return res
        .status(404)
        .json({ message: "Album not found" });
    }
    return res.json(albums);
  }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/* Artists */

// Getting the artists
app.get("/artists", async (req, res) => {
  try {
    const { spotify_id } = req.query;

    if (spotify_id) {
      // If a Spotify ID is provided, retrieve the specific artist
      const artist = await userServices.findArtistBySpotifyId(spotify_id);
      if (!artist) {
        return res
          .status(404)
          .json({ message: "Artist not found" });
      }
      return res.json(artist);
    } else {
      // If no Spotify ID is provided, retrieve all artists
      const artists = await userServices.findAllArtists();
      if (!artists || artists.length === 0) {
        return res
          .status(404)
          .json({ message: "No artists found" });
      }
      return res.json(artists);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/* Songs */

// Getting the songs
app.get("/songs", async (req, res) => {
  try {
    const { spotify_id } = req.query;

    if (spotify_id) {
      // If a Spotify ID is provided, retrieve the specific songs
      const song = await userServices.findSongsBySpotifyId(spotify_id);
      if (!song) {
        return res
          .status(404)
          .json({ message: "Song not found" });
      }
      return res.json(song);
    } else {
      // If no Spotify ID is provided, retrieve all songs
      const songs = await userServices.findAllSongs();
      if (!songs || songs.length === 0) {
        return res
          .status(404)
          .json({ message: "No songs found" });
      }
      return res.json(songs);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/* User Accounts */

// Get all users
app.get("/users", async(req, res) => {
  try {
    const users = await userServices.findAllUsers();
    if (!users) {
      return res
      .status(404)
      .json({ message: "Users not found" });
  }
  res.json(users);
} catch (error) {
  console.error(error);
  res.status(500).json({ message: "Internal server error" });
}
});


// Register a new user
app.post('/users', async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);

  try {
      const savedUser = await userServices.addUser(username, password);
      res.status(201).send(savedUser);
  } catch (error) {
    if (error.message === 'Username already taken') {
      res.status(400).send({ message: 'Username already taken' });
  } else if (error.message === 'All fields are required') {
      res.status(400).send({ message: 'All fields are required' });
  } else {
      res.status(500).send({ message: 'Internal Server Error' });
  }
  }
});

// User login
app.post('/api/sign-in', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required' });
  }

  try {
      // Find the user by email
      const user = await User.findOne({ username });
      if (!user) {
          return res.status(400).json({ success: false, message: 'Invalid username or password' });
      }

      // Compare the provided password with the stored hashed password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
          return res.status(400).json({ success: false, message: 'Invalid username or password' });
      }

      res.json({ success: true, message: 'User logged in successfully' });
  } catch (error) {
      res.status(500).json({ success: false, message: error.message });
  }
});