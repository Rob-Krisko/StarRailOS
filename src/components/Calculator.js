import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 0 5px 10px;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.8);
  color: #0ff;
`;

const Display = styled.div`
  width: 90%;
  height: 50px;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  color: #0ff;
  text-align: right;
  margin-bottom: 10px;
  border: 1px solid #0ff;
  overflow: auto;
  font-size: max(1.2em, min(4vw, 22px));
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 5px;
  width: 100%;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: rgba(0, 0, 0, 0.6);
  border: none;
  border-radius: 5px;
  color: #0ff;
  box-shadow: 0 0 5px #0ff;
  &:hover {
    background-color: rgba(0, 255, 255, 0.1);
  }
  &:active {
    background-color: rgba(0, 255, 255, 0.2);
  }
`;

const calculatorButtons = [
  ['7', '8', '9', '/'],
  ['4', '5', '6', '*'],
  ['1', '2', '3', '-'],
  ['0', '.', '=', '+'],
  ['√', 'x²', '%', 'C'],
];

function Calculator() {
  const [display, setDisplay] = useState('');

  function handleCalcButtonClick(buttonValue) {
    switch (buttonValue) {
      case '=':
        try {
          setDisplay(eval(display));
        } catch {
          setDisplay("Error");
        }
        break;
      case 'C':
        setDisplay('');
        break;
      case '√':
        setDisplay(Math.sqrt(display));
        break;
      case 'x²':
        setDisplay(Math.pow(display, 2));
        break;
      case '%':
        setDisplay(display / 100);
        break;
      default:
        setDisplay(display + buttonValue);
        break;
    }
  }

  return (
    <Container>
      <Display>{display}</Display>
      <ButtonGrid>
        {calculatorButtons.map((row, rowIndex) => (
            row.map((buttonValue, index) => (
              <Button 
                key={index} 
                onClick={() => handleCalcButtonClick(buttonValue)}
              >
                {buttonValue}
              </Button>
            ))
        ))}
      </ButtonGrid>
    </Container>
  );
}

export default Calculator;