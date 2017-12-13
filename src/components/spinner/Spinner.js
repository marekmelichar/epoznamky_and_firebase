import React from 'react';
import styled, { keyframes } from 'styled-components';

const Wrapper = styled.div`
  margin-top: 38px;
  width: 100%;
  height: 30px;
  float: left;
  position: relative;

  background: transparent;
`;

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Loading = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  margin: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;

  border: 5px solid rgba(0, 0, 0, 0.1);
  border-bottom-color: #2DB5CF;
  animation: ${rotate360} 2s linear 0s infinite;
`;



const Spinner = () => {
  return(
    <Wrapper>
      <Loading />
    </Wrapper>
  );
}

export default Spinner;
