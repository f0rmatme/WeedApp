import styled from "@emotion/styled";
import {
  typography,
  space,
  color,
  layout,
  flexbox,
  border
} from "styled-system";

const Flex = styled("div")(
  {
    display: "flex"
  },
  typography,
  space,
  color,
  layout,
  flexbox,
  border
);

export default Flex;