import React from "react";
import { styled, connect } from "frontity";
import SearchForm from "./search/search-form";
import SectionContainer from "./styles/section-container";

const description404 = (
  <>
    The page you were looking for could not be found. It might have been
    removed, renamed, or did not exist in the first place. Search for:
  </>
);

const description = (
  <>
    Don&apos;t panic! Seems like you encountered an error. If this persists,
    <a href="https://community.frontity.org"> let us know </a> or try refreshing
    your browser. You can also search for:
  </>
);

// The Error page component
const ErrorPage = ({ state }) => {
  const data = state.source.get(state.router.link);

  const title = "Oops, something bad happened";
  const title404 = "Oops! 404";

  return (
    <Container size="thin">
      <EntryTitle>{data.is404 ? title404 : title}</EntryTitle>
      <IntroText>{data.is404 ? description404 : description}</IntroText>
      <SearchForm />
    </Container>
  );
};

export default connect(ErrorPage);

export const EntryTitle = styled.h1`
  margin: 0;

  @media (min-width: 700px) {
    font-size: 6.4rem !important;
  }

  @media (min-width: 1200px) {
    font-size: 8.4rem !important;
  }
`;

const IntroText = styled.div`
  margin-top: 2rem;
  line-height: 1.5;

  @media (min-width: 700px) {
    font-size: 2rem;
    margin-top: 2.5rem;
  }
`;

const Container = styled(SectionContainer)`
  text-align: center;
  padding-top: 8rem;
`;
