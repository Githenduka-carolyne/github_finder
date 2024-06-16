import profile from "../assets/profile.jpg";
import React, { useEffect, useState } from "react";
import { MdGroups } from "react-icons/md";
import { RiGitRepositoryFill } from "react-icons/ri";
import { MdOutlineLocationOn } from "react-icons/md";
import { LuGitFork } from "react-icons/lu";
import { FaStar } from "react-icons/fa";
import UserDetails from "../store/store";
import "./profile.css"

const Profilepart = () =>{
      
    return (
      <section className="profile-sector">
        <div className="profile-section">
          <div className="profile-logo">
            <img src={profile}></img>
          </div>
          <div className="info-section">
            <h2>Github</h2>
            <p>github</p>
            <p>we create sites</p>
            <button className="gitbtn">View On Github</button>
            <p>
              <MdOutlineLocationOn />
              location
            </p>
            <p>
              <RiGitRepositoryFill />
              496 repos
            </p>
            <p>
              <MdGroups /> 4860 followers
            </p>
            <p>
              <MdGroups />0 following
            </p>
          </div>
        </div>

        <div className="repository-sector">
          <h2 className="repo-header">Repository(30)</h2>
          <div className="repo-section">
            <div className="repository-card">
              <div className="repo-name">
                <p>Name</p>
                <p>Details</p>
              </div>
              <div className="card-detail">
                <p>
                  <LuGitFork />
                
                  2360 forks
                </p>
                <p>
                  <FaStar />
                
                  819 stars
                </p>
              </div>
            </div>
            {/* <div className="repository-card">
              <div className="repo-name">
                <p>Name</p>
                <p>Details</p>
              </div>
              <div className="card-detail">
                <p>
                  <LuGitFork />
                  2360 forks
                </p>
                <p>
                  <FaStar />
                  819 stars
                </p>
              </div>
            </div> */}
            {/* <div className="repository-card">
              <div className="repo-name">
                <p>Name</p>
                <p>Details</p>
              </div>
              <div className="card-detail">
                <p>
                  <LuGitFork />
                  2360 forks
                </p>
                <p>
                  <FaStar />
                  819 stars
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    );
  }
export default Profilepart;