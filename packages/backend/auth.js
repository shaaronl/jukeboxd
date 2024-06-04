import dotenv from "dotenv";
dotenv.config();
import connectDB from "./connectDB.js";
import User from "./models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// function to generate Access tokens
// takes in a username
function generateAccessToken(username) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { username: username },
      process.env.TOKEN_SECRET,
      { expiresIn: "1d" },
      (error, token) => {
        if (error) {
          reject(error);
        } else {
          resolve(token);
        }
      }
    );
  });
}

// middleware function to authenticate users
export function authenticateUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  //Getting the 2nd part of the auth header (the token)
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log("No token received");
    res.status(401).end();
  } else {
    jwt.verify(
      token,
      process.env.TOKEN_SECRET,
      (error, decoded) => {
        if (decoded) {
          // allowed to continue to the route
          req.user = decoded;
          next();
        } else {
          console.log("JWT error:", error);
          res.status(401).end();
        }
      }
    );
  }
}

export async function loginUser(req, res) {
  const username = req.body.username;
  const pwd = req.body.password;
  await connectDB();
  const retrievedUser = await User.findOne({ username });

  console.log(pwd);
  if (!retrievedUser) {
    // invalid username
    res.status(401).send("Unauthorized");
  } else {
    bcrypt
      .compare(pwd, retrievedUser.password)
      .then((matched) => {
        if (matched) {
          generateAccessToken(username).then((token) => {
            res.status(200).send({
              token: token,
              username: username,
              profilePic: retrievedUser.profilePic
            });
          });
        } else {
          // invalid password
          res.status(401).send("Unauthorized");
        }
      })
      .catch(() => {
        res.status(401).send("Unauthorized");
      });
  }
}
