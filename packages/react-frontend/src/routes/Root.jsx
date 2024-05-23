import "../index.css";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { MdMusicNote } from "react-icons/md";
import { PiVinylRecordDuotone } from "react-icons/pi";

export default function Root() {
    return (
      <>
        <div class ="loading-text">
           <Navbar withLogo={false} /> 
           <h1 id="logo-main">
                JUKEB                
                <span className="record-wrapper">
                    <PiVinylRecordDuotone className="record" />
                </span>X
                <span className="music-note-wrapper">
                    <MdMusicNote className="music-note" />
                </span>
                D
            </h1>
          
          <h2>Track music you've listened to.</h2>
          <h2>Tell your friends what's good. </h2> 
          </div> 
          <footer>
                <div className="footer-container">
                <div className="footer-column">
                        <h3>Help</h3>
                        <a href="#">Creating An Account</a>
                        <a href="#">General</a>
                    </div>
                    <div className="footer-column">
                        <h3>About Us</h3>
                        <a href="#">Our Story</a>
                    </div>
                    <div className="footer-column">
                        <h3>FAQs</h3>
                        <a href="#">Click here</a>
                    </div>
                    <div className="footer-column">
                        <h3>Contact Us</h3>
                        <a href="#">Facebook</a>
                        <a href="#">Instagram</a>
                    </div>
                    <div className="footer-column">
                      
                      <h3>Terms and Conditions</h3>
                      <Link to="/terms-and-conditions">Click Here</Link> 
                  </div>
                </div>
            </footer>
            </>
    );
  }