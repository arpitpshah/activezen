import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likeMessage, dislikeMessage, deleteMessage, editMessage } from '../reducers/communitySlice';
import ReplyForm from './ReplyForm';
import styled from 'styled-components';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { InputGroup, FormControl } from 'react-bootstrap';
import { PersonFill, PencilSquare, TrashFill, HandThumbsUpFill, HandThumbsDownFill,SaveFill  } from 'react-bootstrap-icons';

const MessageContainer = styled.div`
  background: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  box-shadow: 0 3px 6px rgba(0,0,0,0.1);
  font-family: 'Roboto', sans-serif;
`;

const MessageActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom:1.5rem;
`;

const StyledButton = styled(Button)`
  padding: 0.5rem 1rem;
  &:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const ReplySection = styled.div`
  padding: 0.5rem 1rem;
  background-color: #f0f0f0;
  border-top: 1px solid #e7e7e7;
`;


const EditIcon = styled(PencilSquare)`
  color: #17a2b8; // Or any other color of your choice
  width:2rem;
  height:2rem;
  cursor: pointer;
  &:hover {
    color: #138496; // Darken color on hover
  }
`;

const DeleteIcon = styled(TrashFill)`
  color: #dc3545; // Or any other color of your choice
  width:2rem;
  height:2rem;
  cursor: pointer;
  &:hover {
    color: #c82333; // Darken color on hover
  }
`;

const StyledThumbUpIcon = styled(HandThumbsUpFill)`
  margin-right: 5px;
`;

const StyledThumbDownIcon = styled(HandThumbsDownFill)`
  margin-right: 5px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SaveButton = styled(StyledButton)`
  display: flex;
  align-items: center;
  justify-content: center;
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

const NeomorphicFormControl = styled(FormControl)`
  background: #303A40;
  color: #e0e5ec;
  border: none;
  padding: 15px;  // Increased padding for larger input fields
  border-radius: 10px;
  box-shadow: inset 6px 6px 12px #23272e, inset -6px -6px 12px #3e464e;
  &::placeholder {
    color: #e0e5ec;
  }
  &:focus {
    color: #e0e5ec;
  }
  &:invalid {
    // Styles for when the input is invalid
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
const NeomorphicTextArea = styled(FormControl)`
  background: #303A40;
  color: #e0e5ec;
  border: none;
  padding: 1rem; // Increased padding for a larger text field
  border-radius: 10px;
  box-shadow: inset 6px 6px 12px #23272e, inset -6px -6px 12px #3e464e;
  margin-top: 1rem; // Add space above the text field
  margin-bottom: 1rem; // Add space below the text field
  width: calc(100% - 2rem); // Adjust width if necessary
  font-size: 1rem; // Adjust font size for better readability
  resize: none; // To prevent textarea from being resizable
  font-family: 'Roboto', sans-serif;
  &:focus {
    color: #e0e5ec;
  }
  &::placeholder {
    color: #e0e5ec;
  }
`;

const NeomorphicCard = styled.div`
  max-width: 950px;
  background: #303A40;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 11px 11px 22px #23272e, -11px -11px 22px #3e464e;
  color: #e0e5ec;
  margin: auto;
  margin-bottom: 2rem; // Added bottom margin for spacing between cards
  text-align: center;
`;

// Adjust the Accordion styles if needed
const StyledAccordion = styled(Accordion)`
  background: transparent;
  border: none;
  & .accordion-button {
    background: #303A40;
    color: #e0e5ec;
    border: none;
    box-shadow: none;
  }
  & .accordion-button:not(.collapsed) {
    background: #303A40;
    color: #e0e5ec;
  }
  & .accordion-body {
    background: #303A40;
    color: #e0e5ec;
  }
`;

const ReplyWrapper = styled.div`
  background: #303A40;
  color: #e0e5ec;
  padding: 0.5rem;
  border-radius: 10px;
  margin-top: 0.5rem;
`;

const UserName = styled.div`
  font-weight: bold;
  color: #e0e5ec;
  padding-bottom: 0.5rem; 
`;
const NeomorphicIcon = styled.div`
  background-color: #303A40;
  color: #e0e5ec;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 32px; 
  height: 32px;
  margin-right: 8px;
  box-shadow: 3px 3px 6px #23272e, -3px -3px 6px #3e464e;
`;
const ActionIconWrapper = styled(IconWrapper)`
  
`;
const NeomorphicIconWrapper = styled.div`
  background-color: #303A40;
  color: #e0e5ec;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 40px; 
  height: 40px; 
  margin-right: 0.5rem;
  box-shadow: 4px 4px 8px #23272e, -4px -4px 8px #3e464e;
  cursor: pointer;

  &:hover {
    background-color: #cad2d9;
    color: #303A40;
  }

  svg {
    width: 20px; 
    height: 20px; 
  }
`;


const UserNameWithIcon = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  color: #e0e5ec;
  font-weight: bold;

  svg {
    margin-right: 0.5rem;
  }
`;

const MessageContent = styled.div`
  background: #39424e; 
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1rem; 
  text-align: left; 
  font-size: 0.9rem; 
`;

const MessageItem = ({ message }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(message.content);
  const { userInfo } = useSelector((state) => state.userLogin);
  const isUserMessage = userInfo?._id === (message?.user?._id? message?.user?._id:message?.user);
  const [showReplies, setShowReplies] = useState(false);
 

  const handleLike = () => {
    dispatch(likeMessage(message._id));
  };

  const handleDislike = () => {
    dispatch(dislikeMessage(message._id));
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      dispatch(deleteMessage(message._id));
    }
  };

  const handleEdit = () => {
    
    if (isEditing) {
      dispatch(editMessage({ messageId: message._id, content: editedContent }));
    }
    setIsEditing(!isEditing);
  };

  const handleEditChange = (event) => {
    setEditedContent(event.target.value);
  };
  
  return (
    <NeomorphicCard as="div"> 
      <UserNameWithIcon>
        <PersonFill />
        {message.user.firstName}
      </UserNameWithIcon>

      {isEditing ? (
        <NeomorphicTextArea
        as="textarea"
        value={editedContent}
        onChange={handleEditChange}
      />
    ) : (
      <MessageContent>
        {message.content}
      </MessageContent>
    )}
      <MessageActions>
        <NeomorphicIcon onClick={handleLike}>
          <HandThumbsUpFill />
        </NeomorphicIcon>
        <span>{message.likes.length}</span>
        <NeomorphicIcon onClick={handleDislike}>
          <HandThumbsDownFill />
        </NeomorphicIcon>
        <span>{message.dislikes.length}</span>
        {isUserMessage && (
          <ActionIconWrapper>
            {!isEditing ? (
              <>
                <NeomorphicIcon onClick={() => setIsEditing(true)}>
                  <EditIcon />
                </NeomorphicIcon>
                <NeomorphicIcon onClick={handleDelete}>
                  <DeleteIcon />
                </NeomorphicIcon>
              </>
            ) : (
              <NeomorphicIconWrapper  as="div" onClick={handleEdit}>
                <SaveFill />
              </NeomorphicIconWrapper >
            )}
          </ActionIconWrapper>
        )}
      </MessageActions>
      <StyledAccordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header onClick={() => setShowReplies(!showReplies)}>
            {showReplies ? `Show Replies (${message.replies.length})` : `Hide Replies`}
          </Accordion.Header>
          <Accordion.Body>
            <ReplySection>
              {message.replies.map((reply) => (
                <ReplyWrapper key={reply._id}>
                  <UserNameWithIcon>
    <PersonFill />
    {reply.firstName}
  </UserNameWithIcon>
            <MessageContent>
                  {reply.content}
                </MessageContent>
                </ReplyWrapper>
              ))}
              <ReplyForm parentMessageId={message._id} />
            </ReplySection>
          </Accordion.Body>
        </Accordion.Item>
      </StyledAccordion>
    </NeomorphicCard>
  );
};

export default MessageItem;
