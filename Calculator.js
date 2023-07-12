import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
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
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
`;

function Calculator() {
  const [display, setDisplay] = useState("");
  const [operand1, setOperand1] = useState(null);
  const [operator, setOperator] = useState(null);

  const handleNumber = (number) => {
    setDisplay(display + number);
  };

  const handleOperator = (op) => {
    setOperand1(parseFloat(display));
    setOperator(op);
    setDisplay(display + ' ' + op + ' ');
  };

  const handleEqual = () => {
    const operand2 = parseFloat(display.split(' ')[2]);

    if (operator === "+") {
      setDisplay(operand1 + operand2 + '');
    } else if (operator === "-") {
      setDisplay(operand1 - operand2 + '');
    } else if (operator === "*") {
      setDisplay(operand1 * operand2 + '');
    } else if (operator === "/") {
      setDisplay(operand1 / operand2 + '');
    }

    setOperator(null);
    setOperand1(null);
  };

  return (
    <Container>
      <Display>{display}</Display>
      <ButtonGrid>
        {[7, 8, 9, '+', 4, 5, 6, '-', 1, 2, 3, '*', 0, '=', '/'].map((button) => (
          <Button 
            key={button} 
            onClick={() => {
              if (button === '=') handleEqual();
              else if ('+-*/'.includes(button)) handleOperator(button);
              else handleNumber(button);
            }}
          >
            {button}
          </Button>
        ))}
        <Button onClick={() => setDisplay("")}>C</Button>
      </ButtonGrid>
    </Container>
  );
}

export default Calculator;
