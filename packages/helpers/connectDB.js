import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.MONGO_URI;
let connection;

console.log(process.env.MONGO_URI);

/**
 * Makes a connection to a MongoDB database. If a connection already exists, does nothing
 * Call this function at the start of api routes and data fetches
 * @returns {Promise<typeof mongoose>}
 */
const connectDB = async () => {
  if (!connection) {
    try {
      console.log(url);
      connection = await mongoose.connect(url, {
        dbName: "Jukeboxd",
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log("MongoDB connected successfully");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
    return connection;
  }
};

export default connectDB;
