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
          <h3>thc</h3>
          Thc is one of the main components in cannabis and can alter brain function. It's effects are often described as euphoric and relaxing. The higher the percentage, the stronger the effects. Products with high thc and low cbd can produce stronger psychoactive effects.
        </Flex>
        <Flex 
          wordWrap="wrap"
          width="40%"
          flexDirection="column"
        >
          <h3>cbd</h3>
          Cbd is another component of cannabis. It can create more of a body high, reducing stress and contributing to pain relief. Products with high cbd and low thc can produce more intense body highs. When a product has similar thc and cbd, the cbd levels can reduce the psychoactive effects of the thc.
        </Flex>
      </Flex>
    </Modal>
  );
};

export default TypeModal;