import React, { useState } from "react";
import axios from "axios";
import Box from "./ui/Box";
import Flex from "./ui/Flex";
import { css } from "emotion";
import { Icon, Select, Spin } from "antd";
import debounce from "lodash/debounce";

const { Option } = Select;

const FollowSearch = props => {
  let lastFetchId = 0;

  const [selected, setSelected] = useState("");
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

  let fetchUsers1 = debounce(handleChange, 200);

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
        <Box
          mt="10px"
          mr="15px"
          width="150px"
          fontSize="14px"
          borderRadius="20px"
        >
          <Select
            showSearch
            labelInValue
            value={props.value}
            placeholder="Search Users"
            notFoundContent={data.fetching ? <Spin size="small" /> : null}
            filterOption={false}
            onSearch={fetchUsers1}
            style={{ width: "100%" }}
          >
            {data.data.map(d => (
              <Option key={d.id}>{d.username}</Option>
            ))}
          </Select>
        </Box>
      </Flex>
    </Box>
  );
};

export default FollowSearch;
