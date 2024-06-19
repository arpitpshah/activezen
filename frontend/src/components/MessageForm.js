// src/components/MessageForm.js

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postMessage } from '../reducers/communitySlice';
import styled from 'styled-components';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import axios from 'axios'


const StyledTextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 0.5rem;
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;
const NeomorphicCard = styled.div`
  max-width: 950px;  // Increased size of card
  background: #303A40;
  border-radius: 20px;
  padding: 3rem;  // Increased padding
  box-shadow: 11px 11px 22px #23272e, -11px -11px 22px #3e464e;
  color: #e0e5ec;
  margin: auto;
  text-align: center;
  width:50vw;
`;

const NeomorphicButton = styled(Button)`
  background-color: #e0e5ec;
  color: #303A40;
  border: none;
  padding: 12px 15px;  // Increased padding for a larger button
  border-radius: 30px;
  box-shadow: 4px 4px 8px #23272e, -4px -4px 8px #3e464e;
  margin-top: 2rem;  // Increased spacing
  font-size: 1.1rem;  // Larger font size
  &:hover {
    background-color: #cad2d9;
  }
`;

const NeomorphicInputGroup = styled(InputGroup)`
  position: relative;
  margin-bottom: 2.5rem;  // Increased spacing
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;

const NeomorphicFormControl = styled(FormControl)`
  background: #303A40;
  color: #e0e5ec;
  border: none;
  width: 95%; /* Set width relative to its container */
  max-width: 950px; /* Ensure it doesn't exceed a certain width */
  padding: 15px;
  border-radius: 10px;
  box-shadow: inset 6px 6px 12px #23272e, inset -6px -6px 12px #3e464e;
  font-family: 'Roboto', sans-serif;
  &::placeholder {
    color: #e0e5ec;
  }
  &:focus {
    color: #e0e5ec;
    outline: none; /* Removes the default focus outline */
  }
  &:invalid {
    box-shadow: 0 0 0 0.25rem rgba(255, 100, 100, 0.25);
  }
`;
const NeomorphicActionBtn = styled(NeomorphicButton)`
padding: 0.5rem;
font-size: 1rem;
margin-right: 0.5rem;
&:hover {
  background-color: #cad2d9;
}
`;

const MessageForm = () => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const checkProfanity = async (text) => {
    try {
      const response = await axios.post('https://qvddafph4i.execute-api.us-east-1.amazonaws.com/dev/check-language', { text });
      
      return response.data.containsFoulLanguage;
    } catch (error) {
      console.error('Error checking profanity:', error);
      return false;  // Assume no profanity if API fails
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.trim()) {
      const containsProfanity = await checkProfanity(content);
      if (!containsProfanity) {
        dispatch(postMessage(content));
        setContent('');
        setError('');
      } else {
        setError('Your message contains inappropriate language. Please revise.');
      }
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <NeomorphicFormControl
          as="textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a message..."
          isInvalid={!!error}
        />
        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
        <NeomorphicButton type="submit">
          Post Message
        </NeomorphicButton>
      </form>
    </FormContainer>
  );
};

export default MessageForm;
