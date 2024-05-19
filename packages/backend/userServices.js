import mongoose from "mongoose";
import Album from "./models/albumSchema.js"; // Import the Album model
import connectDB from "../helpers/connectDB.js";

mongoose.set("debug", true);

// function to find an album by its ID
async function findAlbumById(id) {
  try {
    await connectDB();
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
    await connectDB();
    const albums = await Album.find();
    console.log("Found albums:", albums);
    return albums;
  } catch (error) {
    console.error("Error finding albums:", error);
    throw error;
  }
}

export default {
  findAlbumById,
  findAllAlbums
};
