import PropTypes from "prop-types";
import Navbar from "../Navbar";
import Footer from "./Footer";
import "./Footer.css";

export default function CrAccHelp() {
  return (
    <>
      <div className="loading-text">
        <Navbar withLogo={true} />
        <span className="about-us">
          <h2>Creating an Account</h2>
          &nbsp;
        </span>
        <span className="about-us">
          <h3>Step 1: The Journey Begins</h3>
          <p>
            First, locate the mystical "Create Account" button.
            It's often found lurking in the top right corner of
            the page, waiting for brave souls to click it. Take
            a deep breath, steady your hand, and click that
            button with the confidence of a rock star about to
            perform their first encore.
          </p>

          <h3>Step 2: The Username Quest</h3>
          <p>
            Now, you will be presented with a sacred form. Begin
            by entering your desired username. This can be
            anything from your real name to your favorite band's
            name. However, keep in mind that this username will
            be your new identity in the Jukebox'd universe.
            Choose wisely, as it will be seen by all your
            musical comrades.
          </p>

          <h3>Step 3: The Password Challenge</h3>
          <p>
            Next, create a password. This password should be
            strong enough to withstand the forces of cyber
            darkness. Combine letters, numbers, and symbols to
            forge a password so powerful, even the greatest
            hackers will tremble before it. Remember it well,
            for it is the key to your Jukebox'd kingdom.
          </p>

          <h3>Step 4: The Confirmation Ritual</h3>
          <p>
            After crafting your legendary password, re-enter it
            in the "Confirm Password" field. This ensures that
            you have memorized your secret code accurately. It's
            like a rehearsal for a grand performance, ensuring
            you hit all the right notes.
          </p>

          <h3>Step 5: The Final Click</h3>
          <p>
            With your username and password set, you are now
            ready to click the "Sign Up" button. This is the
            moment of truth, where your journey to become a
            Jukebox'd member reaches its climax. Click the
            button with gusto, and prepare to enter a world of
            musical wonders.
          </p>

          <h3>Step 6: The Entrance</h3>
          <p>
            But wait! The adventure isn’t over yet. Now, you
            must return to the login page. Here, you will face
            the ultimate test: entering the credentials you just
            created. Input your username and password carefully,
            as a master musician tunes their instrument before a
            concert.
          </p>

          <h3>Step 7: The Grand Sign In</h3>
          <p>
            Finally, click the "Sign In" button. If all goes
            well, you will be granted access to the magical
            realm of Jukebox'd. Celebrate your triumph with a
            virtual air guitar solo, and dive into the vast sea
            of music ratings, reviews, and discoveries that
            await you.
          </p>
        </span>
        &nbsp;
      </div>
      <Footer />
    </>
  );
}

// Define prop types for the component
CrAccHelp.propTypes = {
  withLogo: PropTypes.bool.isRequired
};
