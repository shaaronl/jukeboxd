import Navbar from "./Navbar";

function fetchUsers() {
  const promise = fetch("http://localhost:8000/albums/id");
  return promise;
}

// make a route
export default function Album() {
  fetchUsers();

  return (
    <div className="loading-text">
      <Navbar withLogo={true} />
      <h1 id="logo">JUKEBOXD</h1>
      <h2>Albums page</h2>
    </div>
  );
}
