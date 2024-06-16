import React, { useEffect, useState } from "react";
import { MdGroups } from "react-icons/md";
import { RiGitRepositoryFill } from "react-icons/ri";
import { MdOutlineLocationOn } from "react-icons/md";
import { LuGitFork } from "react-icons/lu";
import { FaStar } from "react-icons/fa";
import { IoLinkSharp } from "react-icons/io5";
import UserDetails from "../store/store";
import "./profile.css";

const Profilesection = ({
  profileimg,
  username,
  othername,
  Description,
  link,
  usersrepo,
  userfollower,
  userfollowing,
}) => (
  
    <div className="profile-section">
      <div className="profile-logo">
        <img src={profileimg} alt="Profile"></img>
      </div>
      <div className="info-section">
        <h2>{username}</h2>
        <p>{othername}</p>
        <p>{Description}</p>
        <a href={link} target="_blank" rel="noopener noreferrer">
          <button className="gitbtn">View On Github</button>
        </a>
        <p>
          <MdOutlineLocationOn />
          Location
        </p>
        <p>
          <RiGitRepositoryFill />
          {usersrepo} repositories
        </p>
        <p>
          <MdGroups /> {userfollower} followers
        </p>
        <p>
          <MdGroups /> {userfollowing} following
        </p>
      </div>
    </div>
);

const RepositoryPart = ({ title, description, forks, stars }) => (
  
    <div className="repository-card">
      <div className="repo-name">
        <p>{title}</p>
        <p>{description}</p>
      </div>
      <div className="card-detail">
        <p>
          <LuGitFork />
          {forks} forks
        </p>
        <p>
          <FaStar />
          {stars} stars
        </p>
      </div>
    </div>
  
);

const FollowersPart = ({ followersimage, followersname, details }) => (
 
    <div className="followers-card">
      <div className="followers-logo">
        <img
          className="followers-image"
          src={followersimage}
          alt="Follower"
        ></img>
      </div>
      <div className="card-detail-followers">
        <p>{followersname}</p>
        <button onClick={() => details(followersname)}>
          <IoLinkSharp />
          View {followersname}
        </button>
      </div>
    </div>

);

const FollowingPart = ({ followingimage, followingname, followingdetails }) => (
  <div className="following-container">
  <div className="following-card">
    <div className="following-logo">
      <img className="following-image" src={followingimage} alt="Following"></img>
    </div>
    <div className="card-detail-following">
      <p>{followingname}</p>
      <button onClick={() => followingdetails(followingname)}>
        <IoLinkSharp />
        View {followingname}
      </button>
    </div>
    </div>
  </div>
);

const Profilepart = () => {
  const username = UserDetails((state) => state.username);
  const userinfo = UserDetails((state) => state.userinfo);
  const defaultValue = UserDetails((state) => state.fetchuserdata);
  const [usersrepo, setUserrepos] = useState([]);
  const [userfollower, setUserfollowers] = useState([]);
  const [userfollowing, setUserfollowing] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDetails = async () => {
      setLoading(true);
      try {
        if (username) {
          await defaultValue(username);

          const usersrepoResponse = await fetch(`https://api.github.com/users/${username}/repos`);
          if (!usersrepoResponse.ok) {
            throw new Error('Failed to fetch repositories');
          }
          const userreposresult = await usersrepoResponse.json();
          setUserrepos(userreposresult);

          const userfollowerResponse = await fetch(`https://api.github.com/users/${username}/followers`);
          if (!userfollowerResponse.ok) {
            throw new Error('Failed to fetch followers');
          }
          const userfollowerResult = await userfollowerResponse.json();
          setUserfollowers(userfollowerResult);

          const userfollowingResponse = await fetch(`https://api.github.com/users/${username}/following`);
          if (!userfollowingResponse.ok) {
            throw new Error('Failed to fetch following');
          }
          const userfollowingResult = await userfollowingResponse.json();
          setUserfollowing(userfollowingResult);

          setError(null); // Clear any previous errors
        } else {
          throw new Error('No username provided');
        }
      } catch (error) {
        console.error('Failed to fetch user details', error);
        setError(error.message); // Set error message for display
      } finally {
        setLoading(false);
      }
    };

    getDetails();
  }, [username, defaultValue]);

  const details = async (username) => {
    try {
      await defaultValue(username);
      await getDetails();
    } catch (error) {
      console.error('Failed to fetch user details', error);
      setError(error.message); // Set error message for display
    }
  };

  return (
    <div>
    <div className="profile-container">
      {isLoading ? (
        <p className="loading">Loading profile...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        userinfo && (
          <Profilesection
            profileimg={userinfo.avatar_url}
            username={userinfo.name}
            othername={userinfo.login}
            Description={userinfo.bio}
            link={userinfo.html_url}
            usersrepo={userinfo.public_repos}
            userfollower={userinfo.followers}
            userfollowing={userinfo.following} />
        )
      )}
    </div>
    <div className="repo">
        {isLoading ? (
          <p className="loading">Loading GitHub repositories...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <div className="repository-container">
            {usersrepo.map((repos) => (
              <RepositoryPart
                key={repos.id}
                title={repos.name}
                description={repos.description}
                forks={repos.forks}
                stars={repos.stargazers_count}
                repolink={repos.clone_url} />
            ))}
          </div>
        )}
      </div>
      <div className="followers-section">
        {isLoading ? (
          <p className="loading">Loading followers...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <div className="followers-container">
            {userfollower.map((follower, i) => (
              <FollowersPart
                key={i}
                followersimage={follower.avatar_url}
                followersname={follower.login}
                details={details} />
            ))}
          </div>
        )}
      </div>
      <div className="following-section">
        {isLoading ? (
          <p className="loading">Loading following...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <div className="following-container">
            {userfollowing.map((following, i) => (
              <FollowingPart
                key={i}
                followingimage={following.avatar_url}
                followingname={following.login}
                followingdetails={details} />
            ))}
          </div>
        )}
      </div>
      </div>
   
  );
};

export default Profilepart;