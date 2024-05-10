import mongoose from "mongoose";

const AlbumSchema = new mongoose.Schema(
    {
        "spotify_id": {type: String, unique:true},
        "album_name": String,
        // should hold the artist's spotify ids
        "artists": [{type: String}],
        "release_date": String,
        "track_list": [{type: String}],
        "album_cover": String,
        "spotify_link": String,
        // maybe to hold the id of the reviews?
        "reviews": [{type: mongoose.Types.ObjectId}]
    }
    );
  
  const Album = mongoose.model("Album", AlbumSchema);
  
  export default Album;
