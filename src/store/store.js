import { create } from "zustand";

const UserDetails = create((set)=>({
    Profile:[],
    repository:[],
    followers:[],
    following:[],

    fetchUserProfile: async()=>{
        const fetchUserProfile = await fetch(`https://api.github.com/users/githenduka-carolyne`);
        const UserProfile = await fetchUserProfile.json();

        set({UserProfile})
    },
    fetchUserRepo: async()=>{
        const fetchUserRepo = await fetch(`https://api.github.com/users/githenduka-carolyne/repos`);
        const UserRepo = await fetchUserRepo.json();

        set({UserRepo})
    },
    fetchUserFollowers: async()=>{
        const fetchUserFollowers = await fetch(`https://api.github.com/users/Githenduka-carolyne/followers`);
        const UserFollowers = await fetchUserFollowers.json();

        set({UserFollowers})
    },
    fetchUserFollowing: async()=>{
        const fetchUserFollowing = await fetch(`https://api.github.com/users/Githenduka-carolyne/following{/other_user}`);
        const UserFollowing = await fetchUserFollowing.json();

        set({UserFollowing})
    }



}));
export default UserDetails;