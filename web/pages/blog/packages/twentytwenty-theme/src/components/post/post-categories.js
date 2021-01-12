import { connect, styled, decode } from "frontity";
import React from "react";
import ScreenReaderText from "../styles/screen-reader";
import Link from "../link";

const PostCategories = ({ categories }) => {
  // Remove empty or undefined categories
  const postCategories = categories.filter(Boolean);

  if (postCategories.length === 0) {
    return null;
  }

  return (
    <EntryCategories>
      <ScreenReaderText>Categories</ScreenReaderText>

      <EntryCategoriesInner>
        {postCategories.map((category) => (
          <CategoryTag key={category.id} link={category.link}>
            {decode(category.name)}
          </CategoryTag>
        ))}
      </EntryCategoriesInner>
    </EntryCategories>
  );
};

export default connect(PostCategories);

const EntryCategories = styled.div`
  line-height: 1.25;
  margin-bottom: 2rem;

  @media (min-width: 700px) {
    margin-bottom: 3rem;
  }
`;

const EntryCategoriesInner = styled.div`
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  margin: -0.5rem 0 0 -1rem;

  @media (min-width: 700px) {
    margin: -1rem 0 0 -2rem;
  }
`;

const CategoryTag = styled(Link)`
  border-bottom: 0.15rem solid currentColor;
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 0.036666667em;
  margin: 0.5rem 0 0 1rem;
  text-decoration: none;
  text-transform: uppercase;

  @media (min-width: 700px) {
    font-size: 1.5rem;
    margin: 1rem 0 0 2rem;
  }

  transition: border-bottom-color 150ms;
  :hover {
    border-bottom-color: transparent;
  }
`;
