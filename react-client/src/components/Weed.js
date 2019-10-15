import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Divider, Tag, Spin, Icon, Avatar, Pagination, Modal, Button } from "antd";
import { UserContext } from "../context/userContext";
import Box from "./ui/Box";
import Flex from "./ui/Flex";
import { getStrainColour } from "../helpers/strainColour.js";
import Media from "react-media";
import Selecters, { SelectorSmall } from "./FilterSelect";
import THC from "../components/images/default_thc_whiteback.png";
import CBD from "../components/images/default_cbd_whiteback.png";
import INDICA from "../components/images/noword_indica_transback.png";
import HYBRID from "../components/images/noword_hybrid_transback.png";
import SATIVA from "../components/images/noword_sativa_transback.png";
import { ButtonCancel } from "./ui/Button";
import SinglePost from "./SinglePost";

const antIcon = <Icon type="loading" style={{ fontSize: 70 }} spin />;

const Weeds = props => {
  const [{ weed, loading, size }, setWeed] = useState({
    weed: [],
    loading: true,
    size: 0
  });
  const [fromError, setError] = useState([]);
  const [filter, setFilter] = useState({ strain: "", type: "", company: "" });
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 30
  });
  const [avatarSRC, setAvatarSRC] = useState({src: ""});
  const [{ posts, loading2 }, setPosts] = useState({
    posts: [],
    loading2: true
  });
  const [selectedWeed, setSelectedWeed] = useState({ selectedWeed: [], selectedId: -1});
  const [visible, setVisible] = useState(false);

  const userCtx = React.useContext(UserContext);
  const { Meta } = Card;

  const strainOption = e => {
    setFilter({ ...filter, strain: e.target.value });
  };

  const typeOption = e => {
    setFilter({ ...filter, type: e.target.value });
  };

  const companyOption = e => {
    setFilter({ ...filter, company: e.target.value });
  };

  const companyOptionSmall = e => {
    setFilter({ ...filter, company: e });
  };

  const handleCancel = () => {
    setVisible(false);
    setPosts({ loading2: true })
  };

  const changeRelatedWeed = weed => {
    setSelectedWeed({ ...selectedWeed, selectedWeed: weed, selectedId: weed.id });
  };

  useEffect(() => {
    axios
      .get("/weed", {
        headers: { Authorization: `Bearer ${userCtx.token}` },
        params: {
          strain: filter.strain,
          type: filter.type,
          company: filter.company,
          page: pagination.page - 1,
          perPage: pagination.perPage
        }
      })
      .then(res => {
        setWeed({ weed: res.data.data, loading: false, size: res.data.size });
        window.scrollTo(0, 0);
      })
      .catch(error => {
        setWeed({ weed: [], loading: false, size: 0 });
        setError(error.data);
      });
  }, [filter, userCtx.token, pagination]);

  useEffect(() => {
    axios
      .get(`/api/posts/relatedWeed/${selectedWeed.selectedId}`, {
        headers: { Authorization: `Bearer ${userCtx.token}` }
      })
      .then(res => {
        setPosts({ posts: res.data, loading2: false });
        if(selectedWeed.selectedId !== -1){
          setVisible(true);
        }
      })
      .catch(err => {
        setPosts({ posts: [], loading2: false})
        console.log("errrrrorrrrr");
      });
  }, [selectedWeed]);

  return (
    <Box
      bg="#F0F0F0"
      backgroundSize="cover"
      height={loading ? "100vh" : "100%"}
    >
      <Media query={{ minWidth: 800 }}>
        {matches =>
          matches ? (
            <Box>
              <Flex
                style={{
                  justifyContent: "space-around"
                }}
              >
                <Flex
                  style={{
                    width: "19%",
                    marginTop: "25px",
                    marginLeft: "0.5%",
                    marginRight: "0.5%",
                    flexWrap: "wrap",
                    alignItems: "flex-end",
                    backgroundColor: "#F0F0F0",
                    flexDirection: "column"
                  }}
                >
                  <Flex justifyContent="flex-end" pr="80px" width="100%">
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
                </Flex>
                {!loading ? (
                  <Box
                    style={{
                      width: "60%",
                      display: "flex",
                      flexWrap: "wrap",
                      flexFlow: "row wrap",
                      justifyContent: "flex-start",
                      marginTop: "15px"
                    }}
                  >
                    {weed.map((weedItem, key) => (
                      <Flex 
                        key={key} 
                        onClick={() => changeRelatedWeed(weedItem)}
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
                              onError={
                                (e) => {
                                  e.target.onerror = null;
                                  switch(weedItem.strain){
                                    case "Indica":
                                      e.target.src = INDICA;
                                      break;
                                    case "Sativa":
                                      e.target.src = SATIVA;
                                      break;
                                    default:
                                      e.target.src = HYBRID;
                                  }
                                }
                              }
                            />
                          }
                          style={{
                            height: "450px",
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
                              marginTop: "10px",
                              marginBottom: "10px"
                            }}
                          >
                            {weedItem.strain}
                          </Tag>
                          <Box
                            style={{
                              wordWrap: "break-word"
                            }}
                          >
                            <img
                              src={THC}
                              alt="thc"
                              style={{
                                width: "50px",
                                height: "50px",
                                marginRight: "10px",
                                maginBottom: "10px"
                              }}
                            />
                            {weedItem.thc}
                          </Box>
                          <Box
                            style={{
                              wordWrap: "break-word",
                              marginTop: "10px"
                            }}
                          >
                            <img
                              src={CBD}
                              alt="cbd"
                              style={{
                                width: "50px",
                                height: "50px",
                                marginRight: "10px"
                              }}
                            />
                            {weedItem.cbd}
                          </Box>
                        </Card>
                      </Flex>
                    ))}
                    <Flex justifyContent="center" width="100%" my="20px">
                      <Pagination
                        defaultCurrent={1}
                        current={pagination.page}
                        pageSize={pagination.perPage}
                        onChange={page =>
                          setPagination({ ...pagination, page: page })
                        }
                        total={size}
                      />
                    </Flex>
                    <Flex>
                      { !loading2? (
                      <Modal
                        title="More Info"
                        visible={visible}
                        onCancel={handleCancel}
                        footer={[
                          <ButtonCancel
                            key="CancelButton"
                            onClick={handleCancel}
                            bg="transparent"
                            color="#D7D8D7"
                          >
                            Cancel
                          </ButtonCancel>
                        ]}
                      >
                        <Flex
                          flexDirection="column"
                          justifyContent="center"
                        >
                          <Flex>
                          Weed info
                          </Flex>

                          <Flex
                            flexDirection="column"
                            justifyContent="center"
                          >
                            {console.log(posts)}
                            { posts.length > 0 ? (
                              posts.map((post, key) => {
                              return (
                                <Box key={key}>
                                  <Flex
                                    flexDirection="row"
                                    justifyContent="center"
                                    alignItems="center"
                                  >
                                    <SinglePost
                                      post={post}
                                      //addLike={addLike}
                                      //addComment={addComment}
                                    />
                                  </Flex>
                                  <Flex justifyContent="center" alignItems="center">
                                    <Box width="90%">
                                      <Divider style={{ margin: "10px" }} />
                                    </Box>
                                  </Flex>
                                </Box>
                              );
                            })
                            ) : (
                              <Flex>
                                No posts available
                              </Flex>
                            )
                            }
                          </Flex>
                        </Flex>
                      </Modal>
                      ) : (
                        <Flex width="60%" justifyContent="center" mt="20%">
                          <Spin indicator={antIcon} size="large" />
                        </Flex>
                      )}
                    </Flex>
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
            </Box>
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
                    <h2>Filters</h2>
                    <SelectorSmall
                      company={filter.company}
                      companyOption={companyOptionSmall}
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
                      const x = () => {setAvatarSRC(weedItem.pictureUrl);};
                      return (
                        <Flex key={key} flexDirection="row" my="10px">
                          <Card style={{ width: "100%" }}>
                            <Flex
                              style={{
                                flexDirection: "row"
                              }}
                            >
                              <Meta
                                avatar={
                                  <img
                                    alt="weed"
                                    style={{
                                      minHeight: "50px",
                                      minWidth: "50px",
                                      maxHeight: "50px",
                                      maxWidth: "50px"
                                    }}
                                    src={weedItem.pictureUrl}
                                    onError={
                                      (e) => {
                                        e.target.onerror = null;
                                        switch(weedItem.strain){
                                          case "Indica":
                                            e.target.src = INDICA;
                                            break;
                                          case "Sativa":
                                            e.target.src = SATIVA;
                                            break;
                                          default:
                                            e.target.src = HYBRID;
                                        }
                                      }
                                    }
                                  />
                                }
                                title={weedItem.weedName}
                                description={weedItem.company}
                                style={{
                                  margin: "10px"
                                }}
                              />
                              <Flex
                                style={{
                                  flexDirection: "column",
                                  alignItems: "flex-start"
                                }}
                              >
                                <Tag
                                  color={getStrainColour(weedItem.strain)}
                                  style={{
                                    marginTop: "5px",
                                    marginBottom: "5px"
                                  }}
                                >
                                  {weedItem.strain}
                                </Tag>
                                <Flex
                                  style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center"
                                  }}
                                >
                                  <img
                                    src={THC}
                                    alt="thc"
                                    style={{
                                      width: "20px",
                                      height: "20px",
                                      marginRight: "5px"
                                    }}
                                  />
                                  {weedItem.thc}
                                  <img
                                    src={CBD}
                                    alt="cbd"
                                    style={{
                                      width: "20px",
                                      height: "20px",
                                      marginRight: "5px",
                                      marginLeft: "5px"
                                    }}
                                  />
                                  {weedItem.cbd}
                                </Flex>
                              </Flex>
                            </Flex>
                          </Card>
                        </Flex>
                      );
                    })}
                  </Flex>
                  <Flex justifyContent="center" width="100%" my="20px">
                    <Pagination
                      defaultCurrent={0}
                      current={pagination.page}
                      pageSize={pagination.perPage}
                      onChange={page =>
                        setPagination({ ...pagination, page: page })
                      }
                      total={size}
                    />
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
