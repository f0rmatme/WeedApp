import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Col, Row } from "antd";
import { UserContext } from "../context/userContext";
import Box from "./ui/Box";

const Weeds = () => {
  //axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
  const [weed, setWeed] = useState([]);
  const [fromError, setError] = useState([]);
  const { Meta } = Card;

  const userCtx = React.useContext(UserContext);

  useEffect(() => {
    axios
      .get("http://localhost:3000/weed", {
        headers: { Authorization: `Bearer ${userCtx.token}` }
      })
      .then(function(response) {
        console.log(response.data);
        setWeed(response.data);
      })
      .catch(function(error) {
        console.log(error);
        setError(error.data);
      });
  }, []);

  return (
    <Box bg="#f5f2e8">
      <Row
        gutter={16}
        style={{
          paddingTop: "25px",
          marginLeft: "12.5px",
          marginRight: "12.5px"
        }}
      >
        {weed.map((weedItem, key) => {
          return (
            <div key={key}>
              <Col span={6} style={{ marginBottom: "25px" }}>
                <Card
                  hoverable
                  cover={<img alt="weed" src={weedItem.pictureUrl} />}
                >
                  <Meta
                    title={weedItem.weedName}
                    description={weedItem.strain}
                  />
                  <br />
                  <p>THC: {weedItem.thc}</p>
                  <p>CBD: {weedItem.cbd}</p>
                  <p>BY: {weedItem.company}</p>
                </Card>
              </Col>
            </div>
          );
        })}
      </Row>
    </Box>
  );
};

export default Weeds;
