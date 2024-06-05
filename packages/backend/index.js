import express from "express";
import cors from "cors";
import userServices from "./userServices.js";
import { loginUser } from "./auth.js";
import Album from "./models/albumSchema.js";
import User from "./models/userSchema.js";
import Reviews from "./models/reviewsSchema.js";
import { authenticateUser } from "./auth.js";

const app = express();
const port = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Public Route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

/** Public Routes **/

/* User Accounts */
// User Registration
app.post("/users", async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);

  try {
    const savedUser = await userServices.addUser(
      username,
      password
    );
    res.status(201).send(savedUser);
  } catch (error) {
    if (error.message === "Username already taken") {
      res
        .status(400)
        .send({ message: "Username already taken" });
    } else if (error.message === "All fields are required") {
      res
        .status(400)
        .send({ message: "All fields are required" });
    } else {
      res
        .status(500)
        .send({ message: "Internal Server Error" });
    }
  }
});

// User Sign In
app.post("/api/sign-in", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Username and password are required"
    });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid username or password"
      });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid username or password"
      });
    }

    res.json({
      success: true,
      message: "User logged in successfully"
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: error.message });
  }
});

// User Login
app.post("/login", loginUser);

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
      const album =
        await userServices.findAlbumBySpotifyId(spotify_id);
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
      const artist =
        await userServices.findArtistBySpotifyId(spotify_id);
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
      const song =
        await userServices.findSongsBySpotifyId(spotify_id);
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

/** Reviews **/

// getting all reviews
app.get("/reviews/", async (req, res) => {
  try {
    const review = await userServices.findAllReviews(
      req.params.id
    );
    if (!review) {
      return res
        .status(404)
        .json({ message: "Reviews not found" });
    }
    res.json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// getting reviews by album id
app.get("/reviews/albums/:id", async (req, res) => {
  try {
    const review = await userServices.findReviewsByAlbumId(
      req.params.id
    );
    if (!review) {
      return res
        .status(404)
        .json({ message: "review not found" });
    }
    res.json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/** Protected Routes **/
app.use(authenticateUser);

/** Reviews **/

// getting reviews by user id -- currently not working.
app.get("/reviews/users/:id", async (req, res) => {
  try {
    const review = await userServices.findReviewsByWrittenBy(
      req.params.id
    );
    if (!review) {
      return res
        .status(404)
        .json({ message: "review not found" });
    }
    res.json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// creating a review
app.post("/review/:id", async (req, res) => {
  try {
    const reviewToAdd = req.body;
    console.log(reviewToAdd);
    // get the user of the person trying to write review
    const user = await userServices.findUserByName(
      reviewToAdd.username
    );
    // get the album the user wants to write a review on
    const album = await userServices.findAlbumById(
      req.params.id
    );

    // make a new review with the review schema
    const newReview = new Reviews({
      written_by: user._id,
      rating: reviewToAdd.rating,
      content: reviewToAdd.content,
      likes: 0,
      album_id: album._id
    });
    let reviewId;

    await newReview.save().then((review) => {
      reviewId = review._id;
    });

    res.status(201);
    res.send(newReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/* User Accounts */
// Get all users
app.get("/users", async (req, res) => {
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
app.post("/users", async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);

  try {
    const savedUser = await userServices.addUser(
      username,
      password
    );
    res.status(201).send(savedUser);
  } catch (error) {
    if (error.message === "Username already taken") {
      res
        .status(400)
        .send({ message: "Username already taken" });
    } else if (error.message === "All fields are required") {
      res
        .status(400)
        .send({ message: "All fields are required" });
    } else {
      res
        .status(500)
        .send({ message: "Internal Server Error" });
    }
  }
});

// User login
app.post("/api/sign-in", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Username and password are required"
    });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid username or password"
      });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid username or password"
      });
    }

    res.json({
      success: true,
      message: "User logged in successfully"
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: error.message });
  }
});

// when the user trys to login it calls this
app.post("/login", loginUser);

// creating a review
app.post("/review/:id", async (req, res) => {
  try {
    const reviewToAdd = req.body;
    console.log(reviewToAdd);
    // get the user of the person trying to write review
    // note: the username is gotten from the frontend which isn't secure, to update once we get auth running
    const user = await userServices.findUserByName(
      reviewToAdd.username
    );
    // get the album the user wants to write a review on
    const album = await userServices.findAlbumById(
      req.params.id
    );

    // make a new review with the review schema
    const newReview = new Reviews({
      written_by: user._id,
      rating: reviewToAdd.rating,
      content: reviewToAdd.content,
      likes: 0,
      album_id: album._id
    });

    await newReview.save();

    res.status(201);
    res.send(newReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// get user info and reviews of user
app.get("/reviews/:users", async (req, res) => {
  try {
    const username = req.params.users;
    const user = await userServices.findUserByName(username);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found" });
    }

    const reviews = await userServices.findReviewsByWrittenBy(
      user._id
    );
    if (!reviews) {
      return res
        .status(404)
        .json({ message: "Reviews not found" });
    }

    return res.json({ user: user, reviews: reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// deletes review by id
app.delete("/reviews/user/:reviewId", async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const response =
      await userServices.deleteReviewById(reviewId);

    if (response === undefined) {
      res.status(404).send("Resource not found.");
    } else {
      res.status(204).json({
        message: `Item with ID ${reviewId} deleted successfully`
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// get review by id
app.get("/reviews/user/:reviewId", async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const review = await userServices.findReviewById(reviewId);
    if (!review) {
      return res
        .status(404)
        .json({ message: "Review not found" });
    }
    res.json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//updating a review
app.put("/review/:id", async (req, res) => {
  try {
    const reviewToUpdate = req.params.id;
    const review = await userServices.updateReviewById(
      reviewToUpdate,
      req.body
    );
    if (!review) {
      return res
        .status(404)
        .json({ message: "Couldn't update review" });
    }
    res.status(201);
    res.send(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// update the user's profile picture
app.put("/user/picture/:username", async (req, res) => {
  try {
    const userToUpdate = req.params.username;
    const user = await userServices.updateUserImage(
      userToUpdate,
      req.body.imageAddress
    );
    if (!user) {
      return res
        .status(404)
        .json({ message: "Couldn't update user" });
    }
    res.status(201);
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
