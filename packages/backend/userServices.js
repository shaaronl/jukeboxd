import mongoose from "mongoose";
import Album from "./models/albumSchema.js"; // Import the Album model

mongoose.set("debug", true);

// connect to MongoDB
mongoose.connect("mongodb+srv://sharliang:mM8KbHHYDnc0W8b0@jukeboxd.xhqiury.mongodb.net/?retryWrites=true&w=majority&appName=Jukeboxd", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("MongoDB connected successfully");
})
.catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

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
    findAlbumById,
    findAllAlbums
};
