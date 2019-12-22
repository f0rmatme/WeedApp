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
import colours from "./colours";

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
    outline: "none",
    padding: "10px",
    backgroundColor: colours.nav,
    borderRadius: "3px",
    marginRight: "5px"
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
      backgroundColor: colours.navSel,
      transition: "background .5s"
    })
  })
);

export const ButtonPost = styled(animated.button)(
  {
    outline: "none",
    padding: "10px",
    marginRight: "15px",
    marginTop: "20px",
    backgroundColor: colours.btnPrimary,
    color: "white",
    border: "none",
    borderRadius: "3px",
    letterSpacing: ".02em",
    fontSize: "14px"
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
    ":hover": css({ cursor: "pointer", backgroundColor: colours.navSel })
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
    padding: "3px",
    backgroundColor: " #0C1109",
    color: "#9DA077",
    width: "40px",
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
      color: colours.react,
      border: `1px solid ${colours.react}`
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
