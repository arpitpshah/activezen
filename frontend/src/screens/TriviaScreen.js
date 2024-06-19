import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col, Alert, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import styled from 'styled-components';
// Base colors and shadows for neomorphic effect
const baseColor = '#303A40';
const shadowColorDark = '#23272e';
const shadowColorLight = '#3e464e';
const textColor = '#e0e5ec';

// Reusable neomorphic inset shadow for inputs and cards
const neomorphicInset = `
  box-shadow: inset 6px 6px 12px ${shadowColorDark}, inset -6px -6px 12px ${shadowColorLight};
`;

// Reusable neomorphic extrude shadow for buttons
const neomorphicExtrude = `
  box-shadow: 4px 4px 8px ${shadowColorDark}, -4px -4px 8px ${shadowColorLight};
`;

// Styled components for the trivia screen
const TriviaContainer = styled.div`
  color: ${textColor};
  font-family: 'Roboto', sans-serif;
  margin-top:5vh;
`;

const NeomorphicCard = styled(Card)`
  background: ${baseColor};
  color: ${textColor};
  border-radius: 20px;
  padding: 2rem;
  margin: auto;
  margin-bottom: 2rem; // Added bottom margin for spacing
  max-width: 950px; // Match community board width
  ${neomorphicInset}
`;

const NeomorphicButton = styled(Button)`
  background-color: ${baseColor};
  color: ${textColor};
  border: none;
  padding: 12px 15px;
  border-radius: 30px;
  ${neomorphicExtrude}
  font-size: 1rem;
  &:hover {
    background-color: #cad2d9;
    color: ${baseColor};
  }
  &:disabled, &:disabled:hover {
    background-color: ${shadowColorDark}; // Dark color for disabled state
    color: #6c757d; // Muted color for disabled text
    cursor: not-allowed;
    box-shadow: none; // Remove shadow in disabled state
  }
`;

const NeomorphicListGroupItem = styled(Card)`
  background: ${baseColor};
  color: ${textColor};
  margin-bottom: 0.5rem; // Space between list items
  border-radius: 10px;
  ${neomorphicInset}
  &.list-group-item-action {
    &:hover {
      background-color: #cad2d9;
    }
  }
`;

const QuestionTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem; // Space below the question
  text-align: center;
`;

const OptionButton = styled(Button)`
background-color: ${baseColor};
  color: ${textColor};
  border: none;
  padding: 12px 15px;
  border-radius: 30px;
  ${neomorphicExtrude}
  font-size: 1rem;
  display: block;
  width: 100%;
  text-align: left;
  margin-bottom: 0.5rem; // Space between buttons
  &:hover {
    color: ${textColor};
    background-color: #cad2d9;
  }
`;

const ScoreAlert = styled.div`
  background: ${baseColor};
  color: ${textColor};
  border-radius: 20px;
  padding: 1.5rem;
  ${neomorphicInset}
  text-align: center;
  margin-top: 2rem; // Space above the alert
`;

const fetchTriviaData = async () => {
  try {
    const response = await axios.get('https://in7li6mhe2.execute-api.eu-west-1.amazonaws.com/favorite-dish');
    return response.data;
  } catch (error) {
    console.error('Error fetching trivia data:', error);
    return [];
  }
};

const shuffleOptions = (data) => {
  return [...data].sort(() => 0.5 - Math.random());
};

const generateOptions = (correctAnswer, allData) => {
  let options = allData
    .filter(item => item.favoriteDish !== correctAnswer)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)
    .map(item => item.favoriteDish);
  options.push(correctAnswer);
  return shuffleOptions(options);
};

const TriviaScreen = () => {
  const [triviaData, setTriviaData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [responses, setResponses] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetchTriviaData().then(data => {
      const shuffledData = shuffleOptions(data).slice(0, 5);
      setTriviaData(shuffledData);
      setOptions(generateOptions(shuffledData[0].favoriteDish, shuffledData));
    });
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    const isCorrect = option === triviaData[currentQuestionIndex].favoriteDish;
    const newResponse = {
      question: `What is the favorite dish of ${triviaData[currentQuestionIndex].country}?`,
      answer: option,
      correctAnswer: triviaData[currentQuestionIndex].favoriteDish,
      correct: isCorrect
    };
    setResponses(prev => [...prev, newResponse]);
  };

  const handleNextClick = () => {
    if (currentQuestionIndex < triviaData.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedOption(null);
      setOptions(generateOptions(triviaData[currentQuestionIndex + 1].favoriteDish, triviaData));
    } else {
      setGameOver(true);
    }
  };

  return (
    <TriviaContainer>
      {!gameOver ? (
        triviaData.length > 0 ? (
          <Row className="justify-content-md-center">
            <Col md={8}>
              <NeomorphicCard>
                <Card.Header>Trivia Question {currentQuestionIndex + 1}</Card.Header>
                <Card.Body>
                  <QuestionTitle>What is the favorite dish of {triviaData[currentQuestionIndex].country}?</QuestionTitle>
                  {options.map((option, index) => (
                    <OptionButton
                      key={index}
                      variant={selectedOption === option ? 'success' : 'outline-primary'}
                      onClick={() => handleOptionClick(option)}
                      className="m-2"
                      disabled={!!selectedOption}
                    >
                      {option}
                    </OptionButton>
                  ))}
                </Card.Body>
                <Card.Footer>
                  <NeomorphicButton onClick={handleNextClick} disabled={!selectedOption}>
                    {currentQuestionIndex < triviaData.length - 1 ? 'Next Question' : 'Finish Trivia'}
                  </NeomorphicButton>
                </Card.Footer>
              </NeomorphicCard>
            </Col>
          </Row>
        ) : (
          <div>Loading questions...</div>
        )
      ) : (
        <ScoreAlert variant="success">
          <Alert.Heading>Trivia Complete!</Alert.Heading>
          <p>Your performance:</p>
          <NeomorphicListGroupItem>
            {responses.map((response, index) => (
              <ListGroup.Item key={index} variant={response.correct ? 'success' : 'danger'}>
                {response.question} <br />
                Your answer: {response.answer} <br />
                Correct answer: {response.correctAnswer}
              </ListGroup.Item>
            ))}
          </NeomorphicListGroupItem>
        </ScoreAlert>
      )}
    </TriviaContainer>
  );
};

export default TriviaScreen;
