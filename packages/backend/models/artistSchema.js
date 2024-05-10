import mongoose from "mongoose";

const ArtistSchema = new mongoose.Schema(
  {
    "spotify_id": {type: String, unique:true},
    "artist_name": String,
    "artist_image": String,
    "followers": Number
  },
  { collection: "artists" }
);

const Artist = mongoose.model("Artist", ArtistSchema);

export default Artist;
