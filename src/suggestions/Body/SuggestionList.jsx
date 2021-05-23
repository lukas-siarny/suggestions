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

const SuggestionList = ({ handleSidebarOpen, location, history }) => {
  const [suggestions, setSuggestions] = React.useState([]);
  const [status, setStatus] = React.useState(STATUS_ENUM.IDLE);
  const [limit, setLimit] = React.useState(DEFAULT_LIMIT);
  const [page, setPage] = React.useState(DEFAULT_PAGE);
  const [total, setTotal] = React.useState(null);
  const [selectedSorter, setSelectedSorter] = React.useState(
    SORT_BY_ENUM.dateNewest
  );

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
          {suggestions && suggestions.length > 0 ? (
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
              <NoSuggestions theme={theme}>
                <p>Zatiaľ neboli pridané žiadne podnety.</p>
                <Button
                  onClick={handleSidebarOpen}
                  icon="fas fa-plus"
                  value="Pridať podnet"
                />
              </NoSuggestions>
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
      </TopBar>
      <SuggestionsList>{content}</SuggestionsList>
    </>
  );
};

export default SuggestionList;
