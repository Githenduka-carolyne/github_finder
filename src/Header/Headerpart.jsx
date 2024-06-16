import "./header.css"
import React, { useEffect, useState } from "react";
import UserDetails from "../store/store"
const Headerpart = ()=>{

   const [inputvalue, setinputvalue] = useState(" ");
   const username = UserDetails((state) => state.setusername);
   const fetchuserdata = UserDetails((state) => state.fetchuserdata);

    const handleSearch = () => {
      username(inputvalue);
      fetchuserdata(inputvalue);
    };

    return (
      <section className="head-section">
        <div className="head-wrapper">
          <div className="head-container">
            <h1 className="logo">GITHUB FINDER</h1>
          </div>
          <div className="link-side">
            <a href="https://github.com/githenduka-carolyne" target="_blank">
              By Githenduka Carolyne
            </a>
          </div>
          <div className="input-side">
            <input
              type="text"
              placeholder="enter a username"
              required
              value={inputvalue}
              onChange={(event) => setinputvalue(event.target.value)}
            ></input>
            <button className="btn" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </section>
    );
};
export default Headerpart;