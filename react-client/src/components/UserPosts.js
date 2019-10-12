import React, {useState, useEffect, useContext} from "react";
import SinglePost from "./SinglePost";
import Media from "react-media";
import Box from "./ui/Box";
import Flex from "./ui/Flex";
import axios from "axios";
import { UserContext } from "../context/userContext";

const UserPosts = (props) => {

        console.log(props);
    const userCtx = useContext(UserContext);
    const[{posts, loading}, setPosts] = useState({posts:[], loading: true});

    useEffect(() => {
        axios
          .get(`/post/user/${userCtx.user.id}`, {
            headers: { Authorization: `Bearer ${userCtx.token}` }
          })
          .then(res => {
              console.log(userCtx);
            console.log(userCtx.user.id);
              console.log(res.data);
              console.log(res);
            setPosts({posts: res.data, loading: false});
          })
          .catch(err => {
            console.log("YOU GOT AN ERROR NEIGHBOUR");
          });
    }, []);

    return (
        <Box>
            <Box>
                {!loading ? (posts.map((post, key)=>{
                    return(<Box key={key}>{
                        <Flex
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        >
                            <SinglePost
                            post={post}
                            addLike={addLike}
                            addComment={addComment}
                            isLiked={isLiked}
                            />
                        </Flex>
                    }</Box>)
                    })):(<Box>hello</Box>)}
            </Box>
        </Box>
    )
}

export default UserPosts;