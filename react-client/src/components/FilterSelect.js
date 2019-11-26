import React, { useState } from "react";
import { Radio, Select, Icon } from "antd";
import Flex from "./ui/Flex";
import TypeModal from "../components/TypeModal.js";
import StrainModal from "../components/StrainModal.js";

const radioStyle = {
  marginTop: "2px",
  wordBreak: "break-all"
};

const { Option } = Select;

const Selectors = props => {
  const [visibleType, setVisibleType] = useState(false);
  const [visibleStrain, setVisibleStrain] = useState(false);

  const handleOkType = () => {
    setVisibleType(false);
  };

  const handleOkStrain = () => {
    setVisibleStrain(false);
  };

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
          <Flex flexDirection="row" justifyContent="space-between">
            <h3>Strain</h3>
            <Icon
              type="question-circle"
              style={{ marginTop: "5px" }}
              onClick={() => setVisibleStrain(true)}
            />
            <StrainModal
              visible={visibleStrain}
              handleOk={handleOkStrain}
              handleCancel={handleOkStrain}
            />
          </Flex>
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
          <Flex flexDirection="row" justifyContent="space-between">
            <h3>Type</h3>
            <Icon
              type="question-circle"
              style={{ marginTop: "5px" }}
              onClick={() => setVisibleType(true)}
            />
            <TypeModal
              visible={visibleType}
              handleOk={handleOkType}
              handleCancel={handleOkType}
            />
          </Flex>
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
  const [visibleType, setVisibleType] = useState(false);
  const [visibleStrain, setVisibleStrain] = useState(false);

  const handleOkType = () => {
    setVisibleType(false);
  };

  const handleOkStrain = () => {
    setVisibleStrain(false);
  };

  return (
    <Flex
      style={{
        flexDirection: "column",
        flexWrap: "nowrap",
        alignItems: "center"
      }}
    >
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
          <Icon
            type="question-circle"
            style={{ margin: "10px" }}
            onClick={() => setVisibleStrain(true)}
          />
          <StrainModal
            visible={visibleStrain}
            handleOk={handleOkStrain}
            handleCancel={handleOkStrain}
          />
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
          <Icon
            type="question-circle"
            style={{ margin: "10px" }}
            onClick={() => setVisibleType(true)}
          />
          <TypeModal
            visible={visibleType}
            handleOk={handleOkType}
            handleCancel={handleOkType}
          />
        </Flex>
      </Radio.Group>
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
        <Select
          defaultValue={props.company}
          showSearch
          style={{
            width: "200px"
          }}
          onSelect={props.companyOption}
        >
          <Option style={radioStyle} value={""}>
            All
          </Option>
          <Option style={radioStyle} value={"Aurora"}>
            Aurora
          </Option>
          <Option style={radioStyle} value={"Canna Farms"}>
            Canna Farms
          </Option>
          <Option style={radioStyle} value={"Color Cannabis"}>
            Color Cannabis
          </Option>
          <Option style={radioStyle} value={"Delta 9 Cannabis"}>
            Delta 9 Cannabis
          </Option>
          <Option style={radioStyle} value={"Doja"}>
            Doja
          </Option>
          <Option style={radioStyle} value={"DNA Genetics"}>
            DNA Genetics
          </Option>
          <Option style={radioStyle} value={"High Tide"}>
            High Tide
          </Option>
          <Option style={radioStyle} value={"LBS"}>
            LBS
          </Option>
          <Option style={radioStyle} value={"Namaste"}>
            Namaste
          </Option>
          <Option style={radioStyle} value={"Royal High"}>
            Royal High
          </Option>
          <Option style={radioStyle} value={"Tokyo Smoke"}>
            Tokyo Smoke
          </Option>
          <Option style={radioStyle} value={"Tweed Inc."}>
            Tweed
          </Option>
          <Option style={radioStyle} value={"Up Cannabis"}>
            Up Cannabis
          </Option>
          <Option style={radioStyle} value={"Vertical"}>
            Vertical
          </Option>
          <Option style={radioStyle} value={"Zenabis"}>
            Zenabis
          </Option>
        </Select>
      </Flex>
    </Flex>
  );
};

export default Selectors;
