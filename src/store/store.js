import { create } from "zustand";

const UserDetails = create((set)=>({

username: "github",
userinfo: {},

 setusername: (username) => set({ username }),
 setuserinfo: (userinfo) => set({ userinfo }),

   fetchuserdata: async (username) => {
    if (!username) {
      return;
    }
    try {
      const results = await fetch(
        `https://api.github.com/users/${username}`
      );
      const data = await results.json();

      set({ userdata: data, username });
    } catch (error) {
      console.error("Failed to fetch user's information", error);
    }
  },
    

 }));
//     fetchUserProfile: async()=>{
//         const fetchUserProfile = await fetch(`https://api.github.com/users/${username}`);
//         const UserProfile = await fetchUserProfile.json();

//         set({UserProfile})
//     },
//     fetchUserRepo: async()=>{
//         const fetchUserRepo = await fetch(`https://api.github.com/users/${username}/repos`);
//         const UserRepo = await fetchUserRepo.json();

//         set({UserRepo})
//     },
//     fetchUserFollowers: async()=>{
//         const fetchUserFollowers = await fetch(`https://api.github.com/users/${username}/followers`);
//         const UserFollowers = await fetchUserFollowers.json();

//         set({UserFollowers})
//     },
//     fetchUserFollowing: async()=>{
//         const fetchUserFollowing = await fetch(`https://api.github.com/users/${username}/following`);
//         const UserFollowing = await fetchUserFollowing.json();

//         set({UserFollowing})
//     }



// }));
export default UserDetails;