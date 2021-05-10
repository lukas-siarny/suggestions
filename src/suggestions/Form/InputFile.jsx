import React from "react";
import styled from "styled-components";
import { ThemeContext } from "../../Theme";
import { formatFileName } from "../../utilities/formatFileName";

const InputFake = styled.div`
  cursor: pointer;
  height: 100%;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.875rem;
  position: relative;
  text-align: center;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colorAccent};
  transition: 150ms ease-in-out;

  & span {
    padding-top: 3px;
  }
`;

const InputWrapper = styled.div`
  width: 100%;
  position: relative;
  margin: 1rem 0;
  height: 2rem;
  border-bottom: 2px solid ${({ theme }) => theme.colorAccent};
  display: flex;
  justify-content: flex-end;
  align-items: center;

  &:hover {
    border-bottom-color: ${({ theme }) => theme.colorAccentDark};

    & > ${InputFake} {
      color: ${({ theme }) => theme.colorAccentDark};
    }
  }

  & input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    content: "";
    cursor: pointer;
  }

  & label {
    position: absolute;
    cursor: pointer;
    top: 0.5rem;
    left: 0.5rem;
    color: ${({ theme }) => theme.fontColorLight};
    transition: 250ms ease-in-out;
    text-transform: uppercase;
  }
`;

const ImageInfo = styled.div`
  display: flex;
  align-items: center;

  & span {
    font-size: 0.875rem;
  }
`;

const IconFile = styled.i`
  font-size: 1rem;
  margin-right: 0.5rem;
`;

const IconRemove = styled.i`
  padding: 0.5rem;
  position: relative;
  z-index: 11;
  cursor: pointer;
  color: ${({ theme }) => theme.colorError};
`;

const Error = styled.span`
  position: absolute;
  width: 100%;
  left: 0.5rem;
  top: 100%;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colorError};
  margin-top: 0.5rem;
`;

const FileInput = ({
  image = null,
  onImageLoad,
  removeImage,
  errorMsg = 'Povolené sú len súbory typu ".png" a ".jpg" s maximálnou veľkosťou 10 MB.',
}) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <InputWrapper theme={theme}>
      {!image ? (
        <InputFake theme={theme}>
          <IconFile className="fas fa-file" /> <span>Nahrať obrázok</span>
        </InputFake>
      ) : (
        <ImageInfo>
          <span>{formatFileName(image, 25)}</span>
          <IconRemove
            theme={theme}
            className="fas fa-times"
            title="Odstrániť obrázok"
            onClick={(e) => {
              e.stopPropagation();
              removeImage();
            }}
          />
        </ImageInfo>
      )}
      <label htmlFor="input">Fotopríloha</label>
      <input
        type="file"
        name="input"
        onChange={(e) => onImageLoad(e)}
        title="Nahrať obrázok"
      />
      <Error theme={theme}>{errorMsg}</Error>
    </InputWrapper>
  );
};

export default FileInput;
