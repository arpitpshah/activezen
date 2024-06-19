// src/components/MessageCard.js

import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-right: 1rem;
`;

const Content = styled.div`
  flex-grow: 1;
`;

const Stats = styled.div`
  display: flex;
  & > div {
    margin-left: 1rem;
    text-align: center;
  }
`;

const MessageCard = ({ message }) => {
  return (
    <Card>
      <Avatar src={message.user.avatar} alt={message.user.name} />
      <Content>
        <p>{message.content}</p>
        <span>SampleName · 1 day ago</span>
      </Content>
      <Stats>
        <div>{message.replies.length} Replies</div>
        <div>{message.views} Views</div>
        <div>{message.likes.length} Likes</div>
      </Stats>
    </Card>
  );
};

export default MessageCard;
