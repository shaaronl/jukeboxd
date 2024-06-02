import mongoose from "mongoose";

const ReviewsSchema = new mongoose.Schema({
  written_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  rating: Number,
  content: String,
  likes: Number,
  album_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Album"
  }
});

const Reviews = mongoose.model("Reviews", ReviewsSchema);

export default Reviews;
