import React from "react";
import styled, { css } from "styled-components";
import { LIST_ERROR } from "../../config";
import { ThemeContext } from "../../Theme";
import { THEME_TRANSITION } from "../../config";

const SelectWrapper = styled.div`
  width: 100%;
  position: relative;
  margin: 1rem 0;
`;

const Selected = styled.div`
  width: 100%;
  cursor: pointer;
  height: 2rem;
  padding-left: 0.5rem;
  outline: none;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.fontColor};
  transition: ${THEME_TRANSITION};
  transition-property: color;
  font-size: 0.875rem;
  position: relative;
  ${({ selected, theme, defaultValue }) =>
    selected === defaultValue &&
    css`
      color: ${theme.fontColorLight};
      text-transform: uppercase;
    `}

  &::after {
    position: absolute;
    content: "";
    bottom: 0;
    right: 0;
    left: 0;
    transition: backround 150ms ease-in-out;
    background-color: ${({ isOpen, theme }) =>
      isOpen ? theme.colorAccentDark : theme.colorAccent};
    height: 2px;
  }

  &:hover {
    &:after {
      background: ${({ theme }) => theme.colorAccentDark};
    }
  }
`;

const IconsWrapper = styled.div`
  position: absolute;
  right: 0;
  height: 100%;
  color: ${({ theme }) => theme.fontColorLight};
  display: flex;
  align-items: center;
`;

const IconArrow = styled.i`
  padding: 0.25rem;
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "")};
`;

const IconRemove = styled.i`
  padding: 0.25rem;
`;

const SelectOptions = styled.ul`
  position: absolute;
  transform-origin: top;
  transform: ${({ isOpen }) => (isOpen ? "scale(1,1)" : "scale(1,0)")};
  z-index: 10;
  min-width: 10rem;
  width: 80%;
  list-style: none;
  background: ${({ theme }) => theme.backgroundSecondary};
  color: ${({ theme }) => theme.fontColor};
  transition: ${THEME_TRANSITION};
  transition: background ${THEME_TRANSITION}, color ${THEME_TRANSITION},
    transform 150ms ease-in-out;
  max-height: 400px;
  width: 100%;
  overflow-y: auto;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
`;

const SelectOption = styled.li`
  width: 100%;
  padding: 0.5rem;
  cursor: pointer;
  transition: background 100ms ease-out, opacity 500ms ease-in-out;
  font-size: 0.875rem;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  background: ${({ isSelected }) =>
    isSelected ? "rgba(0,0,0,0.05)" : "transparent"};

  &:hover {
    background: rgba(0, 0, 0, 0.05);
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

const SelectMenu = ({
  selected,
  options,
  handleChange,
  defaultValue = "Vyberte možnosť",
  optionsError = LIST_ERROR,
  clearable = true,
  errorMsg,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { theme } = React.useContext(ThemeContext);
  const wrapperEl = React.useRef(null);

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (isOpen && e.keyCode === 27) {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (e) => {
      if (!wrapperEl.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown, false);
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, false);
      document.removeEventListener("click", handleClickOutside);
    };
  });

  return (
    <SelectWrapper ref={wrapperEl}>
      <Selected
        onClick={() => setIsOpen(!isOpen)}
        selected={selected}
        isOpen={isOpen}
        theme={theme}
        defaultValue={defaultValue}
      >
        {selected}
        <IconsWrapper theme={theme}>
          <IconArrow className="fas fa-chevron-down" isOpen={isOpen} />
          {clearable && selected !== defaultValue && (
            <IconRemove
              className="fas fa-times select-remove"
              onClick={() => handleChange(defaultValue)}
            />
          )}
        </IconsWrapper>
      </Selected>
      <SelectOptions isOpen={isOpen} theme={theme}>
        {options.length > 0 &&
          options.map((option, index) => (
            <SelectOption
              onClick={() => {
                if (option !== optionsError) {
                  handleChange(option);
                }
                setIsOpen(false);
              }}
              isSelected={selected === option}
              key={index}
              isOpen={isOpen}
            >
              {option}
            </SelectOption>
          ))}
      </SelectOptions>
      <Error theme={theme} errorMsg={errorMsg}>
        {errorMsg}
      </Error>
    </SelectWrapper>
  );
};

export default SelectMenu;
