import React from 'react';
import styled from 'styled-components';
import cardBack from '../assets/card.jpg';

const StyledSolitaireContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  justify-content: flex-start;
  box-sizing: border-box;
  overflow: auto;
  flex: 1;
  background-color: #006400;
`;

const StyledCard = styled.div`
  width: 70px;
  height: 100px;
  border: 1px solid black;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2em;
  margin: 5px;
`;

const StyledCardBack = styled(StyledCard)`
  background-image: url(${cardBack});
  background-size: cover;
`;

const StyledDeck = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

function Solitaire() {
  const deck = Array(52).fill(null);

  return (
    <StyledSolitaireContainer>
      <StyledDeck>
        {deck.map((card, i) => (
          <StyledCardBack key={i} />
        ))}
      </StyledDeck>
    </StyledSolitaireContainer>
  );
}

export default Solitaire;
