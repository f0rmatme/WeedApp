import React from "react";
import Flex from "./ui/Flex";
import { Modal, Button } from "antd";

const TypeModal = props => {
  return (
    <Modal
      visible={props.visible}
      onCancel={props.handleCancel}
      width="50%"
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
          width="40%"
          flexDirection="column"
        >
          <h3>THC</h3>
          THC is one of the main components in cannabis and can alter brain function. It's effects are often described as euphoric and relaxing. The higher the percentage, the stronger the effects. Products with high THC and low CBD can produce stronger psychoactive effects.
        </Flex>
        <Flex 
          wordWrap="wrap"
          width="40%"
          flexDirection="column"
        >
          <h3>CBD</h3>
          CBD is another component of cannabis. It can create more of a body high, reducing stress and contributing to pain relief. Products with high CBD and low THC can produce more intense body highs. When a product has similar THC and CBD, the CBD levels can reduce the psychoactive effects of the THC.
        </Flex>
      </Flex>
    </Modal>
  );
};

export default TypeModal;
