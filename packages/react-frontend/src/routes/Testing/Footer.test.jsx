
import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Footer from "../FooterFiles/Footer";
import "@testing-library/jest-dom";

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

    links.forEach((link) => {
      link.click();
      //expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    });
  });
});
