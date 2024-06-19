// src/components/ForumHeader.js

import React from 'react';
import styled from 'styled-components';

const Header = styled.header`
  background-color: #6c5ce7; // This color should match the purple in the image
  color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 0;
`;

const TopicBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  background-color: #a29bfe; // A lighter shade of the header background
  border-radius: 0.5rem;
  margin-top: 1rem;
`;

const ForumHeader = () => {
  return (
    <Header>
      <Title>Discussion Forum</Title>
      <TopicBar>
        <div>Topics</div>
        <div>Replies</div>
        <div>Views</div>
        <div>Likes</div>
      </TopicBar>
    </Header>
  );
};

export default ForumHeader;
