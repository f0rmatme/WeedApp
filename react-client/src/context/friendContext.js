import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "./userContext";

export const FriendContext = React.createContext({
  followList: JSON.parse(localStorage.getItem("followList")),
  setFollowList: () => {},
  getFriends: () => {},
  getFollowList: () => {},
  isFollowing: () => {}
});

const FriendProvider = props => {
  const [friends, setFriends] = useState([]); //Friends are people that you follow\
  const [followList, setFollowList] = useState(
    JSON.parse(localStorage.getItem("followList")) || {
      following: [],
      followers: []
    }
  );

  const userCtx = useContext(UserContext);

  const getFriends = () => {
    axios
      .get(`/api/friend/${userCtx.user.id}`, {
        headers: { Authorization: `Bearer ${userCtx.token}` }
      })
      .then(res => {
        window.localStorage.friends = JSON.stringify(res.data);
        setFriends(res.data);
      });
  };

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
      }
    }
    return result;
  };

  return (
    <FriendContext.Provider
      value={{
        friends,
        followList,
        setFriends,
        getFriends,
        isFollowing,
        getFollowList
      }}
    >
      {props.children}
    </FriendContext.Provider>
  );
};

export default FriendProvider;
