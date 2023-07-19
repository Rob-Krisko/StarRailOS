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
  position: relative;
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

const StyledFoundationCard = styled(StyledCard)`
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

function Card({ card, index, StyledCard, onDragStart, foundationIndex }) {
  const suitsIcons = {
    hearts: <GiHearts color="#ff0000"/>,
    diamonds: <GiDiamonds color="#ff0000"/>,
    clubs: <GiClubs />,
    spades: <GiSpades />
  };

  const handleDragStartEvent = (e) => {
    if(onDragStart) {
      e.stopPropagation();
      onDragStart(e, index, undefined, foundationIndex);
    }
  }

  return card.faceUp ? 
    <StyledCardFront 
      as={StyledCard}
      color={card.suit === 'hearts' || card.suit === 'diamonds' ? '#ff0000' : '#000'} 
      image={card.src} 
      index={index}
      draggable 
      onDragStart={handleDragStartEvent}
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



const isDifferentColor = (card1, card2) => {
  const redSuits = ['hearts', 'diamonds'];
  return redSuits.includes(card1.suit) !== redSuits.includes(card2.suit);
};



function Solitaire() {
  const [deck, setDeck] = useState([]);
  const [tableau, setTableau] = useState([]);
  const [discard, setDiscard] = useState([]);
  const [foundations, setFoundations] = useState([[], [], [], []]);

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
    } else if (discard.length > 0) {
      // Reverse the discard pile before setting it as the new deck
      setDeck(discard.reverse().map(card => ({ ...card, faceUp: false })));
      setDiscard([]);
    }
  };
  

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragStart = (e, cardIndex, stackIndex) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ stack: stackIndex, index: cardIndex }));
  };

  const handleDiscardDragStart = (e) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ pile: 'discard', index: discard.length - 1 }));
  };

  const handleFoundationDragStart = (e, foundationIndex) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ pile: 'foundation', foundation: foundationIndex, index: foundations[foundationIndex].length - 1 }));
  };
  

  const handleDrop = (e, toStackIndex) => {
    e.preventDefault();
    const from = JSON.parse(e.dataTransfer.getData('text/plain'));
  
    if (from.stack === undefined && from.pile !== 'discard' && from.pile !== 'foundation') return;
    if (from.stack === toStackIndex) return; // Can't move cards within the same stack
  
    let fromStack;
    let movedCards;
    if (from.stack !== undefined) {
      fromStack = [...tableau[from.stack]];
      movedCards = fromStack.splice(from.index);
    } else if (from.pile === 'discard') {
      fromStack = [...discard];
      movedCards = fromStack.splice(-1); // When moving from discard, only ever move the last card
    } else {
      fromStack = [...foundations[from.foundation]];
      movedCards = fromStack.splice(-1); // When moving from foundation, only ever move the last card
    }
  
    const toStack = [...tableau[toStackIndex]];
  
    // Moving cards to a stack is only valid if the stack is empty or the top card of the stack is of a different color and of one value greater
    if (toStack.length === 0 || (isDifferentColor(toStack[toStack.length - 1], movedCards[0]) && valueOrder[toStack[toStack.length - 1].value] === valueOrder[movedCards[0].value] + 1)) {
      toStack.push(...movedCards);
    } else if (from.pile === 'foundation') {
      // If card is from foundation, it can be moved to tableau regardless
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
  
    if (from.pile === 'discard') {
      setDiscard(fromStack);
    } else if (from.pile === 'foundation') {
      setFoundations(prevFoundations => prevFoundations.map((stack, i) => i === from.foundation ? fromStack : stack));
    }
  
    // After a card is moved, if the last card in the stack is face-down, flip it
    if (fromStack.length > 0 && !fromStack[fromStack.length - 1].faceUp) {
      const newFromStack = [...fromStack];
      newFromStack[newFromStack.length - 1].faceUp = true;
      if (from.stack !== undefined) {
        setTableau(prevTableau => prevTableau.map((stack, i) => i === from.stack ? newFromStack : stack));
      }
    }
  };
  
  
  
  
  
  
  
  const handleFoundationDrop = (e, foundationIndex) => {
    e.preventDefault();
    const from = JSON.parse(e.dataTransfer.getData('text/plain'));
  
    if (from.stack === undefined && from.pile !== 'discard') return;
  
    const fromStack = from.pile ? [...discard] : [...tableau[from.stack]];
    const card = fromStack[from.index];
    const foundationStack = [...foundations[foundationIndex]];
  
    if (foundationStack.length === 0 && card.value === 'A' ||
      (foundationStack.length > 0 && card.suit === foundationStack[0].suit && valueOrder[card.value] === valueOrder[foundationStack[foundationStack.length - 1].value] + 1)) {
      fromStack.splice(from.index, 1);
      foundationStack.push(card);
  
      // After a card is moved, if the last card in the stack is face-down, flip it
      if (fromStack.length > 0 && !fromStack[fromStack.length - 1].faceUp) {
        fromStack[fromStack.length - 1].faceUp = true;
      }
  
      if (from.pile) {
        setDiscard(fromStack);
      } else {
        setTableau(prevTableau => prevTableau.map((stack, i) => i === from.stack ? fromStack : stack));
      }
  
      setFoundations(prevFoundations => prevFoundations.map((stack, i) => i === foundationIndex ? foundationStack : stack));
    }
  };
  


  return (
    <StyledSolitaireContainer>
      <StyledArea>
        <StyledDeck onClick={flipCard}>
          {deck.length > 0 ? <Card card={{ faceUp: false }} StyledCard={StyledCardBack} /> : <StyledOutline />}
        </StyledDeck>
        <StyledDiscard>
          {discard.length > 0 && (
            <Card 
              key={discard[discard.length - 1].id} 
              card={discard[discard.length - 1]} 
              StyledCard={StyledDiscardCard} 
              onDragStart={(e) => handleDiscardDragStart(e)}
            />
          )}
        </StyledDiscard>
  
        {foundations.map((foundationStack, foundationIndex) => (
          <StyledFoundation
            key={foundationIndex}
            onDrop={(e) => {
              e.stopPropagation(); 
              handleFoundationDrop(e, foundationIndex);
            }}
            onDragOver={handleDragOver}
          >
            {foundationStack.length > 0 
              ? <Card 
              key={foundationStack[foundationStack.length - 1].id}
              card={foundationStack[foundationStack.length - 1]} 
              StyledCard={StyledFoundationCard} 
              onDragStart={(e) => handleFoundationDragStart(e, foundationIndex)}
            />
            
              : <StyledOutline />
            }
          </StyledFoundation>
        ))}
      </StyledArea>
      <StyledArea style={{ justifyContent: 'flex-start', marginBottom: '50px' }}>
        {tableau.map((stack, stackIndex) => (
          <StyledStackFlex key={stackIndex} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, stackIndex)}>
            {stack.length === 0 
              ? <StyledOutline /> 
              : stack.map((card, cardIndex) => (
                <Card
                  key={card.id}
                  card={card}
                  index={cardIndex}
                  StyledCard={StyledStackCardFirst}
                  draggable
                  onDragStart={(e) => handleDragStart(e, cardIndex, stackIndex)}
                />
              ))}
          </StyledStackFlex>
        ))}
      </StyledArea>
    </StyledSolitaireContainer>
  );
  
  
}

export default Solitaire;
