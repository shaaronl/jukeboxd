import mongoose from "mongoose";
import Artist from "../backend/models/artistSchema.js";
import Song from "../backend/models/songSchema.js";
import Album from "../backend/models/albumSchema.js";

mongoose.set("debug", true);


// run the curl to get access token, once you get the access token put it into the variable
/*
curl -X POST "https://accounts.spotify.com/api/token" \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "grant_type=client_credentials&client_id=your-client-id&client_secret=your-client-secret"
*/
const access_token = "";
// drop all the collections at the start
mongoose
  .connect(
    "mongodb://jukeboxd-music.azurewebsites.net/jukeboxd",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .catch((error) => console.log(error));

const db = mongoose.connection;
await db.dropDatabase();

//sleep function
const sleep = (delay) =>
  new Promise((resolve) => setTimeout(resolve, delay));

const albumsList = [
  { albumName: "SOS", artistName: "SZA" },
  { albumName: "the record", artistName: "boygenius" },
  { albumName: "DATA", artistName: "Tainy" },
  { albumName: "Let's Start Here.", artistName: "Lil Yachty" },
  { albumName: "GUTS", artistName: "Olivia Rodrigo" },
  { albumName: "This Is Why", artistName: "Paramore" },
  {
    albumName: "The Land Is Inhospitable and So Are We",
    artistName: "Mitski"
  },
  {
    albumName: "Maps",
    artistName: "billy woods & Kenny Segal"
  },
  { albumName: "JAGUAR II", artistName: "Victoria Monét" },
  { albumName: "Zach Bryan", artistName: "Zach Bryan" },
  { albumName: "Blondshell", artistName: "Blondshell" },
  {
    albumName: "The Rise and Fall of a Midwest Princess",
    artistName: "Chappell Roan"
  },
  { albumName: "Sundial", artistName: "Noname" },
  { albumName: "MAÑANA SERÁ BONITO", artistName: "KAROL G" },
  { albumName: "Javelin", artistName: "Sufjan Stevens" },
  { albumName: "ESQUINAS", artistName: "Becky G" },
  {
    albumName: "My Back Was A Bridge For You To Cross",
    artistName: "ANOHNI and the Johnsons"
  },
  { albumName: "That! Feels Good!", artistName: "Jessie Ware" },
  {
    albumName: "SCARING THE HOES",
    artistName: "JPEGMAFIA & Danny Brown"
  },
  {
    albumName: "The Age of Pleasure",
    artistName: "Janelle Monáe"
  },
  {
    albumName:
      "Did you know that there's a tunnel under Ocean Blvd",
    artistName: "Lana Del Rey"
  },
  { albumName: "Gumbo", artistName: "Young Nudy" },
  { albumName: "Gag Order", artistName: "Kesha" },
  {
    albumName: "Weathervanes",
    artistName: "Jason Isbell and the 400 Unit"
  },
  { albumName: "Fountain Baby", artistName: "Amaarae" },
  { albumName: "Rat Saw God", artistName: "Wednesday" },
  {
    albumName: "Desire, I Want To Turn Into You",
    artistName: "Caroline Polachek"
  },
  { albumName: "Red Moon In Venus", artistName: "Kali Uchis" },
  {
    albumName: "Endless Summer Vacation",
    artistName: "Miley Cyrus"
  },
  { albumName: "Dogsbody", artistName: "Model/Actriz" },
  {
    albumName: "nadie sabe lo que va a pasar mañana",
    artistName: "Bad Bunny"
  },
  { albumName: "Get Up", artistName: "NewJeans" },
  {
    albumName: "Something To Give Each Other",
    artistName: "Troye Sivan"
  },
  { albumName: "For All The Dogs", artistName: "Drake" },
  {
    albumName: "Everyone's Crushed",
    artistName: "Water From Your Eyes"
  },
  { albumName: "Work Of Art", artistName: "Asake" },
  { albumName: "KAYTRAMINÉ", artistName: "KAYTRAMINÉ" },
  { albumName: "Ganger", artistName: "Veeze" },
  {
    albumName: "Why Does the Earth Give Us People to Love?",
    artistName: "Kara Jackson"
  },
  { albumName: "Bless This Mess", artistName: "U.S. Girls" },
  { albumName: "Strength", artistName: "Samory-I" },
  { albumName: "LUCKY", artistName: "Megan Moroney" },
  { albumName: "Joy'all", artistName: "Jenny Lewis" },
  { albumName: "Tension", artistName: "Kylie Minogue" },
  { albumName: "Fuse", artistName: "Everything But the Girl" },
  { albumName: "I Killed Your Dog", artistName: "L'Rain" },
  { albumName: "a Gift & a Curse", artistName: "Gunna" },
  { albumName: "This Stupid World", artistName: "Yo La Tengo" },
  { albumName: "Sunburn", artistName: "Dominic Fike" },
  { albumName: "RENAISSANCE", artistName: "Beyoncé" },
  { albumName: "Un Verano Sin Ti", artistName: "Bad Bunny" },
  { albumName: "Midnights", artistName: "Taylor Swift" },
  { albumName: "MOTOMAMI", artistName: "ROSALÍA" },
  { albumName: "Harry's House", artistName: "Harry Styles" },
  { albumName: "It's Almost Dry", artistName: "Pusha T" },
  { albumName: "Hold on Baby", artistName: "King Princess" },
  { albumName: "CAPRISONGS", artistName: "FKA twigs" },
  { albumName: "Jack In The Box", artistName: "j-hope" },
  { albumName: "Wet Leg", artistName: "Wet Leg" },
  {
    albumName: "Mr. Morale & The Big Steppers",
    artistName: "Kendrick Lamar"
  },
  { albumName: "Blue Rev", artistName: "Alvvays" },
  { albumName: "Lucifer on the Sofa", artistName: "Spoon" },
  { albumName: "Gemini Rights", artistName: "Steve Lacy" },
  { albumName: "Ivory", artistName: "Omar Apollo" },
  { albumName: "Farm to Table", artistName: "Bartees Strange" },
  {
    albumName: "Traumazine",
    artistName: "Megan Thee Stallion"
  },
  { albumName: "Big Time", artistName: "Angel Olsen" },
  {
    albumName: "RAMONA PARK BROKE MY HEART",
    artistName: "Vince Staples"
  },
  { albumName: "The Hardest Part", artistName: "Noah Cyrus" },
  { albumName: "Palomino", artistName: "Miranda Lambert" },
  { albumName: "Honestly, Nevermind", artistName: "Drake" },
  { albumName: "CRASH", artistName: "Charli XCX" },
  { albumName: "LEGENDADDY", artistName: "Daddy Yankee" },
  { albumName: "BORN PINK", artistName: "BLACKPINK" },
  { albumName: "More Love, Less Ego", artistName: "Wizkid" },
  { albumName: "God Save The Animals", artistName: "Alex G" },
  { albumName: "Dirt Femme", artistName: "Tove Lo" },
  { albumName: "SICK!", artistName: "Earl Sweatshirt" },
  { albumName: "Broken Hearts Club", artistName: "Syd" },
  { albumName: "Versions of Me", artistName: "Anitta" },
  { albumName: "WASTELAND", artistName: "Brent Faiyaz" },
  {
    albumName: "American Heartbreak",
    artistName: "Zach Bryan"
  },
  { albumName: "Skinty Fia", artistName: "Fontaines D.C." },
  {
    albumName: "Dragon New Warm Mountain I Believe In You",
    artistName: "Big Thief"
  },
  { albumName: "Familia", artistName: "Camila Cabello" },
  { albumName: "Dawn FM", artistName: "The Weeknd" },
  { albumName: "Gifted", artistName: "Koffee" },
  { albumName: "Mr. Money With The Vibe", artistName: "Asake" },
  {
    albumName: "Subaru Boys: FINAL HEAVEN",
    artistName: "Cruel Santino"
  },
  {
    albumName: "Headful of Sugar",
    artistName: "Sunflower Bean"
  },
  {
    albumName: "Sometimes, Forever",
    artistName: "Soccer Mommy"
  },
  { albumName: "Bien o Mal", artistName: "Trueno" },
  {
    albumName: "emails i can't send",
    artistName: "Sabrina Carpenter"
  },
  { albumName: "MUNA", artistName: "MUNA" },
  { albumName: "New Jeans", artistName: "NewJeans" },
  {
    albumName: "Laughing so Hard, it Hurts",
    artistName: "MAVI"
  },
  { albumName: "Cruel Country", artistName: "Wilco" },
  { albumName: "Surrender", artistName: "Maggie Rogers" },
  { albumName: "Squeeze", artistName: "SASAMI" },
  { albumName: "SOUR", artistName: "Olivia Rodrigo" },
  { albumName: "30", artistName: "Adele" },
  { albumName: "VICE VERSA", artistName: "Rauw Alejandro" },
  {
    albumName: "CALL ME IF YOU GET LOST",
    artistName: "Tyler, The Creator"
  },
  { albumName: "Home Video", artistName: "Lucy Dacus" },
  { albumName: "MONTERO", artistName: "Lil Nas X" },
  { albumName: "Heaux Tales", artistName: "Jazmine Sullivan" },
  { albumName: "GLOW ON", artistName: "Turnstile" },
  { albumName: "El Madrileño", artistName: "C. Tangana" },
  { albumName: "Jubilee", artistName: "Japanese Breakfast" },
  { albumName: "Whole Lotta Red", artistName: "Playboi Carti" },
  {
    albumName: "to hell with it",
    artistName: "PinkPantheress"
  },
  { albumName: "Reckless", artistName: "Morgan Wade" },
  { albumName: "Hall of Fame", artistName: "Polo G" },
  {
    albumName: "Happier Than Ever",
    artistName: "Billie Eilish"
  },
  { albumName: "HEY WHAT", artistName: "Low" },
  { albumName: "If Orange Was A Place", artistName: "Tems" },
  {
    albumName: "If I Can't Have Love, I Want Power",
    artistName: "Halsey"
  },
  {
    albumName: "Collapsed In Sunbeams",
    artistName: "Arlo Parks"
  },
  {
    albumName: "Gold-Diggers Sound",
    artistName: "Leon Bridges"
  },
  { albumName: "Planet Her", artistName: "Doja Cat" },
  { albumName: "Second Line", artistName: "Dawn Richard" },
  { albumName: "El Alimento", artistName: "Cimafunk" },
  { albumName: "New Long Leg", artistName: "Dry Cleaning" },
  { albumName: "29", artistName: "Carly Pearce" },
  { albumName: "Afrique Victime", artistName: "Mdou Moctar" },
  { albumName: "Ignorance", artistName: "The Weather Station" },
  { albumName: "Niñxs Rotxs", artistName: "Mabiland" },
  { albumName: "Punk", artistName: "Young Thug" },
  { albumName: "When Smoke Rises", artistName: "Mustafa" },
  { albumName: "Sound Ancestors", artistName: "Madlib" },
  { albumName: "Valentine", artistName: "Snail Mail" },
  { albumName: "STILL OVER IT", artistName: "Summer Walker" },
  { albumName: "Driver", artistName: "Adult Mom" },
  {
    albumName: "An Evening with Silk Sonic",
    artistName: "Silk Sonic"
  },
  {
    albumName: "Sometimes I Might Be Introvert",
    artistName: "Little Simz"
  },
  { albumName: "Shiesty Season", artistName: "Pooh Shiesty" },
  { albumName: "Stand for Myself", artistName: "Yola" },
  {
    albumName: "Don't Go Tellin' Your Momma",
    artistName: "Topaz Jones"
  },
  {
    albumName: "Medicine at Midnight",
    artistName: "Foo Fighters"
  },
  {
    albumName: "Remember Her Name",
    artistName: "Mickey Guyton"
  },
  {
    albumName: "Let Me Do One More",
    artistName: "illuminati hotties"
  },
  { albumName: "LYKE MIKE", artistName: "Myke Towers" },
  { albumName: "Senjutsu", artistName: "Iron Maiden" },
  {
    albumName: "Bo Jackson",
    artistName: "Boldy James & The Alchemist"
  },
  {
    albumName: "The Chaos Chapter: FIGHT OR ESCAPE",
    artistName: "TOMORROW X TOGETHER"
  },
  { albumName: "Timelezz", artistName: "Jhayco" },
  { albumName: "Certified Lover Boy", artistName: "Drake" },
  {
    albumName: "The Horses and the Hounds",
    artistName: "James McMurtry"
  },
  { albumName: "Daddy's Home", artistName: "St. Vincent" },
  { albumName: "folklore", artistName: "Taylor Swift" },
  {
    albumName: "Fetch the Bolt Cutters",
    artistName: "Fiona Apple"
  },
  { albumName: "YHLQMDLG", artistName: "Bad Bunny" },
  {
    albumName: "Rough and Rowdy Ways",
    artistName: "Bob Dylan"
  },
  { albumName: "Future Nostalgia", artistName: "Dua Lipa" },
  { albumName: "RTJ4", artistName: "Run the Jewels" },
  { albumName: "Saint Cloud", artistName: "Waxahatchee" },
  { albumName: "Eternal Atake", artistName: "Lil Uzi Vert" },
  {
    albumName: "What's Your Pleasure?",
    artistName: "Jessie Ware"
  },
  { albumName: "Punisher", artistName: "Phoebe Bridgers" },
  { albumName: "Chromatica", artistName: "Lady Gaga" },
  {
    albumName: "Letter to You",
    artistName: "Bruce Springsteen"
  },
  { albumName: "City On Lock", artistName: "City Girls" },
  { albumName: "Women in Music Pt. III", artistName: "HAIM" },
  {
    albumName: "Ho, why is you here?",
    artistName: "Flo Milli"
  },
  { albumName: "MAP OF THE SOUL: 7", artistName: "BTS" },
  { albumName: "Shore", artistName: "Fleet Foxes" },
  { albumName: "græ", artistName: "Moses Sumney" },
  { albumName: "Ungodly Hour", artistName: "Chloe x Halle" },
  { albumName: "Never Will", artistName: "Ashley McBryde" },
  { albumName: "Honeymoon", artistName: "Beach Bunny" },
  { albumName: "Positions", artistName: "Ariana Grande" },
  { albumName: "Plastic Hearts", artistName: "Miley Cyrus" },
  { albumName: "Rare", artistName: "Selena Gomez" },
  { albumName: "Manic", artistName: "Halsey" },
  {
    albumName: "TO LOVE IS TO LIVE",
    artistName: "Jehnny Beth"
  },
  { albumName: "Good News", artistName: "Megan Thee Stallion" },
  {
    albumName: "Reunions",
    artistName: "Jason Isbell and the 400 Unit"
  },
  { albumName: "Shamir", artistName: "Shamir" },
  { albumName: "Sixteen Oceans", artistName: "Four Tet" },
  {
    albumName: "Petals for Armor",
    artistName: "Hayley Williams"
  },
  { albumName: "After Hours", artistName: "The Weeknd" },
  { albumName: "A Hero's Death", artistName: "Fontaines D.C." },
  { albumName: "Private Lives", artistName: "Low Cut Connie" },
  {
    albumName: "Got to Be Tough",
    artistName: "Toots & The Maytals"
  },
  {
    albumName: "Traditional Techniques",
    artistName: "Stephen Malkmus"
  },
  { albumName: "color theory", artistName: "Soccer Mommy" },
  { albumName: "Inner Song", artistName: "Kelly Lee Owens" },
  { albumName: "Fake It Flowers", artistName: "beabadoobee" },
  { albumName: "McCartney III", artistName: "Paul McCartney" },
  { albumName: "Haunted Painting", artistName: "Sad13" },
  { albumName: "Alphabetland", artistName: "X" },
  { albumName: "Aftermath", artistName: "Elizabeth Cook" },
  { albumName: "Starting Over", artistName: "Chris Stapleton" },
  { albumName: "Power Up", artistName: "AC/DC" },
  {
    albumName: "The Price of Tea in China",
    artistName: "Boldy James & The Alchemist"
  },
  {
    albumName: "Good Souls Better Angels",
    artistName: "Lucinda Williams"
  },
  { albumName: "Growth", artistName: "Kareem Ali" },
  { albumName: "Love Is The King", artistName: "Jeff Tweedy" },
  { albumName: "Live Forever", artistName: "Bartees Strange" },
  {
    albumName: "HIT ME HARD AND SOFT",
    artistName: "Billie Eilish"
  }
];

async function getAlbums() {
  // sets to help with performance so we don't query duplicate stuff, unfortunately only works in theory :(?
  const artistSet = new Set();
  for (const album of albumsList) {
    await sleep(1000);
    const query = `album:${encodeURIComponent(album["albumName"])} artist:${encodeURIComponent(album["artistName"])}`;

    const endpoint = `https://api.spotify.com/v1/search?q=${query}&type=album`;
    try {
      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });

      if (!response.ok) {
        console.log(error);
        throw new Error("Error getting album");
      }
      await sleep(100);
      const data = await response.json();
      const albumID = data.albums.items[0].id;
      // do another fetch for more exact album info
      const endpoint2 = `https://api.spotify.com/v1/albums/${albumID}`;
      const response2 = await fetch(endpoint2, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      if (!response2.ok) {
        console.log(response2);
        throw new Error("Error getting album");
      }

      const albumInfo = await response2.json();
      const tracklist = albumInfo.tracks.items;
      // a list of the trackIDs for the album
      const trackIDs = [];
      // loop through all the tracks for the album
      for (const track of tracklist) {
        await sleep(100);
        // a list of artistsIDs for the artists that worked on the track
        const artistIDs = [];
        const trackID = track.id;
        trackIDs.push(trackID);
        const artists = track.artists;
        for (const artist of artists) {
          await sleep(250);
          // create a new artist if that artist doesn't already exist
          if (!artistSet.has(artist.id)) {
            await createNewArtist(artist.id);
            artistSet.add(artist.id);
          }
          artistIDs.push(artist.id);
        }
        // time to actually make the song we're currently on
        const newSong = new Song({
          spotify_id: trackID,
          track_name: track.name,
          // should hold the artist's spotify ids
          artists: artistIDs,
          track_number: track.track_number,
          preview_url: track.preview_url,
          spotify_link: track.external_urls.spotify,
          album_from: albumInfo.id
        });
        await newSong.save();
      }
      // time to make the album methinks
      const newAlbum = new Album({
        spotify_id: albumInfo.id,
        album_name: albumInfo.name,
        // should hold the artist's spotify ids
        artists: albumInfo.artists.map((a) => a.id),
        release_date: albumInfo.release_date,
        track_list: trackIDs,
        album_cover: albumInfo.images[0].url,
        spotify_link: albumInfo.external_urls.spotify,
        // maybe to hold the id of the reviews?
        reviews: [],
        popularity: albumInfo.popularity
      });
      await newAlbum.save();
    } catch (error) {
      console.log(error);
    }
  }
  return;
}

// uses the Spotify API to get more info about an artist by its spotify id
// also creates a ne artist in Mongo if one doesn't exist
async function createNewArtist(id) {
  const endpoint = `https://api.spotify.com/v1/artists/${id}`;
  const response = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });

  if (!response.ok) {
    console.log(error);
    throw new Error("Error adding artist");
  }

  const data = await response.json();

  const newArtist = new Artist({
    spotify_id: data.id,
    artist_name: data.name,
    artist_image: data.images[0].url,
    followers: data.followers.total,
    popularity: data.popularity,
    genres: data.genres
  });
  await newArtist.save();
}

getAlbums();
