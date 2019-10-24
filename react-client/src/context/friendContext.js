import React, { useState, useContext } from "react";
import axios from "axios";
import { validateInput } from "../helpers/validation";
import { UserContext } from "./userContext";

export const FriendContext = React.createContext({});

const FriendProvider = props => {
  const [friends, setFriends] = useState([]);

  const userCtx = useContext(UserContext);

  const getFriends = () => {
    axios
      .get(`/api/friend/${userCtx.user.id}`, {
        headers: { Authorization: `Bearer ${userCtx.token}` }
      })
      .then(res => {
        setFriends(res.data);
      });
  };

  const isFriend = () => {
    console.log("I don't know");
  };

  return (
    <FriendContext.Provider value={{ friends, setFriends, getFriends }}>
      {props.children}
    </FriendContext.Provider>
  );
};

export default FriendProvider;
