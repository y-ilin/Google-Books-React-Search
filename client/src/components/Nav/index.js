import React from "react";
import "./style.css";

function Nav() {
  return (
    <>
      <nav>
        <a href="/">
          Google Books
        </a>
        <a href="/search">
        Search
        </a>
        <a href="/saved">
        Saved
        </a>
      </nav>
    </>
  );
}

export default Nav;
