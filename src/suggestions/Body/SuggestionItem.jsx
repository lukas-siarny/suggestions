import React from "react";
import styled from "styled-components";
import { ThemeContext } from "../../Theme";
import Button from "../Form/Button";
import formatDate from "../../utilities/formatDate";
import PhotoModal from "../PhotoModal";
import customDarken from "../../utilities/customDarken";
import { THEME_TRANSITION } from "../../config";
import { Link } from "react-router-dom";

const SuggestionItem = styled.div`
  padding: 2rem;

  &:nth-of-type(even) {
    background: ${({ theme }) => theme.backgroundColor};
    transition: ${THEME_TRANSITION};
    transition-property: background;
  }

  @media (min-width: 600px) {
    padding: 1rem 2rem;
  }
`;

const Preview = styled.div`
  width: 100%;

  @media (min-width: 600px) {
    display: flex;
    align-items: flex-start;
  }
`;

const ImgHover = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #fff;
  cursor: pointer;
  opacity: 0;
  transition: opacity 150ms ease-in-out;
`;

const ImgPreview = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &:hover ${ImgHover} {
    opacity: 1;
  }
`;

const ImgWrapper = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: 66.67%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 4px;
  position: relative;
  margin-bottom: 1rem;

  & img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    cursor: pointer;
  }

  @media (min-width: 600px) {
    width: 150px;
    height: 100px;
    padding-bottom: 0;
    flex: 0 0 auto;
    margin-bottom: 0;
  }
`;

const DefaultImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  font-size: 3rem;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.fontColorLight};
  transition: ${THEME_TRANSITION};
  transition-property: color;
  border: 2px dashed ${customDarken(0.15, "transparent")};
  border-radius: 4px;
`;

const InfoWrapper = styled.div`
  @media (min-width: 600px) {
    display: flex;
    justify-content: space-between;
    flex: 1;
  }
`;

const Info = styled.div`
  margin: 0 1rem 1rem 0;

  @media (min-width: 600px) {
    margin: 0 1rem;
  }
`;

const Date = styled.span`
  color: ${({ theme }) => theme.fontColorLight};
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

const Name = styled.h3`
  text-transform: uppercase;
  color: ${({ theme }) => theme.colorAccent};
  line-height: 1.5;

  & a {
    text-decoration: none;
    transition: color 150ms ease-in-out;
    color: ${({ theme }) => theme.colorAccent};

    &:hover {
      text-decoration: underline;
      color: ${({ theme }) => theme.colorAccentDark};
    }
  }
`;

const Address = styled.span`
  color: ${({ theme }) => theme.fontColor};
  transition: ${THEME_TRANSITION};
  transition-property: color;
`;

const ButtonWrapper = styled.div`
  width: 100%;

  @media (min-width: 600px) {
    width: 4rem;
  }
`;

const DetailWrapper = styled.div`
  transition: max-height 250ms ease-in-out;
  max-height: ${({ isDetailOpen }) => (isDetailOpen ? "1000px" : "0")};
  overflow: hidden;
`;

const Detail = styled.div`
  padding: 1rem 0 0 0;
  line-height: 1.5;
  color: ${({ theme }) => theme.fontColor};
  transition: ${THEME_TRANSITION};
  transition-property: color;

  @media (min-width: 600px) {
    border-top: 2px solid ${customDarken(0.15, "transparent")};
    margin-top: 1rem;
    padding: 1rem 0;
  }

  & > p:not(:last-of-type) {
    margin-bottom: 1rem;
  }
`;

const Suggestion = ({ id, name, address, image, date, text }) => {
  const [isDetailOpen, setIsDetailOpen] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { theme } = React.useContext(ThemeContext);

  return (
    <>
      {isModalOpen && (
        <PhotoModal
          image={image}
          onModalPhotoClose={() => setIsModalOpen(false)}
        />
      )}
      <SuggestionItem theme={theme}>
        <Preview>
          <ImgWrapper>
            {image ? (
              <>
                <ImgPreview>
                  <img src={image} alt={name} />
                  <ImgHover theme={theme} onClick={() => setIsModalOpen(true)}>
                    <i className="fas fa-search" />
                  </ImgHover>
                </ImgPreview>
              </>
            ) : (
              <DefaultImage theme={theme}>
                <i className="fas fa-file" />
              </DefaultImage>
            )}
          </ImgWrapper>
          <InfoWrapper>
            <Info>
              <Date theme={theme}>{formatDate(date)}</Date>
              <Name theme={theme}>
                <Link to={`suggestion/${id}`}>{name}</Link>
              </Name>
              {address && <Address theme={theme}>{address}</Address>}
            </Info>
            <ButtonWrapper>
              <Button
                icon="fas fa-chevron-down"
                width="100%"
                onClick={() => setIsDetailOpen(!isDetailOpen)}
              />
            </ButtonWrapper>
          </InfoWrapper>
        </Preview>
        <DetailWrapper isDetailOpen={isDetailOpen}>
          <Detail theme={theme}>
            {text}
            {/*<p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin id
              condimentum erat. Praesent dignissim justo vitae urna porta
              vehicula. Nullam ultrices gravida sodales. Vivamus rutrum augue
              vel ex consequat, sed mollis dolor imperdiet. Sed id vehicula
              nibh. Pellentesque vel dui tortor. Quisque at ex neque. Praesent
              et nulla id sapien eleifend dignissim. Duis quis suscipit justo.
              Donec eget condimentum sapien, ac porta nibh.
            </p>
            <p>
              Mauris non cursus quam. Maecenas tempus orci in nibh dictum
              dictum. Morbi eu neque sed diam sodales gravida. Donec vestibulum
              metus eu tortor consectetur, vitae consectetur erat placerat. Cras
              ac dignissim neque, in tempor est. Aenean eleifend id mi vitae
              malesuada. Aliquam nec vulputate libero. Etiam rutrum scelerisque
              eros commodo mattis. Etiam feugiat elementum tellus, mattis
              viverra turpis. Morbi quis nisl dapibus mauris dapibus dictum.
              Fusce blandit imperdiet orci eu blandit. Vivamus et augue in eros
              convallis luctus eu nec erat. Donec a risus vel tellus bibendum
              convallis. Nulla facilisi. Nullam ut arcu eu magna posuere
              sollicitudin non nec risus.
            </p>*/}
          </Detail>
        </DetailWrapper>
      </SuggestionItem>
    </>
  );
};

export default Suggestion;
