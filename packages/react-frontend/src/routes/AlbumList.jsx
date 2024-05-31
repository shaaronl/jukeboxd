import Navbar from "./Navbar";

function fetchUsers() {
  const token = localStorage.getItem("token");
  console.log(token);

  const promise = fetch("http://localhost:8000/albums/id", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

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
