import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { listSkillById, resetSkillDetails } from '../actions/skillActions';
import { listWorkshops } from '../actions/workshopActions';
import { Container, Row, Col, Card, ListGroup, Spinner, Alert,Button } from 'react-bootstrap';
import styled from 'styled-components';
import WorkshopCard from '../components/WorkshopCard';

const colors = {
  textPrimary: '#FFFFFF', // White color for primary text
  background: '#283035', // Dark background color from the inspiration
};

const StyledContainer = styled(Container)`
  font-family: 'Roboto', sans-serif;
  color: #A3B1C2; // Dark gray text color as per the provided color palette
  background-color: ${colors.background};
  padding: 2rem;
  border-radius: 15px; // Consistent rounded corners
  margin-top: 2rem; // Space from the top of the viewport
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); // Depth with shadow
  max-width:100%;
`;

const StyledHeader = styled(Row)`
  border-bottom: 1px solid #ddd;
  margin-bottom: 2rem;
`;

const StyledTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #C72931; // Red color for the title from the color palette
`;

const StyledDescription = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const StyledSection = styled(Row)`
  margin-bottom: 1rem;
`;

const StyledSectionTitle = styled.h2`
  color: #354249; // Dark color for subheadings from the color palette
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const StyledCard = styled(Card)`
  background: #303A40; // White background
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StyledButton = styled(Button)`
  background-color: #283035; // Dark gray button color from the color palette
  border: none;
  &:hover {
    background-color: #303A40; // Slightly darker on hover
  }
`;

const SkillDetailScreen = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const skillDetails = useSelector((state) => state.skillDetails);
  const { loading, error, skillData } = skillDetails;

  const workshopList = useSelector((state) => state.workshopList);
  const { loading: loadingWorkshops, error: errorWorkshops, workshops } = workshopList;

  useEffect(() => {
    dispatch(listSkillById(params.id));
    return () => {
      dispatch(resetSkillDetails());
    };
  }, [dispatch, params.id]);

  useEffect(() => {
    if (skillData?.name) {
      const keywords = skillData.name.split(/\s+&\s+|\s+/).join(',');
      dispatch(listWorkshops(keywords));
    }
  }, [dispatch, skillData]);

  if (loading) {
    return <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>;
  }

  if (error) {
    return <Alert variant="danger">Error: {error}</Alert>;
  }

  return (
    <StyledContainer className="my-4">

      {skillData ? (
        <>
          <StyledHeader>
            <Col>
              <StyledTitle>{skillData.name}</StyledTitle>
              <StyledDescription>{skillData.description}</StyledDescription>
            </Col>
          </StyledHeader>

          <StyledSection>
            <Col md={4}>
              <h2>Benefits</h2>
              <p>{skillData.benefits}</p>
            </Col>
            <Col md={4}>
              <h2>Success Stories</h2>
              <p>{skillData.successStories}</p>
            </Col>
            <Col md={4}>
              <h2>Resources</h2>
              <ListGroup>
                {skillData.resources && skillData.resources.map((resource, index) => (
                  <ListGroup.Item key={index} action href={`https://${resource.toLowerCase()}.com`}>
                    {resource}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            </StyledSection>

          <h2 className="mt-4">Related Workshops</h2>
          <Row>
          {loadingWorkshops?(<Card.Body>Loading workshops...</Card.Body>
            ) :workshops && (
              workshops.map(workshop => (
            <WorkshopCard key={workshop._id} workshop={workshop} fullWidth={false} image={false} path="workshop" />
          ))
            )}
          
    </Row>
        </>
      ) : (
        <Alert variant="warning">Skill not found</Alert>
      )}
    </StyledContainer>
  );
};

export default SkillDetailScreen;
