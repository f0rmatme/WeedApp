import React, { useState, useContext } from "react";
import axios from "axios";
import { validateInput } from "../helpers/validation";
import { UserContext } from "./userContext";

export const FriendContext = React.createContext({});

const FriendProvider = props => {
  const [friends, setFriends] = useState(
    JSON.parse(window.localStorage.friends) || []
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
      value={{ friends, setFriends, getFriends, isFriend }}
    >
      {props.children}
    </FriendContext.Provider>
  );
};

export default FriendProvider;
