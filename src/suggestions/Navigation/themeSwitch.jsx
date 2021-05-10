import React from "react";
import styled from "styled-components";
import { ThemeContext } from "../../Theme";
import { THEME_TRANSITION } from "../../config";

const Switch = styled.label`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.backgroundSecondary};
  transition: ${THEME_TRANSITION};
  transition-property: color;
`;

const Bullet = styled.span`
  display: block;
  position: absolute;
  width: 1rem;
  height: 1rem;
  top: 50%;
  transform: translate(0.25rem, -50%);
  border-radius: 50%;
  background: #000;
  transition: transform 250ms ease-in-out;
  z-index: -1;
`;

const Slider = styled.div`
  position: relative;
  width: 3rem;
  height: 1.5rem;
  background: ${({ theme }) => theme.backgroundSecondary};
  transition: ${THEME_TRANSITION};
  transition-property: background;
  margin: 0 0.5rem;
  border-radius: 999px;
  z-index: 888;
  cursor: pointer;

  input {
    width: 100%;
    height: 100%;
    z-index: 888;
    opacity: 0;
    cursor: pointer;

    &:checked ~ ${Bullet} {
      transform: translate(1.75rem, -50%);
    }
  }
`;

export const ThemeSwtich = () => {
  const { theme, lightTheme, changeTheme } = React.useContext(ThemeContext);

  return (
    <Switch htmlFor="theme-switcher" theme={theme}>
      <i className="fas fa-sun"></i>
      <Slider tabIndex="1" theme={theme}>
        <input
          type="checkbox"
          checked={!lightTheme}
          name="theme-switcher"
          onChange={changeTheme}
        />
        <Bullet theme={theme} />
      </Slider>
      <i className="fas fa-moon"></i>
    </Switch>
  );
};

export default ThemeSwtich;
