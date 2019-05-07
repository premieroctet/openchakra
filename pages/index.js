import React from 'react';
import styled from 'styled-components';
import NavbarContainer from '../containers/NavbarContainer/NavbarContainer';

const Title = styled.h1`
  color: green;
`;

const Home = () => (
  <div>
    <NavbarContainer />
    <Title>My Alfred</Title>
  </div>
);

export default Home;
