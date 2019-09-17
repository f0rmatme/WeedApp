import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Tag, Spin, Icon, Avatar } from "antd";
import { UserContext } from "../context/userContext";
import Box from "./ui/Box";
import Flex from "./ui/Flex";
import { getStrainColour } from "../helpers/strainColour.js";
import Media from "react-media";
import Selecters, { SelectorSmall } from "./FilterSelect";

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

  const strainOption = e => {
    setFilter({ strain: e.target.value });
  };

  const typeOption = e => {
    setFilter({ ...filter, type: e.target.value });
  };

  const companyOption = e => {
    setFilter({ ...filter, company: e.target.value });
  };

  useEffect(() => {
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
  }, [filter, userCtx.token]);

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
                <Selecters
                  company={filter.company}
                  companyOption={companyOption}
                  type={filter.type}
                  typeOption={typeOption}
                  strain={filter.strain}
                  strainOption={strainOption}
                />
                }
              </Flex>
              {!loading ? (
                <Box
                  style={{
                    width: "60%",
                    display: "flex",
                    flexWrap: "wrap",
                    flexFlow: "row wrap",
<<<<<<< HEAD
                    justifyContent: "flex-start",
                    marginTop: "15px",
=======
                    justifyContent: "space-around",
                    marginTop: "15px"
>>>>>>> 8000cb087f417d591810888c2adc0b17efe7aee5
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
                  backgroundColor: "f5f2e8"
                }}
              ></Flex>
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
                    <SelectorSmall
                      company={filter.company}
                      companyOption={companyOption}
                      type={filter.type}
                      typeOption={typeOption}
                      strain={filter.strain}
                      strainOption={strainOption}
                    />
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
