import create from "zustand";

const useStore = create((set) => ({
  username: "github",
  userinfo: null,
  userrepos: [],
  userfollowers: [],
  userfollowing: [],
  loading: false,
  error: null,

  setUsername: (newUsername) => set({ username: newUsername }),

  fetchUserData: async () => {
    set({ loading: true, error: null });
    try {
      const username = useStore.getState().username;

      const userInfoResponse = await fetch(
        `https://api.github.com/users/${username}`
      );
      if (!userInfoResponse.ok) {
        throw new Error("Failed to fetch user information");
      }
      const userInfo = await userInfoResponse.json();
      set({ userinfo: userInfo });

      const userReposResponse = await fetch(
        `https://api.github.com/users/${username}/repos`
      );
      if (!userReposResponse.ok) {
        throw new Error("Failed to fetch user repositories");
      }
      const userRepos = await userReposResponse.json();
      set({ userrepos: userRepos });

      const userFollowersResponse = await fetch(
        `https://api.github.com/users/${username}/followers`
      );
      if (!userFollowersResponse.ok) {
        throw new Error("Failed to fetch user followers");
      }
      const userFollowers = await userFollowersResponse.json();
      set({ userfollowers: userFollowers });

      const userFollowingResponse = await fetch(
        `https://api.github.com/users/${username}/following`
      );
      if (!userFollowingResponse.ok) {
        throw new Error("Failed to fetch user following");
      }
      const userFollowing = await userFollowingResponse.json();
      set({ userfollowing: userFollowing });

      set({ loading: false });
    } catch (error) {
      console.error("Failed to fetch user data", error);
      set({ error: error.message, loading: false });
    }
  },
}));

export default useStore;