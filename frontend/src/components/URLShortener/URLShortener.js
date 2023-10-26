import React, { useState } from "react";

const URLShortener = (props) => {
  const [url, setUrl] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a data object to send to the backend
    const data = {
      url: url,
      time: selectedTime,
    };

    try {
      const response = await fetch("http://localhost:5050/urlshortener", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        window.location.reload();
        console.log("Data successfully sent to the backend.");
      } else {
        console.error("Failed to send data to the backend.");
      }
    } catch (error) {
      console.error("Request error:", error);
    }
  };

  return (
    <div className="col">
      <h2>URL Shortener</h2>
      <form onSubmit={handleSubmit}>
        <div className="custom-input">
          <input
            type="text"
            id="data-input"
            name="data"
            placeholder="Paste the URL to be shortened"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          ></input>
        </div>

        <select
          className="custom-select"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
        >
          <option disabled value="">
            Add Expiration Date
          </option>
          <option value={1 * 60 * 1000}>1 Minute</option>
          <option value={5 * 60 * 1000}>5 Minutes</option>
          <option value={30 * 60 * 1000}>30 Minutes</option>
          <option value={60 * 60 * 1000}>1 Hour</option>
          <option value={5 * 60 * 60 * 1000}>5 Hour</option>
        </select>

        <div>
          <button>Shorten URL</button>
        </div>
      </form>
    </div>
  );
};
export default URLShortener;
