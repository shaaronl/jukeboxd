import PropTypes from "prop-types";
import Navbar from "../Navbar";
import Footer from "./Footer";
import "./Footer.css";

export default function GeneralHelp() {
  return (
    <>
      <div className="loading-text">
        <Navbar withLogo={true} />
        <span className="about-us">
          <h2>General Help</h2>
          &nbsp;
        </span>
        <span className="about-us">
          <h3>Understanding the Jukebox'd Universe</h3>
          <p>
            Welcome to the Jukebox'd universe, where music lovers unite and the rhythm of your soul is celebrated. Here, you can rate albums, write reviews, and share your musical journey with others. It's like a never-ending concert where you're both the critic and the DJ. Whether you're a casual listener or a die-hard fan, Jukebox'd has a place for you. Now, let's dive into some general tips to make your experience as harmonious as possible.
          </p>

          <h3>Creating a Stellar Profile</h3>
          <p>
            Your Jukebox'd profile is your musical passport. It's the place where others can see your tastes, your reviews, and your ratings. To make your profile stand out, upload a profile picture that captures your essence—be it a photo of you at your favorite concert or a snapshot of your beloved vinyl collection. Write a bio that tells your musical story. Are you a metalhead with a secret love for classical music? Or perhaps a jazz aficionado with a penchant for pop? Let the world know!
          </p>

          <h3>Finding and Rating Albums</h3>
          <p>
            Navigating the vast sea of music on Jukebox'd is easy. Use the search bar to find your favorite albums or discover new ones. When you find an album that resonates with you, give it a rating. Our rating system allows you to express your true feelings—whether it's a 5-star masterpiece or a 1-star disaster. Remember, your ratings contribute to the collective wisdom of the Jukebox'd community, so rate responsibly!
          </p>

          <h3>Writing Epic Reviews</h3>
          <p>
            Writing reviews on Jukebox'd is your chance to shine as a music critic. Share your thoughts on an album, its standout tracks, and how it made you feel. Was it a life-changing experience, or did it make you want to plug your ears with cotton balls? Be honest, be detailed, and don't be afraid to sprinkle in some humor. After all, a review about how a song reminded you of your cat’s midnight yowling is always a fun read.
          </p>

          <h3>Engaging with the Community</h3>
          <p>
            Jukebox'd isn't just about individual ratings and reviews; it's about community. Engage with other users by liking and commenting on their reviews. Follow users whose musical tastes align with yours or who introduce you to new genres. Participate in discussions and debates about the latest albums. The more you engage, the richer your Jukebox'd experience will be. Who knows? You might even make some lifelong friends who share your love for 80s synth-pop or underground hip-hop.
          </p>

          <h3>Curating Playlists</h3>
          <p>
            One of the joys of Jukebox'd is curating playlists. Whether you're creating a workout mix, a chill-out session, or a collection of songs for a road trip, our playlist feature lets you compile and share your favorite tracks. Name your playlist, add a snazzy description, and share it with the world. Your followers will appreciate your musical curation skills and may even discover new favorite songs through your playlists.
          </p>

          <h3>Staying Updated with the Latest Trends</h3>
          <p>
            The music world is always evolving, and Jukebox'd keeps you in the loop with the latest trends. Check out our trending section to see what’s hot right now. From the latest album drops to emerging artists making waves, you’ll always be in the know. Subscribe to notifications for updates on your favorite artists and never miss a beat. Staying current with Jukebox'd ensures you’re always one step ahead in the musical landscape.
          </p>

          <h3>Using Advanced Features</h3>
          <p>
            Jukebox'd offers a range of advanced features for the true music aficionado. Explore our detailed analytics to see how your ratings compare with others. Use our recommendation engine to find new music tailored to your tastes. And don’t forget to explore our deep dive articles and interviews with artists. These features are designed to enhance your musical journey and make Jukebox'd your go-to platform for all things music.
          </p>

          <h3>Getting Support</h3>
          <p>
            If you ever run into issues or have questions, our support team is here to help. Visit the support section for FAQs, tutorials, and contact options. Whether you're having trouble logging in, need help with a feature, or just want to share feedback, we're all ears. Your smooth experience on Jukebox'd is our top priority, so don't hesitate to reach out.
          </p>
        </span>
        &nbsp;
      </div>
      <Footer />
    </>
  );
}

// Define prop types for the component
GeneralHelp.propTypes = {
  withLogo: PropTypes.bool.isRequired
};