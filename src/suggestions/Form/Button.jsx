import React from "react";
import styled from "styled-components";
import { ThemeContext } from "../../Theme";

const InputWrapper = styled.div`
  position: relative;
  width: ${({ width }) => (width ? width : "auto")};

  & button {
    padding: 1rem 2rem;
    display: flex;
    justify-content: center;
    width: ${({ width }) => (width ? width : "auto")};
    background: ${({ theme }) => theme.colorAccent};
    border: none;
    outline: none;
    position: relative;
    font-family: ${({ theme }) => theme.fontFamily};
    color: ${({ theme }) => theme.fontColor};
    font-size: 0.875rem;
    position: relative;
    border-radius: 4px;
    cursor: pointer;
    text-transform: uppercase;
    color: #fff;
    transition: background 150ms ease-in-out;
    font-size: 1rem;
    opacity: ${({ disabled }) => (disabled ? "0.5" : "1")};

    &:hover,
    &:focus,
    &:active {
      background: ${({ theme }) => theme.colorAccentDark};
    }

    & > :not(:last-child) {
      margin-right: 0.5rem;
    }
  }
`;

const Icon = styled.i`
  font-size: 1rem;
`;

const Button = ({
  value,
  icon,
  type = "text",
  onClick,
  width,
  disabled = false,
}) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <InputWrapper theme={theme} onClick={onClick} width={width}>
      <button type={type} disabled={disabled}>
        <Icon className={icon} /> {value && <span>{value}</span>}
      </button>
    </InputWrapper>
  );
};

export default Button;
