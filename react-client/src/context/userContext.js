import React, { useState } from "react";
import axios from "axios";
import { validateInput } from "../helpers/validation";

export const UserContext = React.createContext({
  token: window.localStorage.accessToken,
  user: {},
  setToken: () => {},
  setUser: () => {}
});

const UserProvider = props => {
  const [token, setToken] = useState(window.localStorage.accessToken);
  const [user, setUser] = useState({});

  const updateProfile = (username, email, bio) => {
    if (validateInput(username) && validateInput(bio)) {
      let sendUsername = username === "" ? user.username : username;
      let sendEmail = email === "" ? user.email : email;
      let sendBio = bio === "" ? user.bio : bio;
      axios.put(
        "/api/user",
        { username: sendUsername, email: sendEmail, bio: sendBio },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
    }
  };

  return (
    <UserContext.Provider
      value={{
        token,
        user,
        setToken,
        setUser,
        updateProfile
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
