import React from "react";
import Box from "./ui/Box";
import Flex from "./ui/Flex";
import { ButtonNav } from "./ui/Button";
import { withRouter } from "react-router-dom";

import BGNav from "./images/smoke1.jpg";

const Nav = props => {
  const handleLogout = () => {
    localStorage.clear();
    props.setAt("");
  };
  const [active, setActive] = React.useState(props.history.location.pathname);
  return (
    <Flex
      color="white"
      height="60px"
      bg="#0C1109"
      flexDirection="row"
      position="sticky"
      top="0"
      zIndex="100"
    >
      <Box
        fontSize="25px"
        fontFamily="Permanent Marker"
        p="12px"
        pl="25%"
        pr="25%"
        borderBottom="3px solid #0C1109"
      >
        TokeTalk
      </Box>
      <ButtonNav
        height="100%"
        bg="transparent"
        border="none"
        px="20px"
        borderBottom={`3px solid ${
          active === "/posts" || active === "/posts/"
            ? "rgb(110, 51, 95)"
            : "white"
        }`}
        fontSize="18px"
        fontWeight="bold"
        color={
          active === "/posts" || active === "/posts/"
            ? "rgb(110, 51, 95)"
            : "white"
        }
        onClick={() => {
          setActive("/posts");
          props.posts();
        }}
      >
        Posts
      </ButtonNav>
      <ButtonNav
        height="100%"
        bg="transparent"
        border="none"
        px="20px"
        borderBottom={`3px solid ${
          active === "/weed" || active === "/weed/"
            ? "rgb(110, 51, 95)"
            : "white"
        }`}
        fontSize="18px"
        fontWeight="bold"
        color={
          active === "/weed" || active === "/weed/"
            ? "rgb(110, 51, 95)"
            : "white"
        }
        onClick={() => {
          setActive("/weed");
          props.weed();
        }}
      >
        Strains
      </ButtonNav>
      <ButtonNav
        height="100%"
        bg="transparent"
        border="none"
        alignSelf="flex-end"
        pr="20px"
        ml="auto"
        fontSize="18px"
        fontWeight="bold"
        onClick={handleLogout}
      >
        Logout
      </ButtonNav>
    </Flex>
  );
};

export default withRouter(Nav);
