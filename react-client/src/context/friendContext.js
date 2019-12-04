import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "./userContext";

export const FriendContext = React.createContext({
  followList: {},
  setFollowList: () => {},
  getFollowList: () => {},
  isFollowing: () => {}
});

const FriendProvider = props => {
  console.log(window.localStorage.followList);
  const [followList, setFollowList] = useState(
    window.localStorage.followList ? JSON.parse(localStorage.followList) : {}
  );

  const userCtx = useContext(UserContext);
  const getFollowList = () => {
    axios
      .get(`/api/friends/list/${userCtx.user.id}`, {
        headers: { Authorization: `Bearer ${userCtx.token}` }
      })
      .then(res => {
        window.localStorage.followList = JSON.stringify(res.data);
        setFollowList(res.data);
      });
  };

  const isFollowing = usersId => {
    let result = false;
    let i;
    for (i = 0; i < followList.following.length; i++) {
      if (followList.following[i].friendId === usersId) {
        result = true;
        break;
      }
    }
    return result;
  };

  return (
    <FriendContext.Provider
      value={{
        followList,
        isFollowing,
        getFollowList
      }}
    >
      {props.children}
    </FriendContext.Provider>
  );
};

export default FriendProvider;
