import React from "react";
import styled from "styled-components";
import { ThemeContext } from "../../Theme";
import TextInput from "../Form/InputText";
import FileInput from "../Form/InputFile";
import TextAreaInput from "../Form/InputTextArea";
import Button from "../Form/Button";
import SelectMenu from "../Form/InputSelect";
import { COUNTRIES_LIST_DEFAULT, LIST_ERROR, STATUS_ENUM } from "../../config";
import { validateImage } from "../../utilities/validation";
import Spinner from "../Spinner";
import Message from "../Message";
import { useHistory } from "react-router-dom";

const Background = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  transition: opacity 250ms ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? `1` : `0`)};
  z-index: ${({ isOpen }) => (isOpen ? `998` : `-999`)};
`;

const SidebarElement = styled.div`
  width: 100%;
  max-width: 700px;
  background: ${({ theme }) => theme.backgroundColor};
  height: 100vh;
  top: 0;
  left: 0;
  position: absolute;
  padding: 2rem;
  z-index: 999;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.25);
  overflow-y: auto;
  transition: transform 250ms ease-in-out;
  transform: ${({ isOpen }) =>
    isOpen ? `translateX(0)` : `translateX(-100%)`};
`;

const SidebarHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colorAccent};
  text-transform: uppercase;
  font-size: 1.5rem;

  @media (min-width: 600px) {
    font-size: 3.5rem;
  }
`;

const ButtonClose = styled.button`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.fontColorLight};
  cursor: pointer;
  padding: 0.25rem;
  background: none;
  outline: none;
  border: none;
  transition: 150ms ease-in;

  &:hover,
  &:active,
  &:focus {
    color: ${({ theme }) => theme.fontColor};
  }

  @media (min-width: 600px) {
    font-size: 2rem;
  }
`;

const FormElement = styled.form`
  width: 100%;
  position: relative;
`;

const FlexWrapper = styled.div`
  display: flex;

  & > :not(:last-child) {
    margin-right: 1rem;
  }
`;

const FlexItemFull = styled.div`
  flex: 1;
`;

const FlexItemQuarter = styled.div`
  flex: 0 0 50%;
  min-width: 125px;

  @media (min-width: 600px) {
    flex: 0 0 25%;
  }
`;

const SubmitWrapper = styled.div`
  margin: 2.5rem 0;
`;

const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: ${({ status }) =>
    status === STATUS_ENUM.LOADING ? "300px" : "auto"};
  color: ${({ theme }) => theme.fontColor};

  & > :not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const Sidebar = ({ isOpen, handleSidebarClose }) => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [street, setStreet] = React.useState("");
  const [streetNumber, setStreetNumber] = React.useState("");
  const [postalCode, setPostalCode] = React.useState("");
  const [city, setCity] = React.useState("");
  const [country, setCountry] = React.useState(COUNTRIES_LIST_DEFAULT);
  const [msg, setMsg] = React.useState("");
  const [image, setImage] = React.useState("");
  const [countriesList, setCountriesList] = React.useState([]);

  const [errorFirstName, setErrorFirstName] = React.useState("");
  const [errorLastName, setErrorLastName] = React.useState("");
  const [errorStreet, setErrorStreet] = React.useState("");
  const [errorStreetNumber, setErrorStreetNumber] = React.useState("");
  const [errorCity, setErrorCity] = React.useState("");
  const [errorPostalCode, setErrorPostalCode] = React.useState("");
  const [errorCountry, setErrorCountry] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");
  const [errorImage, setErrorImage] = React.useState("");

  const [status, setStatus] = React.useState(STATUS_ENUM.IDLE);
  const [response, setResponse] = React.useState(null);

  const { theme } = React.useContext(ThemeContext);

  const backgroundRef = React.useRef(null);
  const history = useHistory();

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && backgroundRef.current?.contains(e.target)) {
        handleSidebarClose();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });

  // List of countries from externl API
  React.useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://restcountries.eu/rest/v2/all?fields=name"
        );
        const countriesJson = await response.json();
        const countriesMapped = countriesJson.map((country) => country.name);
        setCountriesList((state) => [...state, ...countriesMapped]);
      } catch {
        setCountriesList([LIST_ERROR]);
      }
    })();
  }, []);

  // form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = false;
    setErrorFirstName("");
    setErrorLastName("");
    setErrorStreet("");
    setErrorStreetNumber("");
    setErrorCity("");
    setErrorPostalCode("");
    setErrorCountry("");
    setErrorMsg("");
    setErrorImage(null);

    // validation
    if (!firstName) {
      setErrorFirstName("Toto pole je povinné *");
      errors = true;
    }

    if (!lastName) {
      setErrorLastName("Toto pole je povinné *");
      errors = true;
    }

    if (!street) {
      setErrorStreet("Toto pole je povinné *");
      errors = true;
    }

    if (!streetNumber) {
      setErrorStreetNumber("Toto pole je povinné *");
      errors = true;
    } else if (streetNumber && !/^\d+$/.test(streetNumber.trim())) {
      setErrorStreetNumber("Povolené sú len čísla");
      errors = true;
    }

    if (!city) {
      setErrorCity("Toto pole je povinné *");
      errors = true;
    }

    if (!postalCode) {
      setErrorPostalCode("Toto pole je povinné *");
      errors = true;
    } else if (postalCode && !/^\d+$/.test(postalCode.trim())) {
      setErrorPostalCode("Povolené sú len čísla");
      errors = true;
    }

    if (country === COUNTRIES_LIST_DEFAULT) {
      setErrorCountry("Prosím, vyberte jednu z možností *");
      errors = true;
    }

    if (!msg) {
      setErrorMsg("Toto pole je povinné *");
      errors = true;
    }

    if (image) {
      const error = validateImage(image);

      if (error) {
        setErrorImage(error);
        errors = true;
      }
    }

    if (errors) {
      return;
    }

    // API call to save valid entry to DB
    setStatus(STATUS_ENUM.LOADING);

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("street", street);
    formData.append("streetNumber", streetNumber);
    formData.append("city", city);
    formData.append("postalCode", postalCode);
    formData.append("country", country);
    formData.append("message", msg);
    formData.append("image", image);

    try {
      const settings = {
        method: "POST",
        body: formData,
      };

      const response = await fetch(
        `${process.env.REACT_APP_API}/suggestions/`,
        settings
      );

      if (response.status === 400) {
        setStatus(STATUS_ENUM.ERROR);
        return;
      }

      const responseJson = await response.json();
      setResponse(responseJson);

      setStatus(STATUS_ENUM.FULFILLED);
    } catch (err) {
      setStatus(STATUS_ENUM.ERROR);
      console.log(err.message);
    }
  };

  //
  const onImageLoad = (e) => {
    const img = e.target.files[0];

    setErrorImage("");

    if (img) {
      const error = validateImage(img);

      if (error) {
        setErrorImage(error);
        return;
      }
    }

    setImage(img);
  };

  const setDefault = () => {
    setTimeout(() => setStatus(STATUS_ENUM.IDLE), 250);

    setFirstName("");
    setLastName("");
    setStreet("");
    setStreetNumber("");
    setPostalCode("");
    setCity("");
    setCountry(COUNTRIES_LIST_DEFAULT);
    setMsg("");
    setImage("");
  };

  let form;

  switch (status) {
    case STATUS_ENUM.LOADING:
      form = (
        <StatusWrapper theme={theme} status={status}>
          <Spinner color={theme.fontColor} text="Odosielam..." />
        </StatusWrapper>
      );
      break;
    case STATUS_ENUM.ERROR:
      form = (
        <StatusWrapper theme={theme} status={status}>
          <Message type="error">
            <p>
              <i className="fas fa-times" />
              &nbsp; Chyba. Niečo sa pokazilo...
            </p>
            <Button
              value="Skúsiť znova"
              icon="fas fa-paper-plane"
              onClick={() => {
                setStatus(STATUS_ENUM.IDLE);
              }}
            />
          </Message>
        </StatusWrapper>
      );
      break;
    case STATUS_ENUM.FULFILLED:
      form = (
        <Message type="success">
          <p theme={theme}>Váš podnet bol úspešne pridaný. Ďakujeme!&nbsp;</p>
          {response && (
            <Button
              value="Zobraziť podnet"
              icon="fas fa-check"
              onClick={() => {
                // eslint-disable-next-line no-restricted-globals
                history.push(`/suggestion/${response.customId}`);
                handleSidebarClose();
                setDefault();
              }}
            />
          )}
        </Message>
      );
      break;
    default:
      form = (
        <FormElement onSubmit={handleSubmit}>
          {/*firstName*/}
          <FlexWrapper>
            <FlexItemFull>
              <TextInput
                label="Meno"
                value={firstName}
                onValueChange={(value) => setFirstName(value)}
                errorMsg={errorFirstName}
              />
            </FlexItemFull>
            {/*lastName*/}
            <FlexItemFull>
              <TextInput
                label="Priezvisko"
                value={lastName}
                onValueChange={(value) => setLastName(value)}
                errorMsg={errorLastName}
              />
            </FlexItemFull>
          </FlexWrapper>
          <FlexWrapper>
            {/*street*/}
            <FlexItemFull>
              <TextInput
                label="Ulica"
                value={street}
                onValueChange={(value) => setStreet(value)}
                errorMsg={errorStreet}
              />
            </FlexItemFull>
            {/*streetNumber*/}
            <FlexItemQuarter>
              <TextInput
                label="Popisné číslo"
                value={streetNumber}
                onValueChange={(value) => setStreetNumber(value)}
                errorMsg={errorStreetNumber}
              />
            </FlexItemQuarter>
          </FlexWrapper>
          <FlexWrapper>
            {/*city*/}
            <FlexItemFull>
              <TextInput
                label="Mesto"
                value={city}
                onValueChange={(value) => setCity(value)}
                errorMsg={errorCity}
              />
            </FlexItemFull>
            {/*postalCode*/}
            <FlexItemQuarter>
              <TextInput
                label="Smerové číslo"
                value={postalCode}
                onValueChange={(value) => setPostalCode(value)}
                errorMsg={errorPostalCode}
              />
            </FlexItemQuarter>
          </FlexWrapper>
          {/*country*/}
          <SelectMenu
            selected={country}
            options={countriesList}
            handleChange={(value) => setCountry(value)}
            defaultValue={COUNTRIES_LIST_DEFAULT}
            errorMsg={errorCountry}
          />

          {/*msg*/}
          <TextAreaInput
            value={msg}
            onValueChange={(value) => setMsg(value)}
            errorMsg={errorMsg}
          />

          {/*image*/}
          <FileInput
            image={image}
            onImageLoad={onImageLoad}
            s
            removeImage={() => setImage(null)}
            label="Fotopríloha"
            errorMsg={errorImage}
          />

          <SubmitWrapper>
            <Button
              value="Odoslať podnet"
              type="submit"
              icon="fas fa-paper-plane"
              disabled={status === STATUS_ENUM.LOADING}
            />
          </SubmitWrapper>
        </FormElement>
      );
  }

  return (
    <>
      <SidebarElement isOpen={isOpen} theme={theme}>
        <SidebarHeader>
          <Title theme={theme}>Pridať podnet</Title>
          <ButtonClose
            onClick={() => {
              handleSidebarClose();
              if (
                status !== STATUS_ENUM.IDLE ||
                status !== STATUS_ENUM.LOADING
              ) {
                setDefault();
              }
            }}
            theme={theme}
          >
            <i className="fas fa-times" />
          </ButtonClose>
        </SidebarHeader>
        {form}
      </SidebarElement>
      {isOpen && <Background isOpen={isOpen} ref={backgroundRef} />}
    </>
  );
};

export default Sidebar;
