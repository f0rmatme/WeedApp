import React, { useEffect, useState } from "react";
import Flex from "./ui/Flex";

const [{ posts, loading }, setPosts] = useState({
    posts: [],
    loading: true
});

useEffect(() => {
    axios
      .get(`/api/posts/relatedWeed/${userCtx.user.id}`, {
        headers: { Authorization: `Bearer ${props.at}` }
      })
      .then(res => {
        setPosts({ posts: res.data, loading: false });
      })
      .catch(err => {
        console.log("YOU GOT AN ERROR NEIGHBOUR");
      });
  }, []);

const RelatedPostWeed = () => {
    

};

export default RelatedPostWeed;