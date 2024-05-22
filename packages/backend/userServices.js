import mongoose from "mongoose";
import Album from "./models/albumSchema.js"; // Import the Album model
import Artist from "./models/artistSchema.js"; // Import the Artist model
import Song from "./models/songSchema.js"; // Import the Song model
import User from "./models/userSchema.js"; // Import the User Model
import connectDB from "../helpers/connectDB.js";
import bcrypt from "bcrypt"; // Import to encrypt passwords

mongoose.set("debug", true);
await connectDB();

/* Users */
// function to find all users
async function findAllUsers() {
  try {
    const users = await User.find();
    console.log("Found users:", users);
    return users;
  } catch (error) {
    console.error("Error finding users:", error);
    throw error;
  }
}

async function addUser(username, password) {
  if (!username || !password) {
    throw new Error("All fields are required");
  }

  // Check if the username or email already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw new Error("Username already taken");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const newUser = new User({
    username,
    password: hashedPassword
  });
  await newUser.save();

  return newUser;
}

/* Albums */
// function to find an album by its ID
async function findAlbumById(id) {
  try {
    const album = await Album.findById(id);
    return album;
  } catch (error) {
    console.error("Error finding album:", error);
    throw error;
  }
}

// function to find all albums
async function findAllAlbums() {
  try {
    const albums = await Album.find();
    console.log("Found albums:", albums);
    return albums;
  } catch (error) {
    console.error("Error finding albums:", error);
    throw error;
  }
}

async function findAlbumBySpotifyId(spotify_id) {
  try {
    const album = await Album.findOne({ spotify_id });
    return album; // Return the found artist or null if not found
  } catch (error) {
    throw new Error(`Error finding album by Spotify ID: ${error.message}`);
  }
}

/* Artists */

// function to find all artists
async function findAllArtists() {
  try {
    const artists = await Artist.find();
    console.log("Found artists:", artists);
    return artists;
  } catch (error) {
    console.error("Error finding artists:", error);
    throw error;
  }
}

async function findArtistBySpotifyId(spotify_id) {
  try {
    const artist = await Artist.findOne({ spotify_id });
    return artist; // Return the found artist or null if not found
  } catch (error) {
    throw new Error(`Error finding artist by Spotify ID: ${error.message}`);
  }
}

/* Songs */
async function findAllSongs() {
  try {
    const songs = await Song.find();
    console.log("Found songs:", songs);
    return songs;
  } catch (error) {
    console.error("Error finding songs:", error);
    throw error;
  }
}

async function findSongsBySpotifyId(spotify_id) {
  try {
    const song = await Song.findOne({ spotify_id });
    return song;
  } catch (error) {
    throw new Error(`Error finding song by Spotify ID: ${error.message}`);
  }
}

export default {
  addUser,
  findAlbumById,
  findAllAlbums,
  findAllUsers,
  findAllArtists,
  findArtistBySpotifyId,
  findAlbumBySpotifyId,
  findAllSongs,
  findSongsBySpotifyId
};
