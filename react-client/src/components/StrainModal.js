import React from "react";
import Flex from "./ui/Flex";
import { Modal, Button } from "antd";

const StrainModal = props => {
  return (
    <Modal
      visible={props.visible}
      onCancel={props.handleCancel}
      width="60%"
      footer={[
        <Button onClick={props.handleOk}>
          Return
        </Button>
      ]}
    >
      <Flex
        flexDirection="row"
        justifyContent="space-around"
      >
        <Flex 
          wordWrap="wrap"
          width="30%"
          flexDirection="column"
        >
          <h3>indica</h3>
          The Indica strain generally gives more of a relaxing high. It can make you drowsy, making it easier to fall asleep.
        </Flex>
        <Flex 
          wordWrap="wrap"
          width="30%"
          flexDirection="column"
        >
          <h3>hybrid</h3>
          Hybrid strains are a combination of both Sativa and Indica. They can offer a balance between the two.
        </Flex>
        <Flex 
          wordWrap="wrap"
          width="30%"
          flexDirection="column"
        >
          <h3>sativa</h3>
          The Sativa strain is more of an invigorating high. It can make you more awake, making it better for social situations.
        </Flex>
      </Flex>
    </Modal>
  );
};

export default StrainModal;