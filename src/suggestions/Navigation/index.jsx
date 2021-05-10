import React from "react";
import styled from "styled-components";
import Button from "../Form/Button";
import ThemeSwtich from "./themeSwitch";

const NavigationElement = styled.nav`
  width: 100%;
  height: 4rem;
  background: #000;
  position: fixed;
  top: 0;
`;

const NavigationWrapper = styled.div`
  margin: 0 2rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Navigation = ({ handleSidebarOpen }) => {
  return (
    <NavigationElement>
      <NavigationWrapper>
        <Button
          onClick={handleSidebarOpen}
          icon="fas fa-plus"
          value="Pridať podnet"
        />
        <ThemeSwtich />
      </NavigationWrapper>
    </NavigationElement>
  );
};

export default Navigation;
