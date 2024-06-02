import PropTypes from "prop-types";
import Navbar from "../Navbar";
//import "../../index.css";
import Footer from "./Footer";
import "./Footer.css";

export default function Faqs() {
  return (
    <>
      <div className="loading-text">
        <Navbar withLogo={true} />
        <span className="about-us">
          <h2>FAQS</h2>
          &nbsp;
        </span>
        <span className="about-us">
          <h3>Q: Can I rate music that my goldfish prefers?</h3>
          <p>
            A: Absolutely! Goldfish have surprisingly eclectic
            tastes. Just don't be offended if their favorite
            album is "Just Keep Swimming: Greatest Hits".
          </p>

          <h3>
            Q: If I play a song backwards, will it reveal
            Jukebox'd secrets?
          </h3>
          <p>
            A: We wish! The only secrets you’ll reveal are your
            own questionable music tastes and maybe some weird
            sounds that resemble a hidden message.
          </p>

          <h3>
            Q: Can I use Jukebox'd to communicate with
            extraterrestrial beings?
          </h3>
          <p>
            A: If you find an alien who digs Earth music and has
            Wi-Fi, go for it! Just remember to tag us in your
            intergalactic collab posts.
          </p>

          <h3>
            Q: Does Jukebox'd have a playlist that makes my
            plants dance?
          </h3>
          <p>
            A: While we can't promise dancing plants, we do have
            a playlist that makes your succulents groove to the
            beat. It's called "Photosynthesizing Phonics".
          </p>

          <h3>
            Q: If I review a song using interpretive dance, will
            it count?
          </h3>
          <p>
            A: We'd love to see that! Sadly, our system doesn't
            support dance reviews yet, but feel free to share
            your moves on social media with #JukeboxdGrooves.
          </p>

          <h3>
            Q: Can I organize a virtual concert for my pet rock
            collection?
          </h3>
          <p>
            A: You can absolutely rock out with your pet rocks.
            We recommend heavy metal for maximum geological
            excitement.
          </p>

          <h3>
            Q: Is it true that listening to Jukebox'd playlists
            can attract unicorns?
          </h3>
          <p>
            A: Our legal team says we can't officially confirm
            that, but off the record... yes. Just make sure to
            play some magical tunes.
          </p>

          <h3>
            Q: Can I use Jukebox'd to find out if my neighbor's
            dog has better music taste than me?
          </h3>
          <p>
            A: Only if your neighbor's dog has an account. If
            not, you might have to sneak a peek at their
            playlist during the next walk in the park.
          </p>
        </span>
        &nbsp;
      </div>
      <Footer />
    </>
  );
}

// Define prop types for the component
Faqs.propTypes = {
  withLogo: PropTypes.bool.isRequired
};
