import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Box from "./ui/Box";
import Flex from "./ui/Flex";
import { css } from "emotion";
import { Icon, Select } from "antd";
import Media from "react-media";
import debounce from "lodash/debounce";
import DEFAULT_PROFILE from "../components/images/toketalk_3d_badge.PNG";
import { UserContext } from "../context/userContext";

const { Option } = Select;

const FollowSearch = props => {
  let lastFetchId = 0;

  const [data, setData] = useState({ data: [], fetching: false });

  const userCtx = useContext(UserContext);

  const fetchUsers = value => {
    if (value !== "") {
      lastFetchId += 1;
      const fetchId = lastFetchId;
      setData({ data: [], fetching: true });
      axios
        .get(`/api/user/search/${value}`, {
          headers: {
            Authorization: `Bearer ${userCtx.token}`
          }
        })
        .then(res => {
          if (fetchId !== lastFetchId) {
            return;
          }
          setData({ data: res.data, fetching: false });
        });
    }
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
            <Box
              mt="10px"
              mr="15px"
              width={matches ? "280px" : "200px"}
              fontSize="14px"
              borderRadius="20px"
            >
              <Select
                showSearch
                loading={data.fetching}
                showArrow={false}
                labelInValue
                value={props.value}
                placeholder="Search Users"
                notFoundContent={data.fetching ? null : "No Users Found"}
                filterOption={false}
                onSearch={fetchUsers1}
                style={{ width: "100%" }}
                onBlur={() => setData({ data: [], fetching: false })}
              >
                {data.data.map(d => (
                  <Option key={d.id} onClick={() => handleOptionClick(d)}>
                    <Flex>
                      <img
                        alt="profile"
                        src={d.profilepic ? d.profilepic : DEFAULT_PROFILE}
                        style={{
                          width: "20px",
                          height: "20px",
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
