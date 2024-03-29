import React, { useState, useContext } from "react";
import axios from "axios";
import Box from "./ui/Box";
import Flex from "./ui/Flex";
import { ButtonSelector } from "./ui/Button";
import debounce from "lodash/debounce";
import { UserContext } from "../context/userContext";
import { Select, Spin, Input } from "antd";

const { Option } = Select;
const { TextArea } = Input;

const NewPostForm = props => {
  let lastFetchId = 0;

  const userCtx = useContext(UserContext);

  const [selected, setSelected] = useState("sativa");
  const [data, setData] = useState({ data: [], fetching: false });

  const fetchWeed1 = value => {
    lastFetchId += 1;
    const fetchId = lastFetchId;
    setData({ ...data, data: [], fetching: true });
    axios
      .get("/api/weed", {
        headers: { Authorization: `Bearer ${userCtx.token}` },
        params: {
          strain: selected,
          search: value
        }
      })
      .then(res => {
        if (fetchId !== lastFetchId) {
          // for fetch callback order
          return;
        }
        setData({ ...data, data: res.data.data, fetching: false });
      });
  };

  const handleChangeTags = value => {
    props.setTags(value);
  };

  const handleChange = value => {
    let promise = new Promise((resolve, error) => {
      setData({
        data: [],
        fetching: true
      });
      resolve(1);
    });

    promise.then(() => {
      props.setValue(value);
    });
  };

  const handleContentChange = value => {
    props.setContent(value.target.value);
  };

  let fetchWeed = debounce(fetchWeed1, 800);

  return (
    <Box>
      <Flex justifyContent="center" mb="20px">
        <ButtonSelector
          color="#faad14"
          borderColor="#ffe58f"
          bg={selected === "sativa" ? "#E5E1CF" : "#fffbe6"}
          onClick={() => {
            setSelected("sativa");
            handleChange();
          }}
          width="25%"
        >
          Sativa
        </ButtonSelector>
        <ButtonSelector
          color="#52c41a"
          borderColor="#b7eb8f"
          bg={selected === "hybrid" ? "#DDE5D5" : "#f6ffed"}
          onClick={() => {
            setSelected("hybrid");
            handleChange();
          }}
          width="25%"
        >
          Hybrid
        </ButtonSelector>
        <ButtonSelector
          color="#722ed1"
          borderColor="#d3adf7"
          bg={selected === "indica" ? "#E0D8E5" : "#f9f0ff"}
          onClick={() => {
            setSelected("indica");
            handleChange();
          }}
          width="25%"
        >
          Indica
        </ButtonSelector>
      </Flex>
      <Box mb="2px">Select Strain Name</Box>
      <Select
        showSearch
        labelInValue
        value={props.value}
        placeholder="Search Weed"
        notFoundContent={data.fetching ? <Spin size="small" /> : null}
        filterOption={false}
        onSearch={fetchWeed}
        onFocus={fetchWeed}
        onChange={handleChange}
        style={{ width: "100%" }}
      >
        {data.data.map(d => (
          <Option key={d.id}>{d.weedName}</Option>
        ))}
      </Select>
      <Box mt="10px" mb="2px">
        Review
      </Box>
      <TextArea
        placeholder="Review"
        autoSize={{ minRows: 2, maxRows: 6 }}
        onChange={handleContentChange}
      />
      <Box mt="10px" mb="2px">
        Tags
      </Box>
      <Select
        mode="tags"
        style={{ width: "100%" }}
        onChange={handleChangeTags}
        tokenSeparators={[","]}
      ></Select>
      {props.postError !== "" && (
        <Flex justifyContent="center" mt="10px" color="red">
          {props.postError}
        </Flex>
      )}
    </Box>
  );
};

export default NewPostForm;
