import React from "react";
import styled from "styled-components";
import SuggestionItem from "./SuggestionItem";
import sorter from "../../utilities/sorter";
import SelectMenu from "../Form/InputSelect";
import { SORT_BY_ENUM, STATUS_ENUM } from "../../config";
import { ThemeContext } from "../../Theme";
import { THEME_TRANSITION } from "../../config";
import Button from "../Form/Button";
import TopBar from "./TopBar";
import Spinner from "../Spinner";
import Message from "../Message";

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

/*const suggestionsSamples = [
  {
    id: "4654654",
    firstName: "Lukáś",
    lastName: "Šiarny",
    street: "Brezová",
    streetNumber: "22",
    city: "Spišská Nová Ves",
    postalCode: "05201",
    country: "Slovakia",
    image: "",
    date: "Thu May 05 2021 13:45:21 GMT+0200 (Central European Summer Time)",
  },
  {
    id: "4654655",
    firstName: "Peter",
    lastName: "Retep",
    street: "Topoľová",
    streetNumber: "22",
    city: "Poprad",
    postalCode: "05555",
    country: "Slovakia",
    image: "",
    date: "Thu May 04 2021 11:45:21 GMT+0200 (Central European Summer Time)",
  },
  {
    id: "4654656",
    firstName: "Michal",
    lastName: "Lachim",
    street: "Gaštanová",
    streetNumber: "15",
    city: "Krompachy",
    postalCode: "00111",
    country: "Slovakia",
    image: "https://source.unsplash.com/random/800x600",
    date: "Thu May 03 2021 16:45:21 GMT+0200 (Central European Summer Time)",
  },
  {
    id: "4654657",
    firstName: "Lukáś",
    lastName: "Šiarny",
    street: "Střední",
    streetNumber: "8",
    city: "Brno",
    postalCode: "60200",
    country: "Czech Republic",
    image: "https://source.unsplash.com/random/800x600",
    date: "Thu May 02 2021 12:45:21 GMT+0200 (Central European Summer Time)",
  },
  {
    id: "4654658",
    firstName: "Andrej",
    lastName: "Jerdan",
    street: "Vnitřní",
    streetNumber: "15",
    city: "Praha",
    postalCode: "60500",
    country: "Czech Republic",
    image: "https://source.unsplash.com/random/800x600",
    date: "Thu May 01 2021 15:45:21 GMT+0200 (Central European Summer Time)",
  },
  {
    id: "4654659",
    firstName: "Juraj",
    lastName: "Jaruj",
    street: "Javorová",
    streetNumber: "15",
    city: "Kośice",
    postalCode: "15205",
    country: "Slovakia",
    image: "https://source.unsplash.com/random/800x600",
    date: "Thu May 06 2021 16:45:21 GMT+0200 (Central European Summer Time)",
  },
  {
    id: "4654660",
    firstName: "Petra",
    lastName: "Atrepová",
    street: "Lipová",
    streetNumber: "22",
    city: "Sabinovl",
    postalCode: "05201",
    country: "Slovakia",
    image: "https://source.unsplash.com/random/800x600",
    date: "Thu May 06 2021 16:45:21 GMT+0200 (Central European Summer Time)",
  },
  {
    id: "4654654",
    firstName: "Lukáś",
    lastName: "Šiarny",
    street: "Brezová",
    streetNumber: "22",
    city: "Spišská Nová Ves",
    postalCode: "05201",
    country: "Slovakia",
    image: "",
    date: "Thu May 05 2021 13:45:21 GMT+0200 (Central European Summer Time)",
  },
  {
    id: "4654655",
    firstName: "Peter",
    lastName: "Retep",
    street: "Topoľová",
    streetNumber: "22",
    city: "Poprad",
    postalCode: "05555",
    country: "Slovakia",
    image: "",
    date: "Thu May 04 2021 11:45:21 GMT+0200 (Central European Summer Time)",
  },
  {
    id: "4654656",
    firstName: "Michal",
    lastName: "Lachim",
    street: "Gaštanová",
    streetNumber: "15",
    city: "Krompachy",
    postalCode: "00111",
    country: "Slovakia",
    image: "https://source.unsplash.com/random/800x600",
    date: "Thu May 03 2021 16:45:21 GMT+0200 (Central European Summer Time)",
  },
  {
    id: "4654657",
    firstName: "Lukáś",
    lastName: "Šiarny",
    street: "Střední",
    streetNumber: "8",
    city: "Brno",
    postalCode: "60200",
    country: "Czech Republic",
    image: "https://source.unsplash.com/random/800x600",
    date: "Thu May 02 2021 12:45:21 GMT+0200 (Central European Summer Time)",
  },
  {
    id: "4654658",
    firstName: "Andrej",
    lastName: "Jerdan",
    street: "Vnitřní",
    streetNumber: "15",
    city: "Praha",
    postalCode: "60500",
    country: "Czech Republic",
    image: "https://source.unsplash.com/random/800x600",
    date: "Thu May 01 2021 15:45:21 GMT+0200 (Central European Summer Time)",
  },
  {
    id: "4654659",
    firstName: "Juraj",
    lastName: "Jaruj",
    street: "Javorová",
    streetNumber: "15",
    city: "Kośice",
    postalCode: "15205",
    country: "Slovakia",
    image: "https://source.unsplash.com/random/800x600",
    date: "Thu May 06 2021 16:45:21 GMT+0200 (Central European Summer Time)",
  },
  {
    id: "4654660",
    firstName: "Petra",
    lastName: "Atrepová",
    street: "Lipová",
    streetNumber: "22",
    city: "Sabinovl",
    postalCode: "05201",
    country: "Slovakia",
    image: "https://source.unsplash.com/random/800x600",
    date: "Thu May 06 2021 16:45:21 GMT+0200 (Central European Summer Time)",
  },
];*/

const SuggestionList = ({ handleSidebarOpen }) => {
  const [suggestions, setSuggestions] = React.useState([]);
  const [status, setStatus] = React.useState(STATUS_ENUM.IDLE);

  const localStorageSortBy = localStorage.getItem("sortBy");
  const [sortBy, setSortBy] = React.useState(
    localStorageSortBy ? localStorageSortBy : SORT_BY_ENUM.dateNewest
  );

  const { theme } = React.useContext(ThemeContext);

  React.useEffect(() => {
    (async () => {
      setStatus(STATUS_ENUM.LOADING);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}/suggestions/`
        );

        const reponseJson = await response.json();
        setSuggestions(reponseJson);
        setStatus(STATUS_ENUM.FULFILLED);
      } catch (err) {
        console.log(err.message);
        setStatus(STATUS_ENUM.ERROR);
      }
    })();
  }, []);

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
            sorter(suggestions, sortBy).map((suggestion, i) => (
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
            ))
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
          selected={sortBy}
          options={Object.values(SORT_BY_ENUM)}
          handleChange={(value) => {
            setSortBy(value);
            localStorage.setItem("sortBy", value);
          }}
          clearable={false}
        />
      </TopBar>
      <SuggestionsList>{content}</SuggestionsList>
    </>
  );
};

export default SuggestionList;
