import React from "react";
import styled, { keyframes } from "styled-components";

const Background = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 998;
  overflow: auto;
  background: rgba(0, 0, 0, 0.75);
`;

const Wrapper = styled.div`
  position: relative;
  padding: 3rem 3rem;
  margin: auto;
  width: 100%;
  max-width: 65rem;
  display: flex;
  justify-content: center;
`;

const scaleAnimation = keyframes`
 0% { transform: scale(0) };
 100% { transform: scale(1) };
`;

const PhotoWrapper = styled.div`
  z-index: 999;
  position: relative;
  width: fit-content;
  transform-origin: center;
  animation-name: ${scaleAnimation};
  animation-duration: 0.5s;

  & img {
    max-width: 100%;
    max-height: inherit;
    padding: 0;
    margin: 0;
    width: auto;
    border-radius: 4px;
    box-shadow: 0px 1px 2px #00000029;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  height: 3.5rem;
  width: 3.5rem;
  border-radius: 50%;
  right: 0;
  top: 0;
  background: #ffffff;
  transform: translate(50%, -50%);
  box-shadow: 0px 1px 2px #00000029;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: transparent;
  border: none;
  transition: background 0.1 ease;

  &:hover,
  &:focus {
    background-color: #ededed;
  }
`;

const Image = styled.img``;

const ModalPhoto = ({ image, onModalPhotoClose, opened }) => {
  const handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      onModalPhotoClose();
    }
  };

  React.useEffect(() => {
    document.body.setAttribute("style", `position: fixed; left: 0; right: 0;`);
    document.addEventListener("keydown", handleKeyDown, false);

    return () => {
      document.body.setAttribute("style", "");
      document.removeEventListener("keydown", handleKeyDown, false);
    };
  });

  return (
    <Background>
      <Wrapper>
        <PhotoWrapper>
          <CloseButton onClick={onModalPhotoClose}>
            <i className="fas fa-times" />
          </CloseButton>
          {image && <Image src={image} alt="sdssd" />}
        </PhotoWrapper>
      </Wrapper>
    </Background>
  );
};

export default ModalPhoto;
