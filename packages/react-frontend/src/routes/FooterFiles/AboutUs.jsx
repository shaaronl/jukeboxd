import PropTypes from "prop-types";
import Navbar from "../Navbar";
import Footer from "./Footer";
import "./Footer.css"



export default function About() {

  return (
    <>
    <div className="loading-text">
      <Navbar withLogo={true} />
      <span className="about-us">
      <h2>About Us: Our Story</h2>
      </span>
      <span className="about-us">
      
      <p>Once upon a time in the bustling city of Melodyville, a group of five quirky friends—Tammy, Braeden, Sara, Yasemin, and Sharon—set out on a musical adventure that would change their lives forever. Tammy, with her wild purple hair and endless energy, was a music aficionado who could identify a song by its first note. Braeden, the tech wizard with an impressive collection of vintage vinyl records, dreamed of a digital platform where music lovers could share their eclectic tastes. Sara, a former child prodigy turned DJ, brought her beat-dropping skills and infectious laughter to the group. Yasemin, a poetic soul with a knack for penning song lyrics, added the lyrical magic to their team. And then there was Sharon, the ultimate social media guru, whose witty posts and memes could make anything go viral.</p>
      <p>One fateful night, after attending a particularly electrifying underground concert, the friends gathered at their favorite late-night diner. Fueled by coffee and their mutual love for all things musical, an idea struck. "What if," Tammy said, her eyes sparkling with excitement, "we created a website where people could rate and review music, share their playlists, and discover new tunes based on what their friends are listening to?" Braeden's eyes lit up, and he immediately started sketching out the concept on a napkin. "We'll call it 'Jukebox'd'," Yasemin added, inspired by the vintage jukebox in the corner of the diner. They all agreed it was the perfect name—a nostalgic nod to the past with a futuristic twist.</p>
      <p>The next few months were a whirlwind of creativity and chaos. Braeden turned his apartment into a coding fortress, with monitors and cables strewn about like a mad scientist’s lab. Tammy and Sara hosted listening parties, inviting friends and local musicians to test out their beta version. Yasemin crafted hilarious yet insightful song reviews that became an instant hit among their testers. Sharon, always ahead of the curve, started a viral campaign with memes featuring their mascot, a sassy animated jukebox named JD (Juke Dude), who dished out music wisdom with a side of snark. Their journey was filled with late-night coding sessions, impromptu dance breaks, and the occasional kitchen fire when Tammy tried to make "inspiration snacks."</p>
      <p>As Jukebox'd launched, the site quickly gained traction, becoming the go-to platform for music lovers worldwide. Users were drawn to its unique blend of humor, personalized recommendations, and the sheer passion the team poured into every aspect. Tammy's encyclopedic music knowledge, Braeden's tech genius, Sara's infectious beats, Yasemin's poetic flair, and Sharon's social media prowess created a perfect harmony. The site’s popularity skyrocketed when JD the Juke Dude hosted a virtual concert featuring indie bands and surprise celebrity guests, breaking the internet with millions of live-streaming fans. Melodyville’s eccentric quintet had done it—they had created not just a website, but a global community where music brought people together in the most unexpected and joyous ways.</p>
      <p>And so, the legend of Tammy, Braeden, Sara, Yasemin, and Sharon lives on. Their venture, Jukebox'd, remains a testament to the power of friendship, creativity, and a shared love for music. Each day, the site continues to grow, evolve, and inspire, proving that when you mix a bit of madness with a lot of heart, the result is pure magic.</p>
      </span>
    
    </div>
    <Footer />
    </>
  );
}

// Define prop types for the component
About.propTypes = {
  withLogo: PropTypes.bool.isRequired
};