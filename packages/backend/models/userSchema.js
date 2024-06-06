import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 30,
      trim: true
    },
    password: {
      type: String,
      required: true,
      maxlength: 60
    },
    profilePic: {
      type: String,
      default: ""
    }
  },
  { collection: "users" }
);

// compares passwords for login
UserSchema.methods.comparePassword = function (
  candidatePassword
) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", UserSchema);

export default User;
