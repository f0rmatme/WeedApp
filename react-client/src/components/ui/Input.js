import styled from "@emotion/styled";

import TextareaAutosize from "react-autosize-textarea";

import {
  typography,
  space,
  color,
  layout,
  border,
  background,
  position,
  shadow,
  flexbox
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
  position,
  background,
  shadow,
  flexbox
);

export const InputComment = styled(TextareaAutosize)(
  {
    outline: "none",
    borderRadius: "20px",
    border: "1px solid #D7D7D7",
    width: "100%"
  },
  typography,
  space,
  color,
  layout,
  border,
  background,
  position,
  background,
  shadow,
  flexbox
);

export default Input;
