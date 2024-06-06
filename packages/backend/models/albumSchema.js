import mongoose from "mongoose";

const AlbumSchema = new mongoose.Schema({
  spotify_id: { type: String, unique: true },
  album_name: String,
  // the artist's spotify ids
  artists: [{ type: String }],
  release_date: String,
  track_list: [{ type: String }],
  album_cover: String,
  spotify_link: String,
  popularity: Number,
  genres: [String]
});

const Album = mongoose.model("Album", AlbumSchema);

export default Album;
