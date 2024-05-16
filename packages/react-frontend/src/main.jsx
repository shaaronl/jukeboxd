import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Root from "./routes/Root.jsx";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import "./index.css";
import ErrorPage from "./ErrorPage";
import Album from "./routes/Album";
import MyReviews from "./routes/MyReviews.jsx";
import CreateReview from "./routes/CreateReview.jsx";

// import App from './App.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />
  },
  {
    path: "Albums",
    element: <Album />
  },
  {
    path: "MyReviews",
    element: <MyReviews />
  },
  //
  {
    path: "CreateReview",
    element: <CreateReview />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
