import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Tag, Spin, Icon, Skeleton } from "antd";
import { UserContext } from "../context/userContext";
import Box from "./ui/Box";
import Flex from "./ui/Flex";
import Eric from "./images/eric.png";
import Ad_1 from "./images/ads/bowlingsim.png";
import Ad_2 from "./images/ads/dopewatcher.png";

const antIcon = <Icon type="loading" style={{ fontSize: 70 }} spin />;

const Weeds = () => {
  const [{ weed, loading }, setWeed] = useState({ weed: [], loading: true });
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
        setWeed({ weed: response.data, loading: false });
      })
      .catch(function(error) {
        console.log(error);
        setWeed({ weed: [], loading: false });
        setError(error.data);
      });
  }, []);

  const getStrainColour = strain => {
    console.log(strain);
    switch (strain) {
      case "hybrid":
      case "Hybrid":
        return "lime";
      case "indica":
      case "Indica":
        return "purple";
      case "sativa":
      case "Sativa":
        return "gold";
      case "terpenes":
      case "Terpenes":
        return "magenta";
    }
  };

  return (
    <Box
      bg="#f5f2e8"
      backgroundSize="cover"
      height={loading ? "100vh" : "100%"}
    >
      <Flex>
        <Box
          style={{
            width: "20%",
            marginTop: "25px",
            marginLeft: "25px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around"
          }}
        >
          <Card
            style={{
              height: "300px",
              width: "220px"
            }}
            cover={
              <img
                src={Eric}
                alt="eric"
                style={{
                  maxHeight: "150px",
                  maxWidth: "145px"
                }}
              />
            }
          >
            <Meta
              title={userCtx.user.username}
              description="I like men"
              style={{
                marginBottom: "10px"
              }}
            />
            <Box>Posts: 0</Box>
            <Box>Updoots: 69</Box>
          </Card>
        </Box>
        {!loading ? (
          <Box
            style={{
              width: "60%",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              marginTop: "15px"
            }}
          >
            {weed.map((weedItem, key) => {
              return (
                <Box key={key}>
                  <Card
                    hoverable
                    cover={
                      <img
                        alt="weed"
                        style={{
                          maxHeight: "200px",
                          maxWidth: "195px"
                        }}
                        src={weedItem.pictureUrl}
                      />
                    }
                    style={{
                      height: "350px",
                      width: "200px",
                      margin: "10px",
                      justifyContent: "center"
                    }}
                  >
                    <Meta
                      title={weedItem.weedName}
                      description={weedItem.company}
                    />
                    <Tag
                      color={getStrainColour(weedItem.strain)}
                      style={{
                        marginTop: "5px",
                        marginBottom: "5px"
                      }}
                    >
                      {weedItem.strain}
                    </Tag>
                    <Box
                      style={{
                        wordWrap: "break-word"
                      }}
                    >
                      <b>thc:</b> {weedItem.thc}
                    </Box>
                    <Box
                      style={{
                        wordWrap: "break-word"
                      }}
                    >
                      <b>cbd:</b> {weedItem.cbd}
                    </Box>
                  </Card>
                </Box>
              );
            })}
          </Box>
        ) : (
          <Flex width="60%" justifyContent="center" mt="20%">
            <Spin indicator={antIcon} size="large" />
          </Flex>
        )}
        <Box
          style={{
            width: "20%",
            marginTop: "25px",
            marginLeft: "25px",
            display: "column",
            justifyContent: "center"
          }}
        >
          {/*  <Card
            style={{
              height: "300px",
              width: "150px"
            }}
            bordered={false}
            cover={
              <img
                style={{
                  maxHeight: "200px",
                  maxWidth: "145px"
                }}
                src={Ad_1}
                alt="bowlingsim"
              />
            }
          >
            <Meta title="Bowlingsim" />
            <Box
              style={{
                wordWrap: "break-word"
              }}
            >
              Bowl your heart out!
            </Box>
          </Card>
          <br />
          <Card
            style={{
              height: "300px",
              width: "175px",
              justifyContent: "left"
            }}
            bordered={false}
            cover={
              <img
                style={{
                  maxHeight: "200px",
                  maxWidth: "145px"
                }}
                src={Ad_2}
                alt="dope watcher"
              />
            }
          >
            <Meta title="Dope Watcher" />
            <Box
              style={{
                wordWrap: "break-word"
              }}
            >
              We watch the weed for you!
            </Box>
          </Card> */}
        </Box>
      </Flex>
    </Box>
  );
};

export default Weeds;
