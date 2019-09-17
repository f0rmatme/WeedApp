import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Tag, Spin, Icon, Skeleton, Avatar, Radio } from "antd";
import { UserContext } from "../context/userContext";
import Box from "./ui/Box";
import Flex from "./ui/Flex";
import Eric from "./images/eric.png";
import Ad_1 from "./images/ads/bowlingsim.png";
import Ad_2 from "./images/ads/dopewatcher.png";
import { getStrainColour } from "../helpers/strainColour.js";
import Media from "react-media";
import RadioGroup from "antd/lib/radio/group";

const antIcon = <Icon type="loading" style={{ fontSize: 70 }} spin />;

const Weeds = () => {
  const [{ weed, loading }, setWeed] = useState({ weed: [], loading: true });
  const [fromError, setError] = useState([]);
  const { Meta } = Card;

  const userCtx = React.useContext(UserContext);

  useEffect(() => {
    axios
      .get("/weed", {
        headers: { Authorization: `Bearer ${userCtx.token}` }
      })
      .then(function(response) {
        setWeed({ weed: response.data, loading: false });
      })
      .catch(function(error) {
        console.log(error);
        setWeed({ weed: [], loading: false });
        setError(error.data);
      });
  }, []);

  const first8 = weed.slice(0, 8);

  return (
    <Box
      bg="#f5f2e8"
      backgroundSize="cover"
      height={loading ? "100vh" : "100%"}
    >
      <Media query={{ minWidth: 605 }}>
        {matches =>
          matches ? (
            <Flex>
              <Flex
                style={{
                  width: "20%",
                  marginTop: "25px",
                  height: "500px",
                  marginLeft: "10px",
                  flexWrap: "wrap",
                  justifyContent: "space-around",
                  backgroundColor: "grey"
                }}
              ></Flex>
              {!loading ? (
                <Box
                  style={{
                    width: "80%",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "flex-start",
                    marginTop: "15px"
                  }}
                >
                  {first8.map((weedItem, key) => {
                    //weed.map((weedItem, key) => {
                    return (
                      <Flex key={key}>
                        <Card
                          hoverable
                          cover={
                            <img
                              alt="weed"
                              style={{
                                minHeight: "200px",
                                minWidth: "195px",
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
                            //width: "100%"
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
                      </Flex>
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
                  width: "0%",
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
          ) : (
            <Box>
              {!loading ? (
                <Box
                  style={{
                    width: "100%",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    marginTop: "15px",
                    flexDirection: "column"
                  }}
                >
                  {first8.map((weedItem, key) => {
                    //weed.map((weedItem, key) => {
                    return (
                      <Flex
                        key={key}
                        style={{
                          flexDirection: "row",
                          margin: "10px"
                        }}
                      >
                        <Flex
                          style={{
                            flex: "1",
                            justifyContent: "flex-start"
                          }}
                        >
                          <Card hoverable>
                            <Flex
                              style={{
                                flexDirection: "row"
                              }}
                            >
                              <Meta
                                avatar={<Avatar src={weedItem.pictureUrl} />}
                                title={weedItem.weedName}
                                description={weedItem.company}
                                style={{
                                  margin: "10px"
                                }}
                              />
                              <Meta
                                title={
                                  <Tag
                                    color={getStrainColour(weedItem.strain)}
                                    style={{
                                      marginTop: "5px",
                                      marginBottom: "5px"
                                    }}
                                  >
                                    {weedItem.strain}
                                  </Tag>
                                }
                                description={
                                  "thc: " +
                                  weedItem.thc +
                                  " cbd:  " +
                                  weedItem.cbd
                                }
                                style={{
                                  marginTop: "2px",
                                  marginLeft: "5px"
                                }}
                              />
                            </Flex>
                          </Card>
                        </Flex>
                      </Flex>
                    );
                  })}
                </Box>
              ) : (
                <Flex width="60%" justifyContent="center" mt="20%">
                  <Spin indicator={antIcon} size="large" />
                </Flex>
              )}
            </Box>
          )
        }
      </Media>
    </Box>
  );
};

export default Weeds;
