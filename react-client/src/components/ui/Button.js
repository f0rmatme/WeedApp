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
import { animated } from "react-spring";

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
    ":hover": css({ cursor: "pointer", backgroundColor: "#181818" })
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

export const ButtonPost = styled(animated.button)(
  {
    position: "fixed",
    outline: "none",
    bottom: "0",
    right: "0",
    margin: "25px",
    padding: "10px 15px 10px 15px",
    backgroundColor: " #9DA077",
    color: "white",
    border: "none",
    borderRadius: "3px",
    fontWeight: "bold"
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
    ":hover": css({ cursor: "pointer", backgroundColor: "#B0B392" })
  })
);

export const ButtonSubmit = styled("button")(
  {
    outline: "none",
    padding: "5px 25px 5px 25px",
    backgroundColor: " #9DA077",
    color: "white",
    border: "none",
    borderRadius: "3px"
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
    ":hover": css({ cursor: "pointer", backgroundColor: "#B0B392" })
  })
);

export const ButtonCancel = styled("button")(
  {
    outline: "none",
    padding: "5px 15px 5px 15px",
    backgroundColor: " #0C1109",
    color: "#9DA077",
    border: "1px solid #D7D8D7",
    borderRadius: "3px"
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
    ":hover": css({
      cursor: "pointer",
      color: "#0C1109",
      border: "1px solid #0C1109"
    })
  })
);

export const ButtonLike = styled("button")(
  {
    outline: "none",
    padding: "6px",
    backgroundColor: " #0C1109",
    color: "#9DA077",
    width: "50px",
    border: "1px solid #D7D8D7",
    borderRadius: "3px"
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
    ":hover": css({
      cursor: "pointer",
      color: "rgb(110, 51, 95)",
      border: "1px solid rgb(110, 51, 95)"
    })
  })
);

export const ButtonSelector = styled("button")(
  {
    outline: "none",
    margin: "10px",
    padding: "10px 15px 10px 15px",
    color: "#9DA077",
    background: "transparent",
    border: "1px solid",
    borderRadius: "3px",
    fontWeight: "bold"
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
    ":hover": css({ cursor: "pointer" })
  })
);

export default Button;
