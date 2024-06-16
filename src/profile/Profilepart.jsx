import profile from "../assets/profile.jpg";
import React, { useEffect, useState } from "react";
import { MdGroups } from "react-icons/md";
import { RiGitRepositoryFill } from "react-icons/ri";
import { MdOutlineLocationOn } from "react-icons/md";
import { LuGitFork } from "react-icons/lu";
import { FaStar } from "react-icons/fa";
import { IoLinkSharp } from "react-icons/io5";
import UserDetails from "../store/store";
import "./profile.css"

const Profilesection = ({profileimg, username, othername,Description,link,usersrepo,userfollower,userfollowing,}) =>{
      
    return (
      <>
        <section className="profile-sector">
          <div className="profile-section">
            <div className="profile-logo">
              <img src={profileimg} alt="fyyfyfytfvtyv"></img>
            </div>
            <div className="info-section">
              <h2>{username}</h2>
              <p>{othername}</p>
              <p>{Description}</p>
              <a href={link} target="_blank">
                <button className="gitbtn">View On Github</button>
              </a>
              <p>
                <MdOutlineLocationOn />
                location
              </p>
              <p>
                <RiGitRepositoryFill />
                {usersrepo}repository
              </p>
              <p>
                <MdGroups /> {userfollower} followers
              </p>
              <p>
                <MdGroups />
                {userfollowing} following
              </p>
            </div>
          </div>
        </section>
      </>
    ); } 
        
const RepositoryPart = ({ title, description, forks, stars, repolink }) => {
  return (
    <>
      <div className="repository-sector">
        <h2 className="repo-header">Repository(30)</h2>
        <div className="repo-section">
          <div className="link">
            <a href={repolink} target="_blank"></a>
          </div>
          <div className="repository-card">
            <div className="repo-name">
              <p>{title}</p>
              <p>{description}</p>
            </div>
            <div className="card-detail">
              <p>
                <LuGitFork />
                {forks}forks
              </p>
              <p>
                <FaStar />
                {stars}stars
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


const FollowersPart = ({followersimage, followersname, details}) => {
    return (
      <>
        <div className="repository-sector">
          <h2 className="repo-header">Followers(30)</h2>
          <div className="repo-section">
            <div className="followers-card">
              <div className="followers-logo">
                <img className="followers-image" src={followersimage}></img>
              </div>
              <div className="card-detail-followers">
                <p>{followersname}</p>
                <button onClick={() => details(followersname)}>
                  {<IoLinkSharp />}
                  view {followersname}
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

const FollowingPart = ({ followingimage, followingname, followingdetails }) => {
    return (
      <>
        <div className="repository-sector">
          <h2 className="repo-header">Followers(30)</h2>
          <div className="repo-section">
            <div className="followers-card">
              <div className="followers-logo">
                <img className="followers-image" src={followingimage}></img>
              </div>
              <div className="card-detail-followers">
                <p>{followingname}</p>
                <button onClick={() => followingdetails(followingname)}>
                  {<IoLinkSharp />}
                  view {followingname}
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

 
const Profilepart =()=>{
   const username = UserDetails((state) => state.username);
   const userinfo = UserDetails((state) => state.userinfo);
   const defaultValue = UserDetails((state) => state.fetchuserdata);
   const [usersrepo, setUserrepos] = useState([]);
   const [userfollower, setUserfollowers] = useState([]);
   const [userfollowing, setUserfollowing] = useState([]);
   const [isLoading, setLoading] = useState(true);

      useEffect(() => {
        defaultValue(username);
      }, [username, defaultValue]);

       const getdetails = async () => {
         setLoading(true);
         if (username) {
           try {
             const usersrepo = await fetch(
               `https://api.github.com/users/${username}/repos`
               
             );
             if (usersrepo == null) {
               console.log("no repository found");
             }
             const userreposresult = await usersrepo.json();
             setUserrepos(userreposresult);

             const userfollower = await fetch(
               `https://api.github.com/users/${username}/followers`
             );
              if (userfollower == null) {
                console.log("no followers found");
              }
             const userfollowerResult = await userfollower.json();
             setUserfollowers(userfollowerResult);

             const userfollowing = await fetch(
               `https://api.github.com/users/${username}/following`
             );
             const userfollowingResult = await userfollowing.json();
             setUserfollowing(userfollowingResult);

           } catch (error) {
             console.log("Failed to fetch user followings", error);
           }
         } else {
           return <div>No available data to display</div>;
         }
         setLoading(false);
       };

       const details = (username) => {
         defaultValue(username);
         getdetails(username);
       };

       useEffect(() => {
        getdetails();
       }, [username]);

    return (
      <>
        <div className="">
          {isLoading ? (
            <p className="loading">Loading profile....</p>
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
                userfollowing={userinfo.following}
              />
            )
          )}

          <div className="repository-sector">
            {isLoading ? (
              <p className="loading">Loading GitHub's repositories......</p>
            ) : (
              <div className="">
                {usersrepo.map((repos) => (
                  <RepositoryPart
                    title={repos.name}
                    description={repos.description}
                    forks={repos.forks}
                    stars={repos.stargazers_count}
                    repolink={repos.clone_url}
                  />
                ))}
              </div>
            )}
            {isLoading ? (
              <p className="loading">Fetching followers......</p>
            ) : (
              <div className="">
                {userfollower.map((followers, i) => (
                  <FollowersPart
                    key={i}
                    followersimage={followers.avatar_url}
                    followersname={followers.login}
                    details={details}
                  />
                ))}
              </div>
            )}

            {isLoading ? (
              <p className="loading">Fetching following.....</p>
            ) : (
              <div className="followersSect">
                {userfollowing.map((following, i) => (
                  <FollowingPart
                    followerImg={following.avatar_url}
                    followerName={following.login}
                    followingdetails={followingdetails}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </>
    );
};
       
export default Profilepart;