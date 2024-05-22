import "../index.css";
import Navbar from "./Navbar";
export default function Root() {
    return (
        <div class ="loading-text">
           <Navbar withLogo={false} /> 
          <h1 id = "logo-main">JUKEBOXD</h1>
          <h2>Track music you've listened to.</h2>
          <h2>Tell your friends what's good. </h2>  
          <footer>
                <div className="footer-container">
                <div className="footer-column">
                        <h3>Help</h3>
                        <a href="#">Story</a>
                        <a href="#">Etc</a>
                    </div>
                    <div className="footer-column">
                        <h3>About Us</h3>
                        <a href="#">Story</a>
                        <a href="#">Etc</a>
                    </div>
                    <div className="footer-column">
                        <h3>FAQs</h3>
                        <a href="#">Click here</a>
                    </div>
                    <div className="footer-column">
                        <h3>Terms and Conditions</h3>
                        <a href="#">Story</a>
                        <a href="#">Etc</a>
                    </div>
                    <div className="footer-column">
                        <h3>Contact Us</h3>
                        <a href="#">Facebook</a>
                        <a href="#">Instagram</a>
                    </div>
                </div>
            </footer>
        </div>
    );
  }