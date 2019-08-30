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

const Button = styled("button")(
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

export default Button;
