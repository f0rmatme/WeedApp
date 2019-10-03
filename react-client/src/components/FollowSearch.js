import React, { useState } from "react";
import Box from "./ui/Box";
import Flex from "./ui/Flex";
import { css } from "emotion";
import { Icon, Input } from "antd";
import { useTransition, animated } from "react-spring";

const FollowSearch = () => {
  const [hidden, setHidden] = useState(false);

  const transitions = useTransition(hidden, null, {
    from: { position: "relative0", opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  return (
    <Box
      color="#9DA077"
      style={{
        fontSize: "25px"
      }}
    >
      <Flex
        className={css`
          &:hover {
            cursor: pointer;
          }
        `}
      >
        {transitions.map(
          ({ item, key, props }) =>
            item && (
              <Box key={key} mt="10px" fontSize="14px">
                <animated.div style={props}>
                  <Input placeholder="Search People..." />
                </animated.div>
              </Box>
            )
        )}
        <Box m="8px">
          <Icon
            type="search"
            style={{ paddingLeft: "10px" }}
            onClick={() => setHidden(!hidden)}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default FollowSearch;
