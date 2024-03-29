import React, { useState } from "react";
import Box from "../ui/Box";
import Flex from "../ui/Flex";
import Media from "react-media";
import { Helmet } from "react-helmet";
import Login from "./Login";
import Signup from "./Signup";

const LandingPage = () => {
  const [signupVisible, setSignupVisible] = useState(false);

  return (
    <Box>
      <Helmet>
        <title> Login or Sign up </title>
        <meta
          name="description"
          content="Login to your TokeTalk Account! Don't have one? Sign up! Start sharing your marijuana experiences with others!"
        />
      </Helmet>
      <Media queries={{ width: { minWidth: 850 }, height: { minHeight: 500 } }}>
        {matches => (
          <Box fontFamily="Quicksand" className="LandingPage">
            <Flex justifyContent={matches ? "flex-start" : "center"} mb="25px">
              {matches.width && (
                <img
                  alt="Toke Talk"
                  src={require("../images/TokeTalkLogo.png")}
                  style={{
                    width: `${matches.width ? "250px" : "80%"}`,
                    marginTop: `${matches.width && "-70px"}`
                  }}
                />
              )}
            </Flex>
            {!signupVisible ? (
              <Login setSignupVisible={setSignupVisible} matches={matches} />
            ) : (
              <Signup setSignupVisible={setSignupVisible} matches={matches} />
            )}
          </Box>
        )}
      </Media>
    </Box>
  );
};
export default LandingPage;
