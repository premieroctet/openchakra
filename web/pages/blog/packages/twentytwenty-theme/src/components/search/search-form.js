import { connect, styled } from "frontity";
import React, { useRef } from "react";
import ScreenReaderText from "../styles/screen-reader";
import Button from "../styles/button";
import Input from "../styles/input";

const SearchForm = ({ state, actions, libraries }) => {
  const parse = libraries.source.parse(state.router.link);
  const searchQuery = parse.query["s"];
  const { primary } = state.theme.colors;

  const { closeSearchModal } = actions.theme;
  // Keep a reference to the input so we can grab it's value on form submission
  const inputRef = useRef();

  const handleSubmit = (event) => {
    // Prevent page navigation
    event.preventDefault();

    // Get the input's value
    const searchString = inputRef.current.value;

    // If the typed search string is not empty
    // Better to trim write spaces as well
    if (searchString.trim().length > 0) {
      // Let's go search for blogs that match the search string
      actions.router.set(`/?s=${searchString.toLowerCase()}`);

      // Scroll the page to the top
      window.scrollTo(0, 0);

      // Close the search modal
      closeSearchModal();
    }
  };

  return (
    <Form role="search" aria-label="404 not found" onSubmit={handleSubmit}>
      <Label>
        <ScreenReaderText>Search for:</ScreenReaderText>
        <SearchInput
          type="search"
          defaultValue={searchQuery}
          placeholder="Search ..."
          ref={inputRef}
        />
      </Label>
      <SearchButton bg={primary} type="submit">
        Search
      </SearchButton>
    </Form>
  );
};

export default connect(SearchForm);

const Form = styled.form`
  align-items: stretch;
  display: flex;
  flex-wrap: nowrap;
  margin: 0 0 -0.8rem -0.8rem;
  justify-content: center;
  margin-top: 3rem;
`;

const Label = styled.label`
  align-items: stretch;
  display: flex;
  font-size: inherit;
  margin: 0;
  width: 100%;
`;

const SearchInput = styled(Input)`
  margin: 0 0 0.8rem 0.8rem;
`;

const SearchButton = styled(Button)`
  flex-shrink: 0;
  opacity: 1;
  transition: opacity 0.15s linear;
  margin: 0 0 0.8rem 0.8rem;
`;
