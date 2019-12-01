import React from "react";
import Box from "./ui/Box";
import Flex from "./ui/Flex";
import { ButtonNav } from "./ui/Button";
import { withRouter } from "react-router-dom";
import Media from "react-media";
import { Menu, Dropdown, Icon } from "antd";
import FollowSearch from "./FollowSearch";
import { UserContext } from "../context/userContext";

const Nav = props => {
  const [active, setActive] = React.useState(
    props.history.location.pathname || "/posts/"
  );
  const [visible, setVisible] = React.useState(false);

  const userCtx = React.useContext(UserContext);

  const handleMenuClick = e => {
    if (e.key === "1") {
      setActive("/posts");
      props.posts();
    } else if (e.key === "2") {
      setActive("/weed");
      props.weed();
    } else if (e.key === "4") {
      setActive(`/profile`);
      props.history.push(`/profile/${userCtx.user.username}`);
    } else if (e.key === "3") {
      handleLogout();
    }
  };

  React.useEffect(() => {
    setActive(props.history.location.pathname);
  }, [props.history.location.pathname]);

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">
        <Box px="15px"> Posts </Box>
      </Menu.Item>
      <Menu.Item key="2">
        <Box px="15px"> Strains </Box>
      </Menu.Item>
      <Menu.Item key="4">
        <Box px="15px"> Profile </Box>
      </Menu.Item>
      <Menu.Item key="3">
        <Box px="15px"> Logout </Box>
      </Menu.Item>
    </Menu>
  );

  const handleVisibleChange = flag => {
    setVisible(flag);
  };

  const handleLogout = () => {
    localStorage.clear();
    userCtx.setUser({});
  };

  return (
    <Box position="sticky" top="0" zIndex="100">
      <Media
        query={{
          minWidth: 900
        }}
      >
        {matches =>
          matches ? (
            <Flex
              color="white"
              height="50px"
              bg="#0C1109"
              flexDirection="row"
              boxShadow="5px 0px 16px #0C1109"
            >
              <Flex ml="18%" width="47%">
                <ButtonNav
                  pr="12px"
                  bg="transparent"
                  border="none"
                  onClick={() => {
                    setActive("/posts");
                    props.posts();
                  }}
                >
                  <img
                    src={require("./images/badge.png")}
                    alt="logo"
                    style={{
                      width: "50px",
                      marginTop: "-10px"
                    }}
                  />
                </ButtonNav>
                <Box>
                  <FollowSearch />
                </Box>
              </Flex>
              <Flex width="350px">
                <Box>
                  <ButtonNav
                    height="100%"
                    bg="transparent"
                    border="none"
                    color="#9DA077"
                    borderBottom={`${
                      active === "/posts" || active === "/posts/"
                        ? "2px solid #9DA077"
                        : "0px solid #0C1109"
                    }`}
                    fontSize="16px"
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
                    color="#9DA077"
                    borderBottom={`${
                      active === "/weed" || active === "/weed/"
                        ? "2px solid #9DA077"
                        : "0px solid #0C1109"
                    }`}
                    fontSize="16px"
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
                    color="#9DA077"
                    borderBottom={`${
                      active === "/profile" ||
                      active === `/profile/${userCtx.user.username}`
                        ? "2px solid #9DA077"
                        : "0px solid #0C1109"
                    }`}
                    fontSize="16px"
                    onClick={() => {
                      setActive(`/profile/${userCtx.user.username}`);
                      props.history.push(`/profile/${userCtx.user.username}`);
                    }}
                  >
                    Profile
                  </ButtonNav>
                  <ButtonNav
                    height="100%"
                    bg="transparent"
                    border="none"
                    color="#9DA077"
                    fontSize="16px"
                    onClick={handleLogout}
                  >
                    <Flex>
                      <Box> Logout </Box>
                      <Icon
                        type="logout"
                        style={{
                          paddingTop: "4px",
                          paddingLeft: "5px"
                        }}
                      />
                    </Flex>
                  </ButtonNav>
                </Box>
              </Flex>
            </Flex>
          ) : (
            <Flex
              color="white"
              height="50px"
              bg="#0C1109"
              flexDirection="row"
              position="sticky"
              top="0"
              zIndex="100"
              boxShadow="5px 0px 16px #0C1109"
            >
              <Box
                mr="20px"
                onClick={() => {
                  setActive("/posts");
                  props.posts();
                }}
              >
                <img
                  src={require("./images/badge.png")}
                  alt="logo"
                  style={{
                    height: "50px"
                  }}
                />
              </Box>
              <Box ml="auto">
                <FollowSearch />
              </Box>
              <Box ml="auto" pt="11px" pr="15px">
                <Dropdown
                  overlay={menu}
                  visible={visible}
                  onVisibleChange={handleVisibleChange}
                  placement="bottomLeft"
                >
                  <Icon type="menu" style={{ fontSize: "28px" }} />
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
