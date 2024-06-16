import React, { useState } from "react";
import useUserStore from "../store/store";
import "./header.css";

const Headerpart = () => {
  const [inputValue, setInputValue] = useState("");
  const setUsername = useUserStore((state) => state.setUsername);
  const fetchUserData = useUserStore((state) => state.fetchUserData);

  const handleSearch = () => {
    setUsername(inputValue);
    fetchUserData(inputValue);
  };

  return (
    <section className="head-section">
      <div className="head-wrapper">
        <div className="head-container">
          <h1 className="logo">GITHUB FINDER</h1>
        </div>
        <div className="link-side">
          <a
            href="https://github.com/githenduka-carolyne"
            target="_blank"
            rel="noopener noreferrer"
          >
            By Githenduka Carolyne
          </a>
        </div>
        <div className="input-side">
          <input
            type="text"
            placeholder="Enter a username"
            required
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
          <button className="btn" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default Headerpart;
