import React from "react";
import styled from "styled-components";
import { ThemeContext } from "../../Theme";
import { THEME_TRANSITION } from "../../config";
import { Switch, Route } from "react-router-dom";
import SuggestionDetail from "./SuggestionDetail";
import SuggestionList from "./SuggestionList";
import customDarken from "../../utilities/customDarken";
import image from "./illustration-intro.png";

const SuggestionsBody = styled.div`
  width: 100%;
  margin-top: 4rem;
  height: calc(100vh - 4rem);
  position: fixed;
  overflow-y: auto;
  background: ${({ theme }) => theme.backgroundSecondary};
  transition: ${THEME_TRANSITION};
  transition-property: background;
`;

const FlexWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: 1366px) {
    flex-direction: row;
    height: fit-content;
    min-height: 100%;
  }
`;

const FeaaturedSuggestion = styled.div`
  width: 100%;
  background: #cc591a;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1000px;
    background: linear-gradient(to bottom, #d9a242, #cc591a);
  }

  @media (min-width: 650px) {
    padding: 4rem;
  }

  @media (min-width: 1366px) {
    width: 30%;
    min-width: 500px;
    background: #cc591a;
    padding: 4rem;
    min-height: auto;
    justify-content: flex-start;
  }
`;

const FeaturedContentWrapper = styled.div`
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 1366px) {
    position: fixed;
    top: 4rem;
    min-height: calc(100vh - 4rem);
  }
`;

const FeaturedContent = styled.div`
  padding: 2rem;
`;

const FeaturedTitle = styled.h2`
  text-transform: uppercase;
  color: #fff;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
  line-height: 1;
  text-align: center;

  @media (min-width: 1366px) {
    font-size: 3rem;
  }
`;

const FeaturedText = styled.div`
  width: 100%;
  line-height: 1.5;
  padding: 1rem 0;
  text-align: center;
  border-top: 2px solid ${customDarken(0.15, "transparent")};
  color: #ddd;
  font-style: italic;

  & i {
    font-size: 2rem;
    margin-right: 1rem;
  }

  & > p:not(:last-of-type) {
    margin-bottom: 1rem;
  }
`;

const MainContent = styled.div`
  flex: 1;
  order: -1;
  min-height: calc(100vh - 4rem);

  @media (min-width: 1366px) {
    order: 1;
    min-height: calc(100vh - 12rem);
    justify-content: center;
  }
`;

const Body = ({ handleSidebarOpen }) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <SuggestionsBody theme={theme}>
      <FlexWrapper>
        <FeaaturedSuggestion>
          <FeaturedContentWrapper>
            <FeaturedContent>
              <img src={image} width="100%" alt="sdsdsds" />
              <FeaturedTitle>Lorem ipsum</FeaturedTitle>
              <FeaturedText>
                <p>
                  <i className="fas fa-quote-left"></i>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                  id condimentum erat. Praesent dignissim justo vitae urna porta
                  vehicula. Nullam ultrices gravida sodales. Vivamus rutrum
                  augue vel ex consequat, sed mollis dolor imperdiet. Sed id
                  vehicula nibh. Pellentesque vel dui tortor. Quisque at ex
                  neque. Praesent et nulla id sapien eleifend dignissim. Duis
                  quis suscipit justo. Donec eget condimentum sapien, ac porta
                  nibh.
                </p>
              </FeaturedText>
            </FeaturedContent>
          </FeaturedContentWrapper>
        </FeaaturedSuggestion>
        <MainContent>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <SuggestionList
                  {...props}
                  handleSidebarOpen={handleSidebarOpen}
                />
              )}
            />
            <Route
              exact
              path="/suggestion/:customId"
              component={SuggestionDetail}
            />
          </Switch>
        </MainContent>
      </FlexWrapper>
    </SuggestionsBody>
  );
};

export default Body;
