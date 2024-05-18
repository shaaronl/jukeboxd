import express from "express";
import cors from "cors";
import userServices from "./userServices.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

//routes

//getting a single album 
app.get('/album/:id', async (req, res) =>{
  try {
      const album = await userServices.findAlbumById(req.params.id);
      if (!album) {
          return res.status(404).json({ message: 'Album not found' });
      }
      res.json(album);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

//getting all albums
app.get('/albums', async (req, res) =>{
  try {
      const albums = await userServices.findAllAlbums();
      if (!albums) {
          return res.status(404).json({ message: 'Album not found' });
      }
      res.json(albums);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});