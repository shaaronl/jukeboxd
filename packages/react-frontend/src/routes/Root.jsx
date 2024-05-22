import "../index.css";
import Navbar from "./Navbar";
import { FooterContainer } from "./Footer/container";

export default function Root() {
    return (
        <div class ="loading-text">
           <Navbar withLogo={false} /> 
          <h1 id = "logo-main">JUKEBOXD</h1>
          <h2>Track music you've listened to.</h2>
          <h2>Tell your friends what's good. </h2>  
          <FooterContainer />
        </div>
        
    );
  }