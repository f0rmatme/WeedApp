import styled from "@emotion/styled";
import {
  typography,
  space,
  color,
  layout,
  border,
  background,
  position
} from "styled-system";

const Input = styled("input")(
  {
    outline: "none"
  },
  typography,
  space,
  color,
  layout,
  border,
  background,
  position
);

export default Input;
