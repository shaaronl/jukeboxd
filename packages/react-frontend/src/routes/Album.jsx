import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "./Album.css";

export default function Album() {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/albums')
            .then(response => response.json())
            .then(data => setAlbums(data))
            .catch(error => console.error('Error fetching albums:', error));
    }, []);

    return (
        <div>
            <Navbar withLogo={true} />
            <div className="content">
                <div className="gallery-container">
                    {albums.map((album) => (
                        <div className="gallery-item" key={album._id}>
                            <Link to={`/album/${album._id}`} className="album-link" > {}
                                <img src={album.album_cover} alt={`Album ${album.album_name}`} />
                                <span>{album.album_name}</span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            
        </div>
    );
}
