import React, { useState } from "react";
import Box from "./ui/Box";
import Flex from "./ui/Flex";
import { css } from "emotion";
import { Icon, Input } from "antd";

const FollowSearch = () => {
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
        <Box m="8px">
          <Icon type="search" style={{ paddingLeft: "10px" }} />
        </Box>
        <Box mt="10px" mr="15px" fontSize="14px">
          <Input placeholder="Search People..." />
        </Box>
      </Flex>
    </Box>
  );
};

export default FollowSearch;
