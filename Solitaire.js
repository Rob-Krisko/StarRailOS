import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import cardBack from '../assets/card.jpg';
import { GiHearts, GiDiamonds, GiClubs, GiSpades } from "react-icons/gi";
import ace from '../assets/cards/ace.jpg';
import two from '../assets/cards/two.jpg';
import three from '../assets/cards/three.jpg';
import four from '../assets/cards/four.jpg';
import five from '../assets/cards/five.jpg';
import six from '../assets/cards/six.jpg';
import seven from '../assets/cards/seven.jpg';
import eight from '../assets/cards/eight.jpg';
import nine from '../assets/cards/nine.jpg';
import ten from '../assets/cards/ten.jpg';
import jack from '../assets/cards/jack.jpg';
import queen from '../assets/cards/queen.jpg';
import king from '../assets/cards/king.jpg';

const StyledSolitaireContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  background-color: #006400;
`;

const StyledDeck = styled.div`
  display: flex;
  position: relative;
  width: 100px;
  height: 150px;
  margin-right: 20px;
`;

const StyledArea = styled.div`
  display: flex;
  justify-content: space-around; /* This is the updated line */
  align-items: flex-start;
  width: 100%;
  margin-bottom: 10px;   /* Adjust this value as needed */
`;

const StyledCard = styled.div`
  width: 100px;
  height: 150px;
  border: 1px solid black;
  background-color: white;
  font-size: 1.3em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledCardValue = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  &.top {
    transform: rotate(0deg);
  }
  &.bottom {
    transform: rotate(180deg);
  }
`;

const StyledCardBack = styled(StyledCard)`
  background-image: url(${cardBack});
  background-size: cover;
`;

const StyledCardFront = styled(StyledCard)`
  background-color: #fff;
  color: ${({ color }) => color || "#000"};
  background-image: ${({ image }) => `url(${image})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  div {
    background-color: rgba(255, 255, 255, 0.7);
    width: 100%;
  }
`;

const StyledStackFlex = styled.div`
  position: relative;
  width: 250px;
  margin: 0 20px; // add or adjust this line
`;

const StyledStackCardFirst = styled(StyledCard)`
  position: absolute;
  top: ${({ index }) => `${index * 28}px`};
  z-index: ${({ index }) => index};
  background-image: ${({ image }) => `url(${image})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  div {
    background-color: rgba(255, 255, 255, 0.7);
    width: 100%;
  }
`;

const StyledOutline = styled.div`
  width: 100px;
  height: 150px;
  border: 1px dashed #000;
`;

const StyledFoundation = styled(StyledOutline)`
  margin-left: 150px;
`;

const StyledDiscard = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100px;
  height: 150px;
  position: relative;
  margin-right: 20px;
  overflow: hidden;
`;

const StyledDiscardCard = styled(StyledCard)`
  position: absolute;
  top: 0;
  left: 0;
  background-image: ${({ image }) => `url(${image})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  div {
    background-color: rgba(255, 255, 255, 0.7);
    width: 100%;
  }
`;

const DiscardPileContainer = styled.div`
  position: relative;
  width: 100px;
  height: 145px;
  overflow: hidden;
`;

const cardImages = {
  'A': ace,
  '2': two,
  '3': three,
  '4': four,
  '5': five,
  '6': six,
  '7': seven,
  '8': eight,
  '9': nine,
  '10': ten,
  'J': jack,
  'Q': queen,
  'K': king
};

function generateDeck() {
  let deck = [];
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  let id = 0;

  // Generate cards for each suit
  for(let i = 0; i < suits.length; i++) {
    for(let j = 0; j < values.length; j++) {
      deck.push({
        id: id++,  
        suit: suits[i],
        value: values[j],
        faceUp: false,
        src: cardImages[values[j]]
      });
    }
  }

  // Shuffle deck
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
}

const valueOrder = {
  'A': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  '10': 10,
  'J': 11,
  'Q': 12,
  'K': 13
};

function Card({ card, index, StyledCard }) {
  console.log(card);
  const suitsIcons = {
    hearts: <GiHearts color="#ff0000"/>,
    diamonds: <GiDiamonds color="#ff0000"/>,
    clubs: <GiClubs />,
    spades: <GiSpades />
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ stack: card.stack, index }));
  }

  return card.faceUp ? 
  <StyledCardFront 
    as={StyledCard}
    color={card.suit === 'hearts' || card.suit === 'diamonds' ? '#ff0000' : '#000'} 
    image={card.src} 
    index={index}
    draggable 
    onDragStart={handleDragStart}
  >
    <StyledCardValue className="top">{card.value} {suitsIcons[card.suit]}</StyledCardValue>
    <StyledCardValue className="bottom">{card.value} {suitsIcons[card.suit]}</StyledCardValue>
  </StyledCardFront> : 
  <StyledCardBack 
    as={StyledCard}
    image={cardBack}
    index={index}
  />
}

function Solitaire() {
  const [deck, setDeck] = useState([]);
  const [tableau, setTableau] = useState([]);
  const [discard, setDiscard] = useState([]);
  const [selectedCards, setSelectedCards] = useState(null);
  const [movingCards, setMovingCards] = useState(null);


  useEffect(() => {
    const newDeck = generateDeck();
    const newTableau = Array(7).fill(null).map((_, i) => newDeck.splice(0, i + 1));
    newTableau.forEach(stack => stack[stack.length - 1].faceUp = true);

    setDeck(newDeck.slice(0, 24).map(card => ({ ...card, faceUp: false })));
    setTableau(newTableau);
    setDiscard([]);
  }, []);

  const flipCard = () => {
    if (deck.length > 0) {
      const newDeck = [...deck];
      const newDiscard = [...discard];
      const card = newDeck.pop();
      card.faceUp = true;
      newDiscard.push(card);
      setDeck(newDeck);
      setDiscard(newDiscard);
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault();
  }

  const handleDragStart = (e, cardIndex, stackIndex) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ stack: stackIndex, index: cardIndex }));
  }

  const handleDrop = (e, toStackIndex) => {
    e.preventDefault();
    const from = JSON.parse(e.dataTransfer.getData('text/plain'));

    if (from.stack === toStackIndex) return; // Can't move cards within the same stack

    const fromStack = [...tableau[from.stack]];
    const toStack = [...tableau[toStackIndex]];
    const movedCards = fromStack.splice(fromStack.length - from.index - 1);

    // Moving cards to a stack is only valid if the stack is empty or the top card of the stack is of a different color and greater value
    if (toStack.length === 0 || (toStack[toStack.length - 1].color !== movedCards[0].color && valueOrder[toStack[toStack.length - 1].value] === valueOrder[movedCards[0].value] + 1)) {
      toStack.push(...movedCards);
    } else {
      // Invalid move, revert the operation
      fromStack.push(...movedCards);
    }

    setTableau(prevTableau => prevTableau.map((stack, i) => {
      if (i === from.stack) return fromStack;
      if (i === toStackIndex) return toStack;
      return stack;
    }));

    setMovingCards(null);
  };

  return (
    <StyledSolitaireContainer>
      <StyledArea>
        <StyledDeck onClick={flipCard}>
          {deck.length > 0 ? <Card card={{ faceUp: false }} /> : <StyledOutline />}
        </StyledDeck>
        <StyledDiscard>
          {discard.length > 0 && (
            <Card 
              key={discard[discard.length - 1].id} 
              card={discard[discard.length - 1]} 
              StyledCard={StyledDiscardCard} 
            />
          )}
        </StyledDiscard>
        <StyledFoundation />
        <StyledFoundation />
        <StyledFoundation />
        <StyledFoundation />
      </StyledArea>
      <StyledArea style={{ justifyContent: 'flex-start', marginBottom: '50px' }}>
        {tableau.map((stack, stackIndex) => (
          <StyledStackFlex
            key={stackIndex}
          >
            {stack.map((card, cardIndex) => (
              <Card
                key={card.id}
                card={card}
                index={cardIndex}
                StyledCard={StyledStackCardFirst}
                draggable
                onDragStart={(e) => handleDragStart(e, cardIndex, stackIndex)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, stackIndex)}
              />

            ))}
            {movingCards && stackIndex === movingCards.location.stack && 
              <StyledStackCardFirst
                as={Card}
                card={movingCards.cards[0]}
                index={-1}
                style={{position: 'fixed', pointerEvents: 'none', zIndex: 1000, top: `${movingCards.position.y}px`, left: `${movingCards.position.x}px`}}
              />
            }
          </StyledStackFlex>
        ))}

      </StyledArea>
    </StyledSolitaireContainer>
  );
}

export default Solitaire;
