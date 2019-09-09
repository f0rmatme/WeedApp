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
      boxShadow="5px 0px 16px #0C1109"
    >
      <Box
        fontSize="25px"
        fontFamily="Permanent Marker"
        p="12px"
        pl="25%"
        pr="25%"
        borderBottom="3px solid #0C1109"
      >
        <img
          src={require("./images/TokeTalkLogo.png")}
          style={{
            width: "200px",
            marginTop: "-75px",
            marginLeft: "-70px",
            marginRight: "30%"
          }}
        />
      </Box>
      <ButtonNav
        height="100%"
        bg="transparent"
        border="none"
        px="20px"
        color="#9DA077"
        borderBottom={`3px solid ${
          active === "/posts" || active === "/posts/" ? "#90119c" : "#9DA077"
        }`}
        fontSize="18px"
        fontWeight="bold"
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
        color="#9DA077"
        borderBottom={`3px solid ${
          active === "/weed" || active === "/weed/" ? "#90119c" : "#9DA077"
        }`}
        fontSize="18px"
        fontWeight="bold"
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
        color="#9DA077"
        fontSize="16px"
        fontWeight="bold"
        onClick={handleLogout}
      >
        Logout
      </ButtonNav>
    </Flex>
  );
};

export default withRouter(Nav);
