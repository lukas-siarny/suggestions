import React from "react";
import styled from "styled-components";
import { ThemeContext } from "../../Theme";
import { THEME_TRANSITION } from "../../config";

const TopBarElement = styled.div`
  width: 100%;
  height: auto;
  height: 4rem;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 1;
  background: ${({ theme }) => theme.backgroundColor};
  transition: ${THEME_TRANSITION};
  transition-property: background;
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);
`;

const TopBar = ({ children }) => {
  const { theme } = React.useContext(ThemeContext);

  return <TopBarElement theme={theme}>{children}</TopBarElement>;
};

export default TopBar;
