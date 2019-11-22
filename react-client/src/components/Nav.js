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
        <Box> Posts </Box>
      </Menu.Item>
      <Menu.Item key="2">
        <Box> Strains </Box>
      </Menu.Item>
      <Menu.Item key="3">
        <Box> Logout </Box>
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
              <ButtonNav p="12px" pl="22%" pr="50px" 
                borderBottom="3px solid #0C1109" 
                bg="transparent" 
                border="none" 
                onClick={() => {
                  setActive("/posts");
                  props.posts();
                }}
              >
                <img
                  src={require("./images/TokeTalkLogo.png")}
                  alt="logo"
                  style={{
                    width: "170px",
                    marginTop: "-66px",
                    marginLeft: "-30%"
                  }}
                />
              </ButtonNav>

              <ButtonNav
                height="100%"
                bg="transparent"
                border="none"
                px="20px"
                color="#9DA077"
                borderBottom={`3px solid ${
                  active === "/posts" || active === "/posts/"
                    ? "rgb(110, 51, 95)"
                    : "#9DA077"
                }`}
                fontSize="16px"
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
                mr="50px"
                color="#9DA077"
                borderBottom={`3px solid ${
                  active === "/weed" || active === "/weed/"
                    ? "rgb(110, 51, 95)"
                    : "#9DA077"
                }`}
                fontSize="16px"
                fontWeight="bold"
                onClick={() => {
                  setActive("/weed");
                  props.weed();
                }}
              >
                Strains
              </ButtonNav>
              <FollowSearch />
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
                fontSize="25px"
                fontFamily="Permanent Marker"
                p="12px"
                pl="12%"
                mr="-60px"
              >
                <img
                  src={require("./images/TokeTalkLogo.png")}
                  alt="logo"
                  style={{
                    width: "150px",
                    marginTop: "-58px",
                    marginLeft: "-30%"
                  }}
                />
              </Box>
              <FollowSearch />
              <Box ml="auto" pt="15px" pr="10px">
                <Dropdown
                  overlay={menu}
                  visible={visible}
                  onVisibleChange={handleVisibleChange}
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
