import styled from "@emotion/styled";
import { css } from "@emotion/core";
import {
  typography,
  space,
  color,
  layout,
  border,
  background,
  position,
  flexbox
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
  flexbox,
  css({
    ":hover": css({ cursor: "pointer", backgroundColor: "rgba(0,180,0,0.1)" })
  })
);

export const ButtonNav = styled("button")(
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
  flexbox,
  css({
    ":hover": css({ cursor: "pointer", color: "rgb(110, 51, 95)" })
  })
);

export default Button;
