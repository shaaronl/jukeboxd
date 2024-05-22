import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const ReviewsSchema = new mongoose.Schema(
    {
        "review_id": {type: String, unique:true},
        "written_by":{type: ObjectId},
        "rating": Number,
        "content": String,
        "likes": Number,
        "album_id": {type: ObjectId},
    }
    );
  
  const reviews = mongoose.model("Reviews", ReviewsSchema);
  
  export default ReviewsSchema;