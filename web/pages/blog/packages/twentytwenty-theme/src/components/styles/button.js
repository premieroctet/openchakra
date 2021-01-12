import { styled } from "frontity";

const Button = styled.button`
  background-color: ${(props) => props.bg};
  font-size: 1.7rem;
  border: none;
  border-radius: 0;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-weight: 600;
  letter-spacing: 0.0333em;
  line-height: 1.25;
  padding: 1.1em 1.44em;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
`;

export default Button;
