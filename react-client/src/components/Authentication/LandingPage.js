import React, { useState } from "react";
import Box from "../ui/Box";
import Flex from "../ui/Flex";
import bgImage from "../images/plant.jpg";
import { useSpring, animated } from "react-spring";
import Media from "react-media";
import { Helmet } from 'react-helmet';
import Login from "./Login";
import Signup from "./Signup";

const HookedComponent = props => {
  const props1 = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: "200"
  });
  return <animated.div style={props1}>{props.children}</animated.div>;
};

const LandingPage = () => {
  const [signupVisible, setSignupVisible] = useState(false);

  return (
    <Box
      height="100vh"
      backgroundImage={`linear-gradient(to top, rgba(63, 65, 69, 0), rgba(0, 0, 0, 0.73)),
      url(${bgImage});`}
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
    >
      <Helmet>
        <title> Login or Sign up </title>
        <meta
          name="description"
          content="Login to your TokeTalk Account! Don't have one? Sign up! Start sharing your marijuana experiences with others!"
        />
      </Helmet>
      <Media query={{ minWidth: 790 }}>
        {matches => (
          <Box fontFamily="Quicksand">
            <Flex justifyContent={matches ? "left" : "center"} mb="25px">
              <img
                alt="Toke Talk"
                src={require("../images/TokeTalkLogo.png")}
                style={{
                  width: `${matches ? "250px" : "80%"}`,
                  marginTop: `${matches ? "-70px" : "-75px"}`,
                  marginBottom: `${matches ? "-140px" : "0px"}`,
                  marginLeft: `${matches ? "10px" : "-20px"}`,
                }}
              />
            </Flex>
            {!signupVisible ? (
              <HookedComponent>
                <Login setSignupVisible={setSignupVisible} matches={matches} />
              </HookedComponent>
            ) : (
              <HookedComponent>
                <Signup setSignupVisible={setSignupVisible} matches={matches} />
              </HookedComponent>
            )}
          </Box>
        )}
      </Media>
    </Box>
  );
};
export default LandingPage;
