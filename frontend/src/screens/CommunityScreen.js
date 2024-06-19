// src/screens/CommunityScreen.js

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMessages } from '../reducers/communitySlice';
import MessageItem from '../components/MessageItem';
import Loader from '../components/Loader';
import Message from '../components/Message';
import MessageForm from '../components/MessageForm';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

const BoardTitle = styled.h2`
  margin-bottom: 1rem;
  color:#ffffff;
  font-family: 'Roboto', sans-serif; // Modern sans-serif font
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
`;

const CommunityScreen = () => {
  const dispatch = useDispatch();
  const { messages, status, error } = useSelector((state) => state.community);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMessages());
    }
  }, [status, dispatch]);

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <BoardTitle>Community Board</BoardTitle>
          {status === 'loading' && <Loader />}
          {status === 'failed' && <Message variant="danger">{error}</Message>}
          {status === 'succeeded' && (
            messages.map((message) => (
              <MessageItem key={message._id} message={message} />
            ))
          )}
          <MessageForm />
        </Col>
      </Row>
    </Container>
  );
};

export default CommunityScreen;
