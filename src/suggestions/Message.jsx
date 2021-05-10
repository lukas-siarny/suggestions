import React from "react";
import styled, { css } from "styled-components";
import { ThemeContext } from "../Theme";
import { transparentize } from "polished";

const MessageElement = styled.div`
  width: 100%;
  padding: 2rem;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${({ theme, type }) =>
    type === "error" &&
    css`
      color: ${theme.colorError};
      background: ${transparentize(0.8, theme.colorError)};
    `}

  ${({ theme, type }) =>
    type === "success" &&
    css`
      color: ${theme.colorSuccess};
      background: ${transparentize(0.8, theme.colorSuccess)};
    `}

  & > *:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const Message = ({ type, children }) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <MessageElement theme={theme} type={type}>
      {children}
    </MessageElement>
  );
};

export default Message;
