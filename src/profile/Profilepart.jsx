import React, { useState, useEffect } from "react";
import { MdGroups } from "react-icons/md";
import { RiGitRepositoryFill } from "react-icons/ri";
import { MdOutlineLocationOn } from "react-icons/md";
import { LuGitFork } from "react-icons/lu";
import { FaStar } from "react-icons/fa";
import { IoLinkSharp } from "react-icons/io5";
import useStore from "../store/store";
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
      <img src={profileimg} alt="Profile" />
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
      <h1>{title}</h1>
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
      <img className="followers-image" src={followersimage} alt="Follower" />
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
  <div className="following-card">
    <div className="following-logo">
      <img className="following-image" src={followingimage} alt="Following" />
    </div>
    <div className="card-detail-following">
      <p>{followingname}</p>
      <button onClick={() => followingdetails(followingname)}>
        <IoLinkSharp />
        View {followingname}
      </button>
    </div>
  </div>
);

const Profilepart = () => {
  const {
    username: currentUsername,
    userinfo,
    userrepos,
    userfollowers,
    userfollowing,
    loading,
    error,
    setUsername,
    fetchUserData,
  } = useStore((state) => ({
    username: state.username,
    userinfo: state.userinfo,
    userrepos: state.userrepos,
    userfollowers: state.userfollowers,
    userfollowing: state.userfollowing,
    loading: state.loading,
    error: state.error,
    setUsername: state.setUsername,
    fetchUserData: state.fetchUserData,
  }));

  const [newUsername, setNewUsername] = useState("");

  useEffect(() => {
    if (currentUsername) {
      fetchUserData(currentUsername);
    }
  }, [currentUsername, fetchUserData]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setUsername(newUsername);
  };

  const details = async (username) => {
    try {
      await fetchUserData(username);
    } catch (error) {
      console.error("Failed to fetch user details", error);
    }
  };

  if (loading) {
    return <p className="loading">Loading profile...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="profile-container">
      {userinfo && (
        <Profilesection
          profileimg={userinfo.avatar_url}
          username={userinfo.name}
          othername={userinfo.login}
          Description={userinfo.bio}
          link={userinfo.html_url}
          usersrepo={userinfo.public_repos}
          userfollower={userinfo.followers}
          userfollowing={userinfo.following}
        />
      )}

      <div className="info-container">
        <div className="repo-section">
          <h2>Repositories</h2>
          <div className="repository-container">
            {userrepos.map((repos) => (
              <RepositoryPart
                key={repos.id}
                title={repos.name}
                description={repos.description}
                forks={repos.forks}
                stars={repos.stargazers_count}
              />
            ))}
          </div>
        </div>

        <div className="followers-section">
          <h2>Followers</h2>
          <div className="followers-container">
            {userfollowers.map((follower, i) => (
              <FollowersPart
                key={i}
                followersimage={follower.avatar_url}
                followersname={follower.login}
                details={details}
              />
            ))}
          </div>
        </div>

        <div className="following-section">
          <h2>Following</h2>
          <div className="following-container">
            {userfollowing.map((following, i) => (
              <FollowingPart
                key={i}
                followingimage={following.avatar_url}
                followingname={following.login}
                followingdetails={details}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profilepart;
