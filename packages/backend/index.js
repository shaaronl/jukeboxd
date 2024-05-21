import express from "express";
import cors from "cors";
import userServices from "./userServices.js";
import { loginUser } from "../helpers/auth.js";

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
app.get("/album/:id", async (req, res) => {
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
    const albums = await userServices.findAllAlbums();
    if (!albums) {
      return res
        .status(404)
        .json({ message: "Album not found" });
    }
    res.json(albums);
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
