import React from "react";
import styled from "styled-components";
import { ThemeContext } from "../../Theme";
import PhotoModal from "../PhotoModal";
import formatDate from "../../utilities/formatDate";
import customDarken from "../../utilities/customDarken";

const SuccessImgWrapper = styled.div`
  position: relative;
  z-index: 1;
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  height: 0;
  padding-bottom: 66.67%;

  & img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 8px;
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

const InfoWrapper = styled.div`
  margin-top: 1rem;
  width: 100%;
`;

const Date = styled.span`
  color: ${({ theme }) => theme.fontColorLight};
  display: inline-block;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

const Name = styled.h3`
  text-transform: uppercase;
  color: ${({ theme }) => theme.colorAccent};
  line-height: 1.5;
`;

const Address = styled.span`
  color: ${({ theme }) => theme.fontColor};
`;

const SuccessText = styled.div`
  margin-top: 1rem;
  line-height: 1.5;
  padding: 1rem 0;
  border-top: 2px solid ${customDarken(0.15, "transparent")};
  color: ${({ theme }) => theme.fontColor};

  & > p:not(:last-of-type) {
    margin-bottom: 1rem;
  }
`;

const SuccessItem = ({ name, address, image, date, text }) => {
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

      {image && (
        <SuccessImgWrapper>
          <ImgPreview>
            <img src={image} alt={name} />
            <ImgHover theme={theme} onClick={() => setIsModalOpen(true)}>
              <i className="fas fa-search" />
            </ImgHover>
          </ImgPreview>
        </SuccessImgWrapper>
      )}

      <InfoWrapper>
        <Date theme={theme}>{formatDate(date)}</Date>
        <Name theme={theme}>{name}</Name>
        <Address theme={theme}>{address}</Address>
      </InfoWrapper>
      <SuccessText theme={theme}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin id
          condimentum erat. Praesent dignissim justo vitae urna porta vehicula.
          Nullam ultrices gravida sodales. Vivamus rutrum augue vel ex
          consequat, sed mollis dolor imperdiet. Sed id vehicula nibh.
          Pellentesque vel dui tortor. Quisque at ex neque. Praesent et nulla id
          sapien eleifend dignissim. Duis quis suscipit justo. Donec eget
          condimentum sapien, ac porta nibh.
        </p>
        <p>
          Mauris non cursus quam. Maecenas tempus orci in nibh dictum dictum.
          Morbi eu neque sed diam sodales gravida. Donec vestibulum metus eu
          tortor consectetur, vitae consectetur erat placerat. Cras ac dignissim
          neque, in tempor est. Aenean eleifend id mi vitae malesuada. Aliquam
          nec vulputate libero. Etiam rutrum scelerisque eros commodo mattis.
          Etiam feugiat elementum tellus, mattis viverra turpis. Morbi quis nisl
          dapibus mauris dapibus dictum. Fusce blandit imperdiet orci eu
          blandit. Vivamus et augue in eros convallis luctus eu nec erat. Donec
          a risus vel tellus bibendum convallis. Nulla facilisi. Nullam ut arcu
          eu magna posuere sollicitudin non nec risus.
        </p>
      </SuccessText>
    </>
  );
};

export default SuccessItem;
