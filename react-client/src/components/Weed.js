import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Tag, Spin, Icon, Avatar, Radio } from "antd";
import { UserContext } from "../context/userContext";
import Box from "./ui/Box";
import Flex from "./ui/Flex";
import { getStrainColour } from "../helpers/strainColour.js";
import Media from "react-media";

const antIcon = <Icon type="loading" style={{ fontSize: 70 }} spin />;

const Weeds = () => {
  const [{ weed, loading }, setWeed] = useState({ weed: [], loading: true });
  const [fromError, setError] = useState([]);
  const { Meta } = Card;
  const [filter, setFilter] = useState({ strain: "", type: "", company: "" });
  //const [page, setPage] = useState({page: 0});
  const page = 0;
  const perPage = 30;

  const userCtx = React.useContext(UserContext);

  useEffect(() => {
    fetchWeed();
  }, [filter]);

  const strainOption = e => {
    setFilter({ strain: e.target.value });
  };

  const typeOption = e => {
    setFilter({ ...filter, type: e.target.value });
  };

  const companyOption = e => {
    setFilter({ ...filter, company: e.target.value });
  };

  const fetchWeed = () => {
    axios
      .get("http://localhost:3000/weed", {
        headers: { Authorization: `Bearer ${userCtx.token}` },
        params: {
          strain: filter.strain,
          type: filter.type,
          company: filter.company,
          page: page,
          perPage: perPage
        }
      })
      .then(res => {
        setWeed({ weed: res.data, loading: false });
      })
      .catch(error => {
        setWeed({ weed: [], loading: false });
        setError(error.data);
      });
  };

  const radioStyle = {
    marginTop: "2px",
    wordBreak: "break-all"
  };

  return (
    <Box
      bg="#f5f2e8"
      backgroundSize="cover"
      height={loading ? "100vh" : "100%"}
    >
      <Media query={{ minWidth: 800 }}>
        {matches =>
          matches ? (
            <Flex
              style={{
                justifyContent: "space-around"
              }}
            >
              <Flex
                style={{
                  width: "19%",
                  //height: "500px",
                  marginTop: "25px",
                  marginLeft: "0.5%",
                  marginRight: "0.5%",
                  flexWrap: "wrap",
                  //justifyContent: "center",
                  alignItems: "flex-end",
                  backgroundColor: "#f5f2e8",
                  flexDirection: "column"
                }}
              >
                <Flex
                  style={{
                    justifyContent: "center",
                    margin: "5px"
                  }}
                >
                  <h2>Filters</h2>
                </Flex>
                <Flex
                  style={{
                    flexDirection: "column",
                    justifyContent: "center"
                  }}
                >
                  <Radio.Group
                    onChange={strainOption}
                    defaultValue={filter.strain}
                    buttonStyle={"solid"}
                  >
                    <Flex
                      style={{
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        marginTop: "5px"
                      }}
                    >
                      <h3>Strain</h3>
                      <Radio.Button style={radioStyle} value={""}>
                        All
                      </Radio.Button>
                      <Radio.Button style={radioStyle} value={"indica"}>
                        Indica
                      </Radio.Button>
                      <Radio.Button style={radioStyle} value={"sativa"}>
                        Sativa
                      </Radio.Button>
                      <Radio.Button style={radioStyle} value={"hybrid"}>
                        Hybrid
                      </Radio.Button>
                    </Flex>
                  </Radio.Group>
                  <Radio.Group
                    onChange={typeOption}
                    value={filter.type}
                    buttonStyle={"solid"}
                  >
                    <Flex
                      style={{
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        marginTop: "5px"
                      }}
                    >
                      <h3>Type</h3>
                      <Radio.Button style={radioStyle} value={""}>
                        All
                      </Radio.Button>
                      <Radio.Button style={radioStyle} value={"cbd"}>
                        CBD Dominant
                      </Radio.Button>
                      <Radio.Button style={radioStyle} value={"thc"}>
                        THC Dominant
                      </Radio.Button>
                    </Flex>
                  </Radio.Group>
                  <Radio.Group
                    onChange={companyOption}
                    value={filter.company}
                    buttonStyle={"solid"}
                  >
                    <Flex
                      style={{
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        marginTop: "5px"
                      }}
                    >
                      <h3>Company</h3>
                      <Radio.Button style={radioStyle} value={""}>
                        All
                      </Radio.Button>
                      <Radio.Button style={radioStyle} value={"Aurora"}>
                        Aurora
                      </Radio.Button>
                      <Radio.Button style={radioStyle} value={"Canna Farms"}>
                        Canna Farms
                      </Radio.Button>
                      <Radio.Button style={radioStyle} value={"Color Cannabis"}>
                        Color Cannabis
                      </Radio.Button>
                      <Radio.Button
                        style={radioStyle}
                        value={"Delta 9 Cannabis"}
                      >
                        Delta 9 Cannabis
                      </Radio.Button>
                      <Radio.Button style={radioStyle} value={"Doja"}>
                        Doja
                      </Radio.Button>
                      <Radio.Button style={radioStyle} value={"DNA Genetics"}>
                        DNA Genetics
                      </Radio.Button>
                      <Radio.Button style={radioStyle} value={"High Tide"}>
                        High Tide
                      </Radio.Button>
                      <Radio.Button style={radioStyle} value={"LBS"}>
                        LBS
                      </Radio.Button>
                      <Radio.Button style={radioStyle} value={"Namaste"}>
                        Namaste
                      </Radio.Button>
                      <Radio.Button style={radioStyle} value={"Royal High"}>
                        Royal High
                      </Radio.Button>
                      <Radio.Button style={radioStyle} value={"Tokyo Smoke"}>
                        Tokyo Smoke
                      </Radio.Button>
                      <Radio.Button style={radioStyle} value={"Tweed Inc."}>
                        Tweed
                      </Radio.Button>
                      <Radio.Button style={radioStyle} value={"Up Cannabis"}>
                        Up Cannabis
                      </Radio.Button>
                      <Radio.Button style={radioStyle} value={"Vertical"}>
                        Vertical
                      </Radio.Button>
                      <Radio.Button style={radioStyle} value={"Zenabis"}>
                        Zenabis
                      </Radio.Button>
                    </Flex>
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
                    marginTop: "15px"
                  }}
                >
                  {weed.map((weedItem, key) => (
                    <Flex
                      key={key}
                      style={
                        {
                          //flexBasis:
                        }
                      }
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
                  ))}
                  {/* { () => {
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
                  }} */}
                </Box>
              ) : (
                <Flex width="60%" justifyContent="center" mt="20%">
                  <Spin indicator={antIcon} size="large" />
                </Flex>
              )}
              <Flex
                style={{
                  width: "19%",
                  height: "500px",
                  marginTop: "25px",
                  marginLeft: "0.5%",
                  marginRight: "0.5%",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  backgroundColor: "silver"
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
                <Flex
                  style={{
                    flexDirection: "column"
                  }}
                >
                  <Flex
                    style={{
                      width: "100%",
                      flexWrap: "wrap",
                      alignItems: "center",
                      marginTop: "15px",
                      marginBottom: "15px",
                      flexDirection: "column"
                    }}
                  >
                    <h2>Filter</h2>
                    <Radio.Group
                      onChange={strainOption}
                      defaultValue={filter.strain}
                      buttonStyle={"solid"}
                    >
                      <Flex
                        style={{
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          marginTop: "5px"
                        }}
                      >
                        <h3
                          style={{
                            margin: "6px"
                          }}
                        >
                          Strain
                        </h3>
                        <Radio.Button style={radioStyle} value={""}>
                          All
                        </Radio.Button>
                        <Radio.Button style={radioStyle} value={"indica"}>
                          Indica
                        </Radio.Button>
                        <Radio.Button style={radioStyle} value={"sativa"}>
                          Sativa
                        </Radio.Button>
                        <Radio.Button style={radioStyle} value={"hybrid"}>
                          Hybrid
                        </Radio.Button>
                      </Flex>
                    </Radio.Group>
                    <Radio.Group
                      onChange={typeOption}
                      value={filter.type}
                      buttonStyle={"solid"}
                    >
                      <Flex
                        style={{
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          marginTop: "5px"
                        }}
                      >
                        <h3
                          style={{
                            margin: "6px"
                          }}
                        >
                          Type
                        </h3>
                        <Radio.Button style={radioStyle} value={""}>
                          All
                        </Radio.Button>
                        <Radio.Button style={radioStyle} value={"cbd"}>
                          CBD Dominant
                        </Radio.Button>
                        <Radio.Button style={radioStyle} value={"thc"}>
                          THC Dominant
                        </Radio.Button>
                      </Flex>
                    </Radio.Group>
                    <Radio.Group
                      onChange={companyOption}
                      value={filter.company}
                      buttonStyle={"solid"}
                    >
                      <Flex
                        style={{
                          flexDirection: "row",
                          flexWrap: "wrap",
                          justifyContent: "center",
                          marginTop: "5px"
                        }}
                      >
                        <h3
                          style={{
                            margin: "6px"
                          }}
                        >
                          Company
                        </h3>
                        <Radio.Button style={radioStyle} value={""}>
                          All
                        </Radio.Button>
                        <Radio.Button style={radioStyle} value={"Aurora"}>
                          Aurora
                        </Radio.Button>
                        <Radio.Button style={radioStyle} value={"Canna Farms"}>
                          Canna Farms
                        </Radio.Button>
                        <Radio.Button
                          style={radioStyle}
                          value={"Color Cannabis"}
                        >
                          Color Cannabis
                        </Radio.Button>
                        <Radio.Button
                          style={radioStyle}
                          value={"Delta 9 Cannabis"}
                        >
                          Delta 9 Cannabis
                        </Radio.Button>
                        <Radio.Button style={radioStyle} value={"Doja"}>
                          Doja
                        </Radio.Button>
                        <Radio.Button style={radioStyle} value={"DNA Genetics"}>
                          DNA Genetics
                        </Radio.Button>
                        <Radio.Button style={radioStyle} value={"High Tide"}>
                          High Tide
                        </Radio.Button>
                        <Radio.Button style={radioStyle} value={"LBS"}>
                          LBS
                        </Radio.Button>
                        <Radio.Button style={radioStyle} value={"Namaste"}>
                          Namaste
                        </Radio.Button>
                        <Radio.Button style={radioStyle} value={"Royal High"}>
                          Royal High
                        </Radio.Button>
                        <Radio.Button style={radioStyle} value={"Tokyo Smoke"}>
                          Tokyo Smoke
                        </Radio.Button>
                        <Radio.Button style={radioStyle} value={"Tweed Inc."}>
                          Tweed
                        </Radio.Button>
                        <Radio.Button style={radioStyle} value={"Up Cannabis"}>
                          Up Cannabis
                        </Radio.Button>
                        <Radio.Button style={radioStyle} value={"Vertical"}>
                          Vertical
                        </Radio.Button>
                        <Radio.Button style={radioStyle} value={"Zenabis"}>
                          Zenabis
                        </Radio.Button>
                      </Flex>
                    </Radio.Group>
                  </Flex>
                  <Flex
                    style={{
                      width: "100%",
                      flexWrap: "wrap",
                      alignItems: "center",
                      marginTop: "15px",
                      flexDirection: "column"
                    }}
                  >
                    {weed.map((weedItem, key) => {
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
                  </Flex>
                </Flex>
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
