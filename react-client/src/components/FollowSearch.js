import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Box from "./ui/Box";
import Flex from "./ui/Flex";
import { css } from "emotion";
import { Icon, Select, Spin } from "antd";
import Media from "react-media";
import debounce from "lodash/debounce";

const { Option } = Select;

const FollowSearch = props => {
  let lastFetchId = 0;

  const [data, setData] = useState({ data: [], fetching: false });

  const fetchUsers = value => {
    lastFetchId += 1;
    const fetchId = lastFetchId;
    setData({ ...data, data: [], fetching: true });
    axios
      .get(`/api/user/find`, {
        params: {
          search: value
        }
      })
      .then(res => {
        if (fetchId !== lastFetchId) {
          return;
        }
        setData({ ...data, data: res.data, fetching: false });
      });
  };

  const handleChange = value => {
    let promise = new Promise((resolve, reject) => {
      setData({
        data: [],
        fetching: false
      });
      resolve(value);
    });
    promise.then(value => {
      fetchUsers(value);
    });
  };

  const handleOptionClick = user => {
    props.history.push(`/profile/${user.username}`);
  };

  let fetchUsers1 = debounce(handleChange, 200);

  return (
    <Media
      query={{
        minWidth: 900
      }}
    >
      {matches => (
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
            <Box
              mt="10px"
              mr="15px"
              width={matches ? "200px" : "120px"}
              fontSize="14px"
              borderRadius="20px"
            >
              <Select
                showSearch
                showArrow={false}
                labelInValue
                value={props.value}
                placeholder="Search Users"
                notFoundContent={data.fetching ? <Spin size="small" /> : null}
                filterOption={false}
                onSearch={fetchUsers1}
                style={{ width: "100%" }}
              >
                {data.data.map(d => (
                  <Option key={d.id} onClick={() => handleOptionClick(d)}>
                    <Flex>
                      <img
                        alt="profile"
                        src={d.profilepic}
                        style={{
                          width: "20px",
                          borderRadius: "50%",
                          marginRight: "10px"
                        }}
                      />
                      <Box>{d.username}</Box>
                    </Flex>
                  </Option>
                ))}
              </Select>
            </Box>
          </Flex>
        </Box>
      )}
    </Media>
  );
};

export default withRouter(FollowSearch);
