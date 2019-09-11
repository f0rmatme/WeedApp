import React from "react";
import Box from "./ui/Box";
import Flex from "./ui/Flex";
import { ButtonNav } from "./ui/Button";
import { withRouter } from "react-router-dom";
import Media from "react-media";
import { Menu, Dropdown, Icon } from "antd";

import BGNav from "./images/smoke1.jpg";

const Nav = props => {
  const [active, setActive] = React.useState(props.history.location.pathname);
  const [visible, setVisible] = React.useState(false);

  const handleMenuClick = e => {
    if (e.key === "1") {
      setActive("/posts");
      props.posts();
    } else if (e.key === "2") {
      setActive("/weed");
      props.weed();
    } else if (e.key === "3") {
      handleLogout();
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">
        <Box>Posts</Box>
      </Menu.Item>
      <Menu.Item key="2">
        <Box>Strains</Box>
      </Menu.Item>
      <Menu.Item key="3">
        <Box>Logout</Box>
      </Menu.Item>
    </Menu>
  );

  const handleVisibleChange = flag => {
    setVisible(flag);
  };

  const handleLogout = () => {
    localStorage.clear();
    props.setAt("");
  };

  return (
    <Box>
      <Media query={{ minWidth: 900 }}>
        {matches =>
          matches ? (
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
              <Box p="12px" pl="25%" pr="20%" borderBottom="3px solid #0C1109">
                <img
                  src={require("./images/TokeTalkLogo.png")}
                  alt="logo"
                  style={{
                    width: "200px",
                    marginTop: "-75px",
                    marginLeft: "-30%"
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
                  active === "/posts" || active === "/posts/"
                    ? "#90119c"
                    : "#9DA077"
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
                  active === "/weed" || active === "/weed/"
                    ? "#90119c"
                    : "#9DA077"
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
          ) : (
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
                pl="10%"
              >
                <img
                  src={require("./images/TokeTalkLogo.png")}
                  style={{
                    width: "150px",
                    marginTop: "-50px",
                    marginLeft: "-25%"
                  }}
                />
              </Box>
              <Box ml="auto" pt="20px" pr="10px">
                <Dropdown
                  overlay={menu}
                  visible={visible}
                  onVisibleChange={setVisible}
                >
                  <Icon type="menu" />
                </Dropdown>
              </Box>
            </Flex>
          )
        }
      </Media>
    </Box>
  );
};

export default withRouter(Nav);
