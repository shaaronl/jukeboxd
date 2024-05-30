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
import AlbumInfo from "./routes/AlbumInfo";
import MyReviews from "./routes/MyReviews.jsx";
import CreateReview from "./routes/CreateReview.jsx";
import CreateAccount from "./routes/CreateAccount.jsx";
import About from "./routes/FooterFiles/AboutUs.jsx";
import Faqs from "./routes/FooterFiles/faqs.jsx";
// import TermsAndConditions from "./routes/FooterFiles/termscond.jsx";

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
  {
    path: "CreateAccount",
    element: <CreateAccount />
  },

  {
    path: "CreateReview/:id",
    element: <CreateReview />
  },
  {
    path: "Album/:id",
    element: <AlbumInfo />
  },
  {
    path: "about",
    element: <About />
  },
  {
    path: "faqs",
    element: <Faqs />
  }
  // {
  //   path: "terms-and-conditions",
  //   element: <TermsAndConditions />
  // }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
