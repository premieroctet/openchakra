import { styled } from "frontity";
import ScreenReaderText from "./screen-reader";

const SkipLink = styled(ScreenReaderText)`
  left: -9999rem;
  top: 2.5rem;
  z-index: 999999999;
  text-decoration: underline;

  &:focus,
  &:active {
    display: block;
    left: 6px;
    top: 7px;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    line-height: normal;
    padding: 15px 23px 14px;
    z-index: 100000;
    right: auto;
  }
`;

export default SkipLink;
