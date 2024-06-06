/* eslint-env jest */
/* global global */

import {
  render,
  screen,
  waitFor,
  fireEvent
} from "@testing-library/react";
import {
  BrowserRouter as Router,
  useParams,
  useNavigate
} from "react-router-dom";
import userEvent from "@testing-library/user-event";
import CreateReview from "../CreateReview";
import "@testing-library/jest-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
  useParams: jest.fn()
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        _id: "1",
        album_name: "Test Album",
        album_cover: "test-cover-url",
        release_date: "2020-01-01",
        artists: [{ artist_name: "Test Artist" }]
      })
  })
);

describe("CreateReview Component", () => {
  beforeEach(() => {
    useParams.mockReturnValue({ id: "1" });
    fetch.mockClear();
  });

  test("renders CreateReview component and displays album details", async () => {
    render(
      <Router>
        <CreateReview />
      </Router>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.getByText("Test Album")
      ).toBeInTheDocument();
      expect(
        screen.getByText("2020 Test Artist")
      ).toBeInTheDocument();
    });
  });

  test("submits the form correctly", async () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    render(
      <Router>
        <CreateReview />
      </Router>
    );

    await waitFor(() => {
      expect(
        screen.getByText("Test Album")
      ).toBeInTheDocument();
    });

    const reviewTextarea = screen.getByTestId(
      "review-textarea"
    );
    userEvent.type(reviewTextarea, "Amazing album!");

    const ratingInput = screen.getByTestId("rating");
    const ratingStars = ratingInput.querySelectorAll("input");
    fireEvent.click(ratingStars[4]);

    const submitButton = screen.getByTestId("submit-button");
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/album/1");
    });
  });

  test("updates state when rating is selected", async () => {
    render(
      <Router>
        <CreateReview />
      </Router>
    );

    await waitFor(() => {
      expect(
        screen.getByText("Test Album")
      ).toBeInTheDocument();
    });

    const ratingInput = screen.getByTestId("rating");
    const ratingStars = ratingInput.querySelectorAll("input");
    fireEvent.click(ratingStars[4]);

    expect(ratingStars[4]).toBeChecked();
  });

  test("updates state when review text is entered", async () => {
    render(
      <Router>
        <CreateReview />
      </Router>
    );

    await waitFor(() => {
      expect(
        screen.getByText("Test Album")
      ).toBeInTheDocument();
    });

    const reviewTextarea = screen.getByTestId(
      "review-textarea"
    );

    fireEvent.change(reviewTextarea, {
      target: { value: "Amazing album!" }
    });

    expect(reviewTextarea.value).toBe("Amazing album!");
  });
});
