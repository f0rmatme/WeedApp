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

  const reloadUserInfo = userInfo => {
    axios
      .get(`/api/user/${userInfo.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setUser(res.data);
      });
  };

  const updateProfile = (username, email, bio) => {
    if (validateInput(username) && validateInput(bio)) {
      axios.put(
        "/api/user",
        { username: username, email: email, bio: bio, id: user.id },
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
        updateProfile,
        reloadUserInfo
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
