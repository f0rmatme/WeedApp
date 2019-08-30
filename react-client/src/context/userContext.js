import React, { useState } from "react";

export const UserContext = React.createContext({
  username: "",
  email: "",
  setUsername: () => {},
  setEmail: () => {}
});

const UserProvider = props => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  return (
    <UserContext.Provider value={{ username, email, setUsername, setEmail }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
