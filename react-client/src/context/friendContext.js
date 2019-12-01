import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "./userContext";

export const FriendContext = React.createContext({});

const FriendProvider = props => {
  const [friends, setFriends] = useState([]); //Friends are people that you follow\
  const [followList, setFollowList] = useState({
    followers: [],
    following: []
  });

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
        setFollowList(res.data);
      });
  };

  const isFriend = usersId => {
    let result = false;
    let i;
    for (i = 0; i < friends.length; i++) {
      if (friends[i].friendId === usersId) {
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
        isFriend,
        getFollowList
      }}
    >
      {props.children}
    </FriendContext.Provider>
  );
};

export default FriendProvider;
