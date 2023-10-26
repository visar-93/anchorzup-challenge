import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.svg";
import removeIcon from "../../assets/icons-remove.png";

const ShortenedURLs = (props) => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = () => {
    fetch("http://localhost:5050/shortenedurls")
      .then((result) => {
        if (result.status !== 200) {
          console.log("Fetching data failed!");
        }
        return result.json();
      })
      .then((data) => {
        console.log(data);
        setUrls(data);
      })
      .catch((error) => {
        console.error("Fetching data failed!");
      });
  };

  const handleDelete = (urlId) => {
    fetch(`http://localhost:5050/deleteurls/${urlId}`, { method: "DELETE" })
      .then((res) => {
        console.log("done");
        if (res.status === 200) {
          setUrls(urls.urls.filter((url) => url.urlId !== urlId));
          fetchUrls();
        }
      })
      .catch((error) => {
        console.error("Deleting data failed!");
      });
  };

  // useEffect(() => {

  //   const pollingInterval = 10000
  //   const pollingTimer = setInterval(()=>{
  //     fetchUrls()
  //   }, pollingInterval)

  //   return () => {
  //     clearInterval(pollingTimer);
  //   }
  // }, []);

  console.log("fetched urls: ", urls);
  return (
    <div className="col">
      <img src={logo} alt="logo" class="logo" />
      <ul>
        {Array.isArray(urls.urls) ? (
          urls.urls.map((url, index) => (
            <li key={index}>
              <a href={url.shortUrl} target="_blank" rel="noopener noreferrer">
                {url.shortUrl}
              </a>
              <img
                src={removeIcon}
                alt="remove"
                onClick={() => handleDelete(url._id)}
              />
            </li>
          ))
        ) : (
          <li>Loading URLs...</li>
        )}
      </ul>
    </div>
  );
};
export default ShortenedURLs;
