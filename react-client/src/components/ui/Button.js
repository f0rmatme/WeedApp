import styled from "@emotion/styled";
import { css } from "@emotion/core";
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
  position,
  css({
    ":hover": css({ cursor: "pointer", backgroundColor: "rgba(0,180,0,0.1)" })
  })
);

export default Button;
