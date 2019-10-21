import React from 'react';
import { Card, Tag } from "antd";
import Box from "./ui/Box";
import Flex from "./ui/Flex";
import { getStrainColour } from "../helpers/strainColour.js";
import THC from "../components/images/default_thc_whiteback.png";
import CBD from "../components/images/default_cbd_whiteback.png";
import INDICA from "../components/images/noword_indica_transback.png";
import HYBRID from "../components/images/noword_hybrid_transback.png";
import SATIVA from "../components/images/noword_sativa_transback.png";

const SingleWeed = props => {
    const weedItem = props.weedItem;
    const { Meta } = Card;

    return (
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
    );
};

export const SingleWeedSmall = props => {
    const weedItem = props.weedItem;
    const { Meta } = Card;

    return (
        <Card
            hoverable
            style={{ width: "100%" }}
        >
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
    );
};

export default SingleWeed;