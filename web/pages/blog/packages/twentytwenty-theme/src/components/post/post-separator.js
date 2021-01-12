import { styled } from "frontity";

const PostSeparator = styled.hr`
  color: #6d6d6d;
  margin-left: auto;
  margin-right: auto;
  width: calc(100% - 4rem);
  opacity: 0.6;
  background: linear-gradient(
    to left,
    currentColor calc(50% - 16px),
    transparent calc(50% - 16px),
    transparent calc(50% + 16px),
    currentColor calc(50% + 16px)
  );
  background-color: transparent !important;
  border: none;
  height: 0.1rem;
  overflow: visible;
  position: relative;
  max-width: 120rem;

  @media (min-width: 700px) {
    width: calc(100% - 8rem);
    margin: 8rem auto;
  }

  &:before,
  &:after {
    background: currentColor;
    content: "";
    display: block;
    height: 1.6rem;
    position: absolute;
    top: calc(50% - 0.8rem);
    transform: rotate(22.5deg);
    width: 0.1rem;
  }

  &:before {
    left: calc(50% - 0.5rem);
  }

  &:after {
    right: calc(50% - 0.5rem);
  }
`;

export default PostSeparator;
