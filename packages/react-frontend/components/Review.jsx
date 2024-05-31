import Rating from "@mui/material/Rating";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./Review.css";
import { Link } from "react-router-dom";
/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling

export default function Review(props) {
  const review = props.review;
  const rightUser = props.rightUser;

  console.log(review);
  return (
    <div className="userReview">
      <Link to={`/album/${review.album_id._id}`}>
        <div className="albumInfo">
          <img src={review.album_id.album_cover}></img>
          <h1>{review.album_id.album_name}</h1>
        </div>
      </Link>
      <div className="reviewContent">
        <Rating
          name="half-rating-read"
          defaultValue={review.rating}
          precision={0.5}
          sx={{
            fontSize: "2rem",
            margin: "0.1em"
          }}
          emptyIcon={
            <StarBorderIcon
              fontSize="inherit"
              sx={{
                color: "#d9d9d9"
              }}
            />
          }
          readOnly
        />
        <h3>{review.content}</h3>
        {rightUser && (
          <div className="modifyIcons">
            <Link to={`/UpdateReview/${review._id}`}>
              <EditIcon />
            </Link>
            <div>
              <DeleteIcon
                onClick={() => props.handleDelete(review._id)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
