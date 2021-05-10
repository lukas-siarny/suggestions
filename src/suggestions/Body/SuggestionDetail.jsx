import React from "react";
import styled from "styled-components";
import { ThemeContext } from "../../Theme";
import { STATUS_ENUM, THEME_TRANSITION } from "../../config";
import customDarken from "../../utilities/customDarken";
import PhotoModal from "../PhotoModal";
import formatDate from "../../utilities/formatDate";
import TopBar from "./TopBar";
import { Link } from "react-router-dom";
import Spinner from "../Spinner";
import Message from "../Message";

const TopBarContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const SuggestionNumber = styled.span`
  color: ${({ theme }) => theme.colorAccent};
`;

const ButtonBack = styled(Link)`
  height: 2rem;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  border: none;
  background: transparent;
  outline: none;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: 150ms ease-in-out;
  color: ${({ theme }) => theme.fontColor};
  text-transform: uppercase;
  text-decoration: none;

  & i {
    margin-right: 1rem;
  }

  &:hover,
  &:active,
  &:focus {
    background: ${customDarken(0.05, "transparent")};
  }
`;

const SuggestionItem = styled.div`
  padding: 2rem;

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

const DateElement = styled.span`
  color: ${({ theme }) => theme.fontColorLight};
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
  transition: ${THEME_TRANSITION};
  transition-property: color;
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

const NoSuggestion = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  min-height: 200px;
  color: ${({ theme }) => theme.fontColor};
  transition: ${THEME_TRANSITION};
  transition-property: color;
  flex-direction: column;
  min-height: calc(100vh - 8rem);

  & p {
    padding-bottom: 1rem;
  }

  @media (min-width: 1366px) {
    min-height: calc(100vh - 9rem);
  }
`;

const ErrorWrapper = styled.div`
  padding: 2rem;
`;

const suggestionSample = {
  firstName: "Petra",
  lastName: "Atrepová",
  street: "Lipová",
  streetNumber: "22",
  city: "Sabinovl",
  postalCode: "05201",
  country: "Slovakia",
  image: "https://source.unsplash.com/random/800x600",
  date: "Thu May 06 2021 16:45:21 GMT+0200 (Central European Summer Time)",
};

const SuggestionDetail = ({ match: { params } }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [suggestion, setSuggestion] = React.useState(null);
  const [status, setStatus] = React.useState(STATUS_ENUM.IDLE);
  const { theme } = React.useContext(ThemeContext);

  React.useEffect(() => {
    (async () => {
      setStatus(STATUS_ENUM.LOADING);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}/suggestions/${params.customId}`
        );

        if (response.status === 404) {
          setStatus(STATUS_ENUM.NOT_FOUND);
          return;
        }

        const reponseJson = await response.json();
        setSuggestion(reponseJson);
        setStatus(STATUS_ENUM.FULFILLED);
      } catch (err) {
        console.log(err.message);
        setStatus(STATUS_ENUM.ERROR);
      }
    })();
  }, [params.customId]);

  let content;

  switch (status) {
    case STATUS_ENUM.LOADING:
      content = (
        <NoSuggestion theme={theme}>
          <Spinner color={theme.fontColor} />
        </NoSuggestion>
      );
      break;
    case STATUS_ENUM.ERROR:
      content = (
        <ErrorWrapper>
          <Message type="error">
            <p>
              <i className="fas fa-times" />
              &nbsp; Chyba. Niečo sa pokazilo...
            </p>
          </Message>
        </ErrorWrapper>
      );
      break;
    case STATUS_ENUM.NOT_FOUND:
      content = (
        <ErrorWrapper>
          <Message type="error">
            <p>
              <i className="fas fa-times" />
              &nbsp; 404. Podnet #{params.customId} neexistuje...
            </p>
          </Message>
        </ErrorWrapper>
      );
      break;
    case STATUS_ENUM.FULFILLED:
      content = (
        <>
          {suggestion && (
            <SuggestionItem theme={theme}>
              <Preview>
                <ImgWrapper>
                  {suggestion.image ? (
                    <>
                      <ImgPreview>
                        <img
                          src={suggestion.image}
                          alt={`${suggestion.firstName} ${suggestion.lastName}`}
                        />
                        <ImgHover
                          theme={theme}
                          onClick={() => setIsModalOpen(true)}
                        >
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
                    <DateElement theme={theme}>
                      {formatDate(new Date(suggestion.date))}
                    </DateElement>
                    <Name
                      theme={theme}
                    >{`${suggestion.firstName} ${suggestion.lastName}`}</Name>
                    <Address
                      theme={theme}
                    >{`${suggestion.street} ${suggestion.streetNumber}, ${suggestion.city}, ${suggestion.postalCode}, ${suggestion.country}`}</Address>
                  </Info>
                </InfoWrapper>
              </Preview>
              <Detail theme={theme}>{suggestion.message}</Detail>
            </SuggestionItem>
          )}
        </>
      );
      break;
    default:
      content = <div></div>;
  }

  return (
    <>
      {isModalOpen && (
        <PhotoModal
          image={suggestion.image}
          onModalPhotoClose={() => setIsModalOpen(false)}
        />
      )}
      <TopBar>
        <TopBarContent>
          <ButtonBack to="/" theme={theme}>
            <i className="fas fa-chevron-left"></i> Zoznam
          </ButtonBack>
          {suggestion && (
            <SuggestionNumber theme={theme}>
              Podnet #{suggestion.customId}
            </SuggestionNumber>
          )}
        </TopBarContent>
      </TopBar>
      {content}
    </>
  );
};

export default SuggestionDetail;
