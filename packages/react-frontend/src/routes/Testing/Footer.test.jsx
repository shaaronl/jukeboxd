/* eslint-env jest */

import {
  render,
  screen,
  fireEvent
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Footer from "../FooterFiles/Footer";
import "@testing-library/jest-dom";
import { act } from "react"; // Updated import statement

describe("Footer Component", () => {
  test("renders all links", () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Albums")).toBeInTheDocument();
    expect(screen.getByText("Our Story")).toBeInTheDocument();
    expect(
      screen.getByText("Get the Scoop")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Creating An Account")
    ).toBeInTheDocument();
    expect(screen.getByText("General")).toBeInTheDocument();
    expect(
      screen.getByText("User Agreement")
    ).toBeInTheDocument();
  });

  test("clicking links scrolls to top", () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    const links = screen.getAllByRole("link");
    window.scrollTo = jest.fn();

    act(() => {
      links.forEach((link) => {
        fireEvent.click(link);
      });
    });

    expect(window.scrollTo).toHaveBeenCalledTimes(links.length);
    links.forEach(() => {
      expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    });
  });
});
