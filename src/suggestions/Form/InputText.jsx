import React from "react";
import styled from "styled-components";
import { ThemeContext } from "../../Theme";
import { THEME_TRANSITION } from "../../config";

const InputWrapper = styled.div`
  position: relative;
  margin: 1.5rem 0;

  & input {
    width: 100%;
    height: 2rem;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 2px solid ${({ theme }) => theme.colorAccent};
    z-index: 3;
    padding-left: 0.5rem;
    outline: none;
    position: relative;
    background: transparent;
    font-family: ${({ theme }) => theme.fontFamily};
    color: ${({ theme }) => theme.fontColor};
    transition: ${THEME_TRANSITION};
    transition-property: color;
    font-size: 0.875rem;
    position: relative;
    transition: border 150ms ease-in;

    &:hover,
    &:focus,
    &:active {
      border-bottom-color: ${({ theme }) => theme.colorAccentDark};
    }
  }

  & label {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    color: ${({ theme }) => theme.fontColorLight};
    transition: 250ms ease-in-out;
    transform: ${({ labelTransition }) =>
      labelTransition ? "translateY(-1.5rem)" : "translateY(0)"};
    font-size: ${({ labelTransition }) =>
      labelTransition ? "0.75rem" : "0.875rem"};
    text-transform: uppercase;
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

const TextInput = ({ value, onValueChange, label, errorMsg }) => {
  const [labelTransition, setLabelTransition] = React.useState(false);
  const { theme } = React.useContext(ThemeContext);

  return (
    <InputWrapper labelTransition={labelTransition} theme={theme}>
      <input
        type="text"
        name="input"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        onFocus={() => setLabelTransition(true)}
        onBlur={() => {
          if (!value) {
            setLabelTransition(false);
          }
        }}
      />
      <label htmlFor="input">{label}</label>
      <Error theme={theme} errorMsg={errorMsg}>
        {errorMsg}
      </Error>
    </InputWrapper>
  );
};

export default TextInput;
