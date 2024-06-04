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

/* I had to comment this out because it screwed with the auth? I think it may have been double hashing
// Middleware to hash the password before saving the user
UserSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});
*/

// Method to compare passwords for login
UserSchema.methods.comparePassword = function (
  candidatePassword
) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", UserSchema);

export default User;
