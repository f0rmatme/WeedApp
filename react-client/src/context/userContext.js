import React, { useState } from "react";

export const UserContext = React.createContext({
  username: "",
  email: "",
  token: window.localStorage.accessToken,
  setUsername: () => {},
  setEmail: () => {},
  setToken: () => {}
});

const UserProvider = props => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState(window.localStorage.accessToken);
  return (
    <UserContext.Provider
      value={{ username, email, token, setUsername, setEmail, setToken }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
