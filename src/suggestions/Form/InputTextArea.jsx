import React from "react";
import styled from "styled-components";
import { ThemeContext } from "../../Theme";

const InputWrapper = styled.div`
  position: relative;
  margin: 2.5rem 0;

  & textarea {
    resize: vertical;
    width: 100%;
    height: 200px;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 2px solid ${({ theme }) => theme.colorAccent};
    padding: 0.5rem;
    outline: none;
    position: relative;
    background: #ffffff;
    font-family: ${({ theme }) => theme.fontFamily};
    color: #333;
    font-size: 0.875rem;
    transition: border 150ms ease-in-out;

    &::placeholder {
      color: ${({ theme }) => theme.fontColorLight};
      font-size: 0.875rem;
      text-transform: uppercase;
    }

    &:hover,
    &:focus,
    &:active {
      border-bottom-color: ${({ theme }) => theme.colorAccentDark};
    }
  }
`;

const Error = styled.span`
  position: absolute;
  width: 100%;
  margin-top: 0.25rem;
  left: 0.5rem;
  top: 100%;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colorError};
  transform-origin: top;
  transform: ${({ errorMsg }) => (errorMsg ? "scale(1, 1)" : "scale(1, 0)")};
  opacity: ${({ errorMsg }) => (errorMsg ? "1" : "0")};
  transition: opacity 150ms ease-in-out, transform 150ms ease-in-out;
`;

const Textarea = ({ value, onValueChange, errorMsg }) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <InputWrapper theme={theme}>
      <textarea
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        placeholder="Podnet..."
      />
      <Error theme={theme} errorMsg={errorMsg}>
        {errorMsg}
      </Error>
    </InputWrapper>
  );
};

export default Textarea;
