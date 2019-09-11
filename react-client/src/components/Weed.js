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
import Media from 'react-media';
import RadioGroup from "antd/lib/radio/group";

const antIcon = <Icon type="loading" style={{ fontSize: 70 }} spin />;

const Weeds = () => {
  const [{ weed, loading }, setWeed] = useState({ weed: [], loading: true });
  const [fromError, setError] = useState([]);
  const { Meta } = Card;
  const [{strainOpt, structureOpt, companyOpt}, setOption] = useState({ strainOpt: "all", structureOpt: "all", companyOpt: "all"});
  const [filter, setFilter] = useState({});

  const userCtx = React.useContext(UserContext);

  useEffect(() => {
    axios
      .get("http://localhost:3000/weed", {
        headers: { Authorization: `Bearer ${userCtx.token}` },
        //body: {
        //  pagination
        //}
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

  const first8 = weed.slice(0,8);

  const strainOption = e => {
    setFilter({...filter, strain: e.target.value});
  };

  /*const structureOption = e => {
    setFilter({...filter, stureture: e.target.value});
  };*/

  const companyOption = e => {
    setFilter({...filter, company: e.target.value});
  };
  
  return (
    <Box
      bg="#f5f2e8"
      backgroundSize="cover"
      height={loading ? "100vh" : "100%"}
    >
      <Media query={{ minWidth: 605}}>
        { matches => 
          matches ? (
            <Flex
              style={{
                justifyContent: "space-around",
              }}
            >
              <Flex
                style={{
                  width: "15%",
                  height: "500px",
                  marginTop: "25px",
                  marginLeft: "2%",
                  marginRight: "2%",
                  flexWrap: "wrap",
                  //justifyContent: "center",
                  backgroundColor: "silver",
                  flexDirection: "column",
                }}
              >
                <Flex
                  style={{
                    justifyContent: "center",
                    margin: "5px",
                    
                  }}
                >
                  <h2>
                    Filters
                  </h2>
                </Flex>
                <Flex
                  style={{
                    flexDirection: "column",
                    margin: "5px",
                  }}
                >
                  <h3>
                    Strain
                  </h3>
                  <Radio.Group
                    onChange={strainOption}
                    defaultValue={""}
                    buttonStyle={"solid"}
                  >
                    <Radio.Button
                      //style={}
                      value={""}
                    >
                      All
                    </Radio.Button>
                    <Radio.Button
                      //style={}
                      value={"indica"}
                    >
                      Indica
                    </Radio.Button>
                    <Radio.Button
                      //style={}
                      value={"sativa"}
                    >
                      Sativa
                    </Radio.Button>
                    <Radio.Button
                      //style={}
                      value={"hybrid"}
                    >
                      Hybrid
                    </Radio.Button>
                  </Radio.Group>
                  <h3>
                    Structure
                  </h3>
                  <Radio.Group
                    onChange={structureOption}
                    value={structureOpt}
                  >
                    <Radio
                      //style={}
                      value={""}
                    >
                      All
                    </Radio>
                    <Radio
                      //style={}
                      value={"cbd"}
                    >
                      CBD Dominant
                    </Radio>
                    <Radio
                      //style={}
                      value={"thc"}
                    >
                      THC Dominant
                    </Radio>
                    <Radio
                      //style={}
                      value={"terpenes"}
                    >
                      Terpenes
                    </Radio>
                  </Radio.Group>
                  <h3>
                    Company
                  </h3>
                  <Radio.Group
                    onChange={companyOption}
                    value={companyOpt}
                  >
                    <Radio
                      //style={}
                      value={""}
                    >
                      All
                    </Radio>
                    <Radio
                      //style={}
                      value={"Aurora"}
                    >
                      Aurora
                    </Radio>
                    <Radio
                      //style={}
                      value={"Canna Farms"}
                    >
                      THC Dominant
                    </Radio>
                    <Radio
                      //style={}
                      value={"Color Cannabis"}
                    >
                      Color Cannabis
                    </Radio>
                    <Radio
                      //style={}
                      value={"Delta 9 Cannabis"}
                    >
                      Delta 9 Cannabis
                    </Radio>
                    <Radio
                      //style={}
                      value={"Doja"}
                    >
                      Doja
                    </Radio>
                    <Radio
                      //style={}
                      value={"DNA Genetics"}
                    >
                      DNA Genetics
                    </Radio>
                    <Radio
                      //style={}
                      value={"High Tide"}
                    >
                      High Tide
                    </Radio>
                    <Radio
                      //style={}
                      value={"LBS"}
                    >
                      LBS
                    </Radio>
                    <Radio
                      //style={}
                      value={"Namaste"}
                    >
                      Namaste
                    </Radio>
                    <Radio
                      //style={}
                      value={"Royal High"}
                    >
                      Royal High
                    </Radio>
                    <Radio
                      //style={}
                      value={"Tokyo Smoke"}
                    >
                      Tokyo Smoke
                    </Radio>
                    <Radio
                      //style={}
                      value={"Tweed Inc."}
                    >
                      Tweed
                    </Radio>
                    <Radio
                      //style={}
                      value={"Up Cannabis"}
                    >
                      Up Cannabis
                    </Radio>
                    <Radio
                      //style={}
                      value={"Vertical"}
                    >
                      Vertical
                    </Radio>
                    <Radio
                      //style={}
                      value={"Zenabis"}
                    >
                      Zenabis
                    </Radio>
                  </Radio.Group>

                  

                  
                  
                </Flex>
              </Flex>
              {!loading ? (
                <Box
                  style={{
                    width: "60%",
                    display: "flex",
                    flexWrap: "wrap",
                    flexFlow: "row wrap",
                    justifyContent: "space-around",
                    marginTop: "15px",
                  }}
                >
                  { weed.map((weedItem, key) => {//weed.map((weedItem, key) => {
                    console.log(weedItem.company + "\n" );
                    return (
                      <Flex 
                        key={key}
                        style={{
                          //flexBasis: 
                        }}
                      >
                        <Card
                          hoverable
                          cover={
                            <img
                              alt="weed"
                              style={{
                                minHeight: "200px",
                                minWidth: "195px",
                                maxHeight: "200px",
                                maxWidth: "195px",
                              }}
                              src={weedItem.pictureUrl}
                            />
                          }
                          style={{
                            height: "350px",
                            width: "200px",
                            margin: "10px",
                            justifyContent: "center",
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
                              marginBottom: "5px",
                            }}
                          >
                            {weedItem.strain}
                          </Tag>
                          <Box
                            style={{
                              wordWrap: "break-word",
                            }}
                          >
                            <b>thc:</b> {weedItem.thc}
                          </Box>
                          <Box
                            style={{
                              wordWrap: "break-word",
                            }}
                          >
                            <b>cbd:</b> {weedItem.cbd}
                          </Box>
                        </Card>
                      </Flex>
                    );
                  })}
                  { () => {
                    return (
                      <Card
                        title="Hello weed"
                        cover={
                          <img
                            alt="weed"
                            style={{
                              minHeight: "200px",
                              minWidth: "195px",
                              maxHeight: "200px",
                              maxWidth: "195px",
                            }}
                          />
                        }
                        style={{
                          height: "350px",
                          width: "200px",
                          margin: "10px",
                          justifyContent: "center",
                        }}
                      >
                      </Card>
                    )
                  }}
                </Box>
              ) : (
                <Flex width="60%" justifyContent="center" mt="20%">
                  <Spin indicator={antIcon} size="large" />
                </Flex>
              )}
              <Flex
                style={{
                  width: "15%",
                  height: "500px",
                  marginTop: "25px",
                  marginLeft: "2%",
                  marginRight: "2%",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  backgroundColor: "silver",
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
              </Flex>
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
                    flexDirection: "column",
                  }}
                >
                  { first8.map((weedItem, key) => {//weed.map((weedItem, key) => {
                    return (
                      <Flex
                        key={key}
                        style={{
                          flexDirection: "row",
                          margin: "10px",
                        }}
                      >
                        <Flex
                          style={{
                            flex: "1",
                            justifyContent: "flex-start",
                          }}
                        >
                          <Card hoverable>
                            <Flex
                              style={{
                                flexDirection: "row",
                              }}
                            >
                              <Meta
                                avatar={
                                  <Avatar 
                                    src={weedItem.pictureUrl} 
                                  />
                                }
                                title={weedItem.weedName}
                                description={weedItem.company}
                                style={{
                                  margin: "10px",
                                }}
                              />
                              <Meta
                                title={
                                  <Tag
                                    color={getStrainColour(weedItem.strain)}
                                    style={{
                                      marginTop: "5px",
                                      marginBottom: "5px",
                                    }}
                                  >
                                    {weedItem.strain}
                                  </Tag>
                                }
                                description={"thc: " + weedItem.thc + " cbd:  " + weedItem.cbd}
                                style={{
                                  marginTop: "2px",
                                  marginLeft: "5px",
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
