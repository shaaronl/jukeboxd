import mongoose from "mongoose";

const SongSchema = new mongoose.Schema(
    {
        "spotify_id": {type: String, unique:true},
        "track_name": String,
        // should hold the artist's spotify ids
        "artists": [{type: String}],
        "track_number": Number,
        "preview_url": String,
        "spotify_link": String,
        "album_from": String,
    }
    );
  
  const Song = mongoose.model("Song", SongSchema);
  
  export default Song;
