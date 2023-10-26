import React from "react";
import ShortenedURLs from "../ShortenedURLs/ShortenedURLs";
import URLShortener from "../URLShortener/URLShortener";

const Home = (props) => {
  return (
    <div className="row">
      <ShortenedURLs />
      <URLShortener />
    </div>
  );
};
export default Home;
