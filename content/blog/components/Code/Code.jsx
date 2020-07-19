import React from 'react';
import styled from 'styled-components';

const StyledCode = styled.div`
  width: 100%;
  white-space: nowrap;
  overflow-x: scroll;
  font-family: monospace;
`;

export const Code = ({ text }) => {

return (
  <StyledCode>
    {text}
  </StyledCode>
);
}
