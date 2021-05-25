import React from "react";
import styled from "styled-components";
import SuggestionItem from "./SuggestionItem";
import SelectMenu from "../Form/InputSelect";
import {
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  SORT_BY_ENUM,
  STATUS_ENUM,
} from "../../config";
import { ThemeContext } from "../../Theme";
import { THEME_TRANSITION } from "../../config";
import Button from "../Form/Button";
import TopBar from "./TopBar";
import Spinner from "../Spinner";
import Message from "../Message";
import Paginator from "./Paginator";

const SuggestionsList = styled.div`
  width: 100%;
`;

const NoSuggestions = styled.div`
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

const ListWrapper = styled.div`
  padding: 1rem 0;
`;

const ErrorWrapper = styled.div`
  padding: 2rem;
`;

const PaginatorWrapper = styled.div`
  padding: 1rem 2rem;
  display: flex;
  justify-content: center;
`;

const SelectMenuWrapper = styled.div`
  width: calc(100% - 7rem);
  position: absolute;
  z-index: 555;
  transform: ${({ isSearchActive }) =>
    isSearchActive ? `translateX(calc(-100% - 2rem))` : "translateX(0)"};
  transition: transform 250ms ease-in-out;
`;

const SearchBarWrapper = styled.div`
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 2rem;
  overflow: hidden;
`;

const SearchBar = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  padding: 0 1rem;
  background: ${({ theme }) => theme.backgroundColor};

  transform: ${({ isSearchActive }) =>
    !isSearchActive ? `translateX(calc(100% - 3rem))` : "translateX(1rem)"};
  overflow: hidden;
  transition: transform 250ms ease-in-out, background ${THEME_TRANSITION};
  display: flex;
  align-items: center;
  z-index: 666;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1rem;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.fontColorLight};
  cursor: pointer;
  transition: ${THEME_TRANSITION};

  &:hover,
  &:focus,
  &:active {
    border-bottom-color: ${({ theme }) => theme.colorAccentDark};
  }
`;

const SearchInput = styled.input`
  height: 2rem;
  width: 100%;
  outline: none;
  border-top: none;
  border-left: none;
  border-right: none;
  background: transparent;
  color: ${({ theme }) => theme.fontColor};
  transition: ${THEME_TRANSITION};
  border-bottom: 2px solid ${({ theme }) => theme.colorAccent};
  padding-left: 2rem;
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: 0.875rem;

  &::placeholder {
    color: ${({ theme }) => theme.fontColorLight};
    font-size: 0.875rem;
    text-transform: uppercase;
  }

  &:hover,
  &:focus,
  &:active {
    border-bottom-color: ${({ theme }) => theme.colorAccentDark};
  }
`;

const CloseIcon = styled.div`
  position: absolute;
  right: 1rem;
  width: 1.5rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.fontColorLight};
  cursor: pointer;
  transition: ${THEME_TRANSITION};

  &:hover,
  &:focus,
  &:active {
    border-bottom-color: ${({ theme }) => theme.colorAccentDark};
  }
`;

const SuggestionList = ({ handleSidebarOpen, location, history }) => {
  const [suggestions, setSuggestions] = React.useState([]);
  const [status, setStatus] = React.useState(STATUS_ENUM.IDLE);
  const [limit, setLimit] = React.useState(DEFAULT_LIMIT);
  const [page, setPage] = React.useState(DEFAULT_PAGE);
  const [total, setTotal] = React.useState(null);
  const [selectedSorter, setSelectedSorter] = React.useState(
    SORT_BY_ENUM.dateNewest
  );
  const [searchValue, setSearchValue] = React.useState("");
  const [isSearchActive, setIsSearchActive] = React.useState(false);

  const { theme } = React.useContext(ThemeContext);

  React.useEffect(() => {
    /**  
      check if there are any query params in URL 
        => if so, use them 
        => if not, use default ones
    */
    const paramsFromUrl = Object.fromEntries(
      new URLSearchParams(location.search)
    );
    const newParams = {};

    const sortOptions = Object.values(SORT_BY_ENUM);

    if ("sorter" in paramsFromUrl) {
      newParams.sorter = paramsFromUrl.sorter;
      const sortOption =
        sortOptions.find((o) => o.value === paramsFromUrl.sorter) ||
        SORT_BY_ENUM.dateNewest;
      setSelectedSorter(sortOption);
    } else {
      newParams.sorter = SORT_BY_ENUM.dateNewest.value;
      setSelectedSorter(SORT_BY_ENUM.dateNewest);
    }

    newParams.page =
      "page" in paramsFromUrl ? paramsFromUrl.page : DEFAULT_PAGE;
    newParams.limit =
      "limit" in paramsFromUrl ? paramsFromUrl.limit : DEFAULT_LIMIT;

    /** 
      request to server based on query params
    */
    (async () => {
      setStatus(STATUS_ENUM.LOADING);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}/suggestions?${new URLSearchParams(
            newParams
          ).toString()}`
        );

        const reponseJson = await response.json();
        setSuggestions(reponseJson.results);
        setLimit(reponseJson.limit);
        setPage(reponseJson.page);
        setTotal(reponseJson.total);
        setStatus(STATUS_ENUM.FULFILLED);
      } catch (err) {
        console.log(err.message);
        setStatus(STATUS_ENUM.ERROR);
      }
    })();
  }, [location]);

  let content;

  switch (status) {
    case STATUS_ENUM.LOADING:
      content = (
        <NoSuggestions theme={theme}>
          <Spinner color={theme.fontColor} />
        </NoSuggestions>
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
    case STATUS_ENUM.FULFILLED:
      content = (
        <ListWrapper>
          {suggestions.length > 0 ? (
            <>
              {suggestions.map((suggestion, i) => (
                <SuggestionItem
                  key={i}
                  name={`${suggestion.firstName} ${suggestion.lastName}`}
                  address={`${suggestion.street} ${suggestion.streetNumber}, ${suggestion.city}, ${suggestion.postalCode}, ${suggestion.country}`}
                  image={
                    suggestion.image
                      ? `${process.env.REACT_APP_API}/${suggestion.image}`
                      : ""
                  }
                  date={new Date(suggestion.date)}
                  text={suggestion.message}
                  id={suggestion.customId}
                />
              ))}
              {limit && total && page && (
                <PaginatorWrapper>
                  <Paginator
                    limit={limit}
                    total={total}
                    page={page}
                    onPageChange={(page) => {
                      const searchParams = new URLSearchParams(location.search);
                      searchParams.set("page", page);

                      history.push({
                        pathname: location.pathname,
                        search: searchParams.toString(),
                      });
                    }}
                  />
                </PaginatorWrapper>
              )}
            </>
          ) : (
            <>
              {suggestions.length === 0 && total !== "null" ? (
                <ErrorWrapper>
                  <Message type="error">
                    <p>
                      <i className="fas fa-times" />
                      &nbsp; Chyba. Niečo sa pokazilo...
                    </p>
                  </Message>
                </ErrorWrapper>
              ) : (
                <NoSuggestions theme={theme}>
                  <p>Zatiaľ neboli pridané žiadne podnety.</p>
                  <Button
                    onClick={handleSidebarOpen}
                    icon="fas fa-plus"
                    value="Pridať podnet"
                  />
                </NoSuggestions>
              )}
            </>
          )}
        </ListWrapper>
      );
      break;
    default:
      content = <div></div>;
  }

  return (
    <>
      <TopBar>
        <SelectMenuWrapper isSearchActive={isSearchActive}>
          <SelectMenu
            selected={selectedSorter}
            options={Object.values(SORT_BY_ENUM)}
            handleChange={(value) => {
              setSelectedSorter(value);
              const searchParams = new URLSearchParams(location.search);
              searchParams.set("sorter", value.value);
              searchParams.set("page", DEFAULT_PAGE);

              history.push({
                pathname: location.pathname,
                search: searchParams.toString(),
              });
            }}
            clearable={false}
          />
        </SelectMenuWrapper>
        <SearchBarWrapper>
          <SearchBar theme={theme} isSearchActive={isSearchActive}>
            <SearchIcon
              theme={theme}
              onClick={() => setIsSearchActive(!isSearchActive)}
            >
              <i className="fas fa-search"></i>
            </SearchIcon>
            <SearchInput
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              type="text"
              name="search"
              theme={theme}
              placeholder="Vyhľadávanie zatiaľ nefunguje..."
            />
            {searchValue && (
              <CloseIcon
                theme={theme}
                onClick={() => {
                  setSearchValue("");
                  //setIsSearchActive(false);
                }}
              >
                <i className="fas fa-times"></i>
              </CloseIcon>
            )}
          </SearchBar>
        </SearchBarWrapper>
      </TopBar>
      <SuggestionsList>{content}</SuggestionsList>
    </>
  );
};

export default SuggestionList;
