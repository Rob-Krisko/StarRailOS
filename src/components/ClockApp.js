import React from 'react';
import styled from 'styled-components';
import Clock from './Clock';
import Alarm from './Alarm';

const ClockAppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1em;
  color: #fff;
  background: #000;  // adjust the color as per your space theme
`;

const ClockApp = () => {
  return (
    <ClockAppWrapper>
      <Clock />
      <Alarm />
    </ClockAppWrapper>
  );
};

export default ClockApp;
