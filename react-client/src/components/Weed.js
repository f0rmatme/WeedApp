import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spin, Icon, Pagination} from "antd";
import { UserContext } from "../context/userContext";
import Box from "./ui/Box";
import Flex from "./ui/Flex";
import Media from "react-media";
import Selecters, { SelectorSmall } from "./FilterSelect";
import RelatedWeedPosts from "../components/RelatedWeedPosts.js";
import SingleWeed, { SingleWeedSmall } from "../components/SingleWeed.js";

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
  const [{ posts, loading2 }, setPosts] = useState({
    posts: [],
    loading2: true
  });
  const [selectedWeed, setSelectedWeed] = useState({ selectedWeed: -1});
  const [visible, setVisible] = useState(false);

  const userCtx = React.useContext(UserContext);

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
      .get(`/api/posts/relatedWeed/${selectedWeed.selectedWeed}`, {
        headers: { Authorization: `Bearer ${userCtx.token}` }
      })
      .then(res => {
        setPosts({ posts: res.data, loading2: false });
        if(selectedWeed.selectedWeed !== -1){
          setVisible(true);
        };
        console.log(selectedWeed);
      })
      .catch(err => {
        setPosts({ posts: [], loading2: false});
        setError(err);
        console.log(fromError.data);
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
                        onClick={() => setSelectedWeed({ ...selectedWeed, selectedWeed: weedItem.id })}
                      >
                        <SingleWeed
                          weedItem={weedItem}
                        />
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
                        <RelatedWeedPosts
                          selectedWeed={selectedWeed}
                          posts={posts}
                          visible={visible}
                          handleCancel={handleCancel}
                        />
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
                      return (
                        <Flex 
                          key={key} 
                          flexDirection="row" 
                          my="10px"
                          onClick={() => setSelectedWeed({ ...selectedWeed, selectedWeed: weedItem.id })}
                        >
                          <SingleWeedSmall
                            weedItem={weedItem}
                          />
                        </Flex>
                      );
                    })}
                    <RelatedWeedPosts
                      selectedWeed={selectedWeed}
                      posts={posts}
                      visible={visible}
                      handleCancel={handleCancel}
                    />
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
