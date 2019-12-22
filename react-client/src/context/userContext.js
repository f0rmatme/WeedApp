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

  const reloadUserInfo = user => {
    axios
      .post("/verify", {
        token: token
      })
      .then(res => {
        if (!res.data.error) {
          axios
            .get(`/api/user/${user.id}`, {
              headers: { Authorization: `Bearer ${token}` }
            })
            .then(res => {
              setUser(res.data);
            });
        } else {
          localStorage.clear();
          setToken("");
          setUser({});
        }
      });
  };

  const updateProfile = (username, email, bio, profilepic) => {
    if (
      (validateInput(username) && validateInput(bio)) ||
      (email === "" && bio === "")
    ) {
      axios.put(
        "/api/user",
        {
          username: username,
          email: email,
          bio: bio,
          id: user.id,
          profilepic: profilepic
        },
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
