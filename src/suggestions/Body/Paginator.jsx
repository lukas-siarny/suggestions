import { rem, transparentize } from "polished";
import * as React from "react";
import styled, { css } from "styled-components";
import { ThemeContext } from "../../Theme";
import { THEME_TRANSITION } from "../../config";

const Wrapper = styled.div`
  display: flex;
`;

const Button = styled.button`
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ isCurrent, theme }) =>
    !isCurrent ? theme.backgroundColor : theme.colorAccent};
  border: none;
  outline: none;
  position: relative;
  font-family: ${({ theme }) => theme.fontFamily};
  color: ${({ theme }) => theme.fontColor};
  font-size: 0.875rem;
  position: relative;
  border-radius: 4px;
  cursor: pointer;
  text-transform: uppercase;
  color: ${({ isCurrent, theme }) => (!isCurrent ? theme.fontColor : "#fff")};
  transition: ${THEME_TRANSITION};
  font-size: 1rem;
  opacity: ${({ disabled }) => (disabled ? "0.5" : "1")};
  margin: 0 0.25rem;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  &:last-child {
    margin-right: 0;
  }

  &:first-child {
    margin-left: 0;
  }

  &:hover,
  &:focus,
  &:active {
    background: ${({ theme, disabled }) =>
      disabled ? "" : theme.colorAccentDark};
    color: #fff;
  }
`;

const Dots = styled.div`
  margin: 0 ${rem(4)};
  width: ${rem(37)};
  height: ${rem(48)};
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
`;

const PagintaroInfoWrapper = styled.div`
  height: ${rem(48)};
  margin-left: ${rem(16)};
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.fontColor};
  transition: ${THEME_TRANSITION};
`;

export default React.memo(({ loading, page, limit, total, onPageChange }) => {
  const { theme } = React.useContext(ThemeContext);

  const totalPages = Math.ceil(total / limit);
  const isAtTheBeggining = page === 1;
  const isAtTheEnd = page >= totalPages;

  //kolko stranok pred current page a za current page musi existovat, aby sa zobrazili bodky
  const minPages = 2;

  const getButtonsBefore = () => {
    const btnsBefore = [];
    if (page - minPages > 1) {
      for (let i = minPages; i > 0; i--) {
        btnsBefore.push({
          page: page - i,
        });
      }
    } else {
      const btnsCount = page - 2;
      for (let i = btnsCount; i > 0; i--) {
        btnsBefore.push({
          page: page - i,
        });
      }
    }
    return btnsBefore;
  };

  const getButtonsAfter = () => {
    const btnsAfter = [];
    if (page + minPages < totalPages) {
      for (let i = 0; i < minPages; i++) {
        btnsAfter.push({
          page: page + i + 1,
        });
      }
    } else {
      const btnsCount = totalPages - page - 1;
      for (let i = 0; i < btnsCount; i++) {
        btnsAfter.push({
          page: page + i + 1,
        });
      }
    }
    return btnsAfter;
  };

  const buttonsBefore = getButtonsBefore();
  const buttonsAfter = getButtonsAfter();

  const renderedButtonsBefore = (
    <>
      <Button
        theme={theme}
        isCurrent={isAtTheBeggining}
        onClick={() => {
          if (!isAtTheBeggining) {
            onPageChange(1);
          }
        }}
        data-testid="Paginator-Arrow-left-to-end"
      >
        {1}
      </Button>
      {buttonsBefore.length === minPages && buttonsBefore[0].page !== 2 && (
        <Dots>...</Dots>
      )}
      {buttonsBefore.length !== 0 &&
        buttonsBefore.map((button, i) => (
          <Button
            theme={theme}
            key={i}
            onClick={() => {
              onPageChange(button.page);
            }}
          >
            {button.page}
          </Button>
        ))}
    </>
  );

  const renderedButtonsAfter = (
    <>
      {buttonsAfter.length !== 0 &&
        buttonsAfter.map((button, i) => (
          <Button
            theme={theme}
            key={i}
            onClick={() => {
              onPageChange(button.page);
            }}
          >
            {button.page}
          </Button>
        ))}
      {buttonsAfter.length === minPages &&
        buttonsAfter[buttonsAfter.length - 1].page !== totalPages - 1 && (
          <Dots>...</Dots>
        )}
      {totalPages > 1 && (
        <Button
          theme={theme}
          isCurrent={isAtTheEnd}
          onClick={() => {
            if (!isAtTheEnd) {
              onPageChange(totalPages);
            }
          }}
        >
          {totalPages}
        </Button>
      )}
    </>
  );

  const renderedButtons = (
    <>
      {renderedButtonsBefore}
      {page !== 1 && page !== totalPages && (
        <Button theme={theme} isCurrent={true}>
          {page}
        </Button>
      )}
      {renderedButtonsAfter}
    </>
  );

  const count = page === totalPages ? total : page * limit;

  return (
    <Wrapper>
      {renderedButtons}
      <PagintaroInfoWrapper theme={theme}>
        {count + " z " + total}
      </PagintaroInfoWrapper>
    </Wrapper>
  );
});
