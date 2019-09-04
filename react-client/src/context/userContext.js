import React, { useState } from "react";

export const UserContext = React.createContext({
  token: window.localStorage.accessToken,
  user: {},
  setToken: () => {},
  setUser: () => {}
});

const UserProvider = props => {
  const [token, setToken] = useState(window.localStorage.accessToken);
  const [user, setUser] = useState({});
  return (
    <UserContext.Provider
      value={{
        token,
        user,
        setToken,
        setUser
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
