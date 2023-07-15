import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 0 5px 10px; // added 5px padding left and right
  box-sizing: border-box; // added box-sizing
`;



const Display = styled.div`
  width: 90%;
  height: 50px;
  padding: 10px;
  background-color: #fff;
  text-align: right;
  margin-bottom: 10px;
  border: 1px solid #000;
  overflow: auto;
  font-size: max(1.2em, min(4vw, 22px)); // min-max font size
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
  background: linear-gradient(to bottom, #9dd5fa, #90cfea);
  border: none;
  border-radius: 5px;
  box-shadow: 0px 5px #5b8e99;
  color: #ffffff;
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
