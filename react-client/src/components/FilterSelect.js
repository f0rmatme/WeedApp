import React from "react";
import { Radio } from "antd";
import Box from "./ui/Box";
import Flex from "./ui/Flex";

const radioStyle = {
  marginTop: "2px",
  wordBreak: "break-all"
};

const Selectors = props => {
  return (
    <Flex
      style={{
        flexDirection: "column",
        justifyContent: "center"
      }}
    >
      <Radio.Group
        onChange={props.strainOption}
        defaultValue={props.strain}
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
        onChange={props.typeOption}
        value={props.type}
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
        onChange={props.companyOption}
        value={props.company}
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
          <Radio.Button style={radioStyle} value={"Delta 9 Cannabis"}>
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
  );
};

export const SelectorSmall = props => {
  return (
    <Box>
      <Radio.Group
        onChange={props.strainOption}
        defaultValue={props.strain}
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
        onChange={props.typeOption}
        value={props.type}
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
        onChange={props.companyOption}
        value={props.company}
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
          <Radio.Button style={radioStyle} value={"Color Cannabis"}>
            Color Cannabis
          </Radio.Button>
          <Radio.Button style={radioStyle} value={"Delta 9 Cannabis"}>
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
    </Box>
  );
};

export default Selectors;
