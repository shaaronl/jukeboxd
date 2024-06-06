import "../index.css";
import Navbar from "./Navbar";
import Footer from "./FooterFiles/Footer";
import { MdMusicNote } from "react-icons/md";
import { PiVinylRecordDuotone } from "react-icons/pi";

export default function Root() {
  return (
    <>
      <div className="loading-text">
        <Navbar withLogo={false} />
        <h1 id="logo-main">
          JUKEB
          <span className="record-wrapper">
            <PiVinylRecordDuotone className="record" />
          </span>
          X
          <span className="music-note-wrapper">
            <MdMusicNote className="music-note" />
          </span>
          D
        </h1>

        <h2>Track music you&apos;ve listened to.</h2>
        <h2>Tell your friends what&apos;s good. </h2>
      </div>
      <Footer />
    </>
  );
}
