import { styled } from "frontity";

const Input = styled.input`
  background: #fff;
  border-radius: 0;
  border-style: solid;
  border-color: #dcd7ca;
  border-width: 0.1rem;
  box-shadow: none;
  display: block;
  font-size: 1.6rem;
  letter-spacing: -0.015em;
  max-width: 100%;
  padding: 1.5rem 1.8rem;
  width: 100%;

  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    display: none;
  }
`;

export default Input;
