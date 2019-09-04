import React, { useState } from "react";

export const UserContext = React.createContext({
  username: "",
  email: "",
  token: window.localStorage.accessToken,
  user: {},
  setUsername: () => {},
  setEmail: () => {},
  setToken: () => {},
  setUser: () => {}
});

const UserProvider = props => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState(window.localStorage.accessToken);
  const [user, setUser] = useState({});
  return (
    <UserContext.Provider
      value={{
        username,
        email,
        token,
        user,
        setUsername,
        setEmail,
        setToken,
        setUser
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
