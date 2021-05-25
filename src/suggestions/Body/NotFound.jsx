import React from "react";
import styled from "styled-components";
import Message from "../Message";

const ErrorWrapper = styled.div`
  padding: 2rem;
`;

const NotFound = () => {
  return (
    <ErrorWrapper>
      <Message type="error">
        <p>
          <i className="fas fa-times" />
          &nbsp; Chyba. Niečo sa pokazilo...
        </p>
      </Message>
    </ErrorWrapper>
  );
};

export default NotFound;
