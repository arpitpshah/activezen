import React from 'react';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';


const colors = {
  background: '#303A40', 
  primary: '#C72931', 
  textPrimary: '#FFFFFF', 
  textSecondary: '#A3B1C2', 
};


const circularImage = css`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
`;


const Grid = styled.div`
  display: grid;
  gap: 16px;
  padding: 16px;
  background-color: ${({path})=>path==='workshop'?'none':colors.background};
  width: ${({ fullWidth }) => fullWidth ? '100%' : 'auto'};
`;



const StyledCard = styled(Card)`
  background: ${colors.background};
  border: none;
  border-radius: 15px; 
  color: ${colors.textPrimary};
  overflow: hidden; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
  transition: transform 0.2s; 
  width: ${({ fullWidth }) => fullWidth ? '100%' : '300px'};
  &:hover {
    transform: scale(1.05);
  }
`;

const StyledCardBody = styled(Card.Body)`
  padding: 20px;
  display: flex; 
  flex-direction: column; 
`;

const StyledCardTitle = styled(Card.Title)`
  font-family: 'Roboto', sans-serif;
  font-size: 1.2rem;
  color: ${colors.textPrimary};
`;

const StyledCardText = styled(Card.Text)`
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  color: ${colors.textSecondary};
  height: 3rem; 
  overflow: hidden; 
  text-overflow: ellipsis; 
  display: -webkit-box;
  -webkit-line-clamp: 3; 
  -webkit-box-orient: vertical;
`;

const StyledButton = styled(Button)`
  background-color: ${colors.primary};
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  font-family: 'Roboto', sans-serif;
  transition: background-color 0.2s;
  z-index:999;
  &:hover {
    background-color: darken(${colors.primary}, 10%); 
  }
`;

const ReadMoreButton = styled.button`
  background: ${colors.primary};
  color: ${colors.textPrimary};
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.25s;
  &:hover {
    background: #a2202c; 
  }
`;

const StyledCardTextContainer = styled.div`
  flex: 1; 
  margin-bottom: 1rem; 
  overflow: hidden; 
`;



const WorkshopCard1 = ({ workshop,fullWidth, image, path }) => {
  
  const navigate = useNavigate();
  const handleReadMoreClick = (path) => {
 
    navigate(`/${path}/${workshop._id}`);
  };

  const imageUrl = process.env.PUBLIC_URL + '/images/';

  return (
    <StyledCard fullWidth={fullWidth}>
    {image?<Card.Img variant="top" src={imageUrl+workshop.imageName} style={{ height:'300px',borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }} />:null}
    <StyledCardBody>
      <StyledCardTitle>{workshop.title?workshop.title:workshop.name}</StyledCardTitle>
      <StyledCardTextContainer>
      <StyledCardText>{workshop.description}</StyledCardText>
      </StyledCardTextContainer>
      
      <StyledButton onClick={()=>handleReadMoreClick(path)}>Read More</StyledButton>
    </StyledCardBody>
  </StyledCard>
  );
};


const WorkshopCard = ({ workshop, fullWidth, image, path }) => {
  
  return (
    <Grid fullWidth={fullWidth} path={path}>
        <WorkshopCard1 key={workshop._id} workshop={workshop} fullWidth={fullWidth} image={image} path={path} />
    </Grid>
  );
};

export default WorkshopCard;
