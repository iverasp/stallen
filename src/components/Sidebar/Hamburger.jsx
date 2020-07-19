import React from 'react';
import styled from 'styled-components';

const StyledHamburger = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  border-radius: 100%;
`;
const Line = styled.div`
  width: 100%;
  height: 8px;
  background: black;
`;

export const Hamburger = (props) => {
  const { onClick } = props;
  return (
    <StyledHamburger onClick={onClick}>
      <Line />
      <Line />
      <Line />
    </StyledHamburger>
  );
};
