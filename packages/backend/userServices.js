import mongoose from "mongoose";
import Album from "./models/albumSchema.js"; // Import the Album model
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
  // added a salt to the password
  const salt = await bcrypt.genSalt(10);
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, salt);

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

export default {
  addUser,
  findAlbumById,
  findAllAlbums,
  findAllUsers
};
