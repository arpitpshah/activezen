import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getLocationDetails, getWorkshopDetails, resetWorkshopDetails, getHobbyDetails  } from '../actions/workshopActions';
import styled, { ThemeProvider, createGlobalStyle  } from 'styled-components';
import { format } from 'date-fns';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUsers, FaTag, FaDollarSign, FaInfoCircle } from 'react-icons/fa';
import { Card, ListGroup, ListGroupItem, Button  } from 'react-bootstrap';

// Styled components
// Define theme for consistent styling


// Update the theme with new color codes
const theme = {
  background: '#283035', // Card background color
  text: '#A3B1C2', // General text color
  red: '#C72931', // Red color for important elements and errors
  white: '#FFFFFF', // White color for text in red background
};

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
    background-color: ${theme.background};
    color: ${theme.text};
  }
`;

// Update existing styled components with new color scheme
const DetailContainer = styled(Card)`
  margin: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px; // Rounded corners for a modern look
  background-color: ${theme.background}; // Card background color
  color: ${theme.text}; // General text color
`;;


const modernBlue = '#007bff';
const backgroundGray = '#f8f9fa';
const textGray = '#6c757d';
const errorRed = '#dc3545';
const successGreen = '#28a745';


// Update DetailTitle for the red background header
const DetailTitle = styled(Card.Header)`
  background-color: ${theme.background};
  color: ${theme.white};
  font-size: 1.5rem;
  padding: 15px 20px;
`;

// Update DetailText for the specific text color
const DetailText = styled.p`
  color: ${theme.text};
  margin-bottom: 5px;
  font-size: 0.9rem;
`;

const TagBadge = styled.span`
  display: inline-block;
  margin: 0 5px;
  padding: 5px 10px;
  background-color: ${backgroundGray};
  color: ${textGray};
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold; // if tags are important, make them bold
  &:hover {
    background-color: #...; // slightly darker shade for hover state
  }
`;

// Enhanced DetailListGroupItem for a more visual representation
const DetailListGroupItem = styled(ListGroupItem)`
  border: none;
  padding: 20px;
  font-size: 0.9rem;
  background-color: ${theme.background};
    color: ${theme.text};
  display: flex;
  align-items: center;
  svg {
    margin-right: 10px;
  }
`;



const DetailSubTitle = styled.h5`
  font-size: 1.2rem;
  color: ${props => props.theme.primaryColor};
  margin-bottom: 10px;
`;

const DetailListGroup = styled(ListGroup)`
  font-size: 0.9rem;
`;

const SoftErrorAlert = styled.div`
  background-color: ${theme.red};
  color: ${theme.white};
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  svg {
    margin-right: 10px;
  }
  background-color: rgba(199, 41, 49, 0.75); // use RGBA for a lighter red
  height: 20px; // reduce the height for less intensity
`;

const WorkshopDetailScreen = () => {
  const dispatch = useDispatch();
  const params = useParams();

  // Redux state selectors
  const workshopDetail = useSelector((state) => state.workshopDetails);
  const { loading, error, workshop } = workshopDetail;
  const locationDetails = useSelector((state) => state.locationDetails);

  const { locations, loading: loadingLocations, error: errorLocations } = locationDetails;

  const hobbyDetails = useSelector((state) => state.hobbyDetails);
const { hobbies, loading: loadingHobbyDetails, error: errorHobbyDetails } = hobbyDetails;
const [hobbyDetailsFetched, setHobbyDetailsFetched] = useState(false);
  useEffect(() => {
    dispatch(getWorkshopDetails(params.id));
    return () => {
      dispatch(resetWorkshopDetails());
    };
  }, [dispatch, params.id]);

  useEffect(() => {
    if (!loading && Object.keys(workshop).length!==0) {
      // Dispatch getLocationDetails only if category is "Sports"
      if (workshop.category === "Sports" && workshop.tags.length > 0) {
        const sportName = workshop.tags[0];
        const country = "Ireland"; // Replace with your logic for the country
        dispatch(getLocationDetails(sportName, country));
      }

      // Dispatch getHobbyDetails only if not already fetched
      if (!hobbyDetailsFetched) {
        const hobbyName = workshop.tags[0]; // Or use a different logic to get the hobby name
        if (hobbyName) {
          dispatch(getHobbyDetails(hobbyName.toLowerCase()));
          setHobbyDetailsFetched(true); // Set to true so we don't fetch again
        }
      }
    }
  }, [dispatch, loading, workshop, hobbyDetailsFetched]);


  // Date formatting function
  const formatDate = (date) => {
    return date ? format(new Date(date), 'PPP') : 'N/A';
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle /> 
    <DetailContainer>
      {loading && workshop ? (
        <Card.Body>Loading...</Card.Body>
      ) : error ? (
        <Card.Body>Error: {error}</Card.Body>
      ) : (
        <>
          <DetailTitle>{workshop.title}</DetailTitle>
          <Card.Body>
            <DetailText><strong>Category:</strong> {workshop.category}</DetailText>
            <DetailText><strong>Description:</strong> {workshop.description}</DetailText>
            <DetailText><strong>Location:</strong> {workshop.location}</DetailText>
            <DetailText><strong>Date:</strong> {formatDate(workshop.date)}</DetailText>
            <DetailText><strong>Instructor Bio:</strong> {workshop.instructorBio}</DetailText>
            <div>
              <strong>Tags:</strong> {workshop?.tags?.map((tag, index) => <TagBadge key={index}>{tag}</TagBadge>)}
            </div>
          </Card.Body>
          <DetailListGroup>
  <DetailListGroupItem>
    <FaDollarSign color={successGreen} />
    <strong>Price:</strong> ${workshop.price}
  </DetailListGroupItem>
  <DetailListGroupItem>
    <FaUsers color={modernBlue} />
    <strong>Participant Limit:</strong> {workshop.participantLimit}
  </DetailListGroupItem>
  <DetailListGroupItem>
    <FaTag color={textGray} />
    <strong>Registration Count:</strong> {workshop.registrationCount}
  </DetailListGroupItem>
</DetailListGroup>
          {loadingLocations ? (
            <Card.Body>Loading locations...</Card.Body>
            ) : locations && (
            workshop?.category?.toLowerCase()==="sports" && locations?.[0]?.details?.map((location) => (
                <Card.Body key={location._id}>
                <DetailSubTitle>{location.city}</DetailSubTitle>
                <DetailText><strong>Address:</strong> {location.address}</DetailText>
                <DetailText><strong>Pincode:</strong> {location.pincode}</DetailText>
                </Card.Body>
            ))
            )}
            {loadingHobbyDetails ? (
  <Card.Body>Loading hobby details...</Card.Body>
) : errorHobbyDetails ? (
  <SoftErrorAlert>
    <FaInfoCircle />
    Error loading hobby details: {errorHobbyDetails}
  </SoftErrorAlert>
) : hobbies?.length>0 && (
  <Card.Body>
    <DetailSubTitle>Difficulty Level: {hobbies?.[0]?.difficultyLevel}</DetailSubTitle>
    <DetailText>Equipment Needed: {hobbies?.[0]?.equipmentNeeded.join(', ')}</DetailText>
    <DetailText>Health Benefits: {hobbies?.[0]?.healthBenefits}</DetailText>
    <DetailText>Time Investment: {hobbies?.[0]?.timeInvestment}</DetailText>
  </Card.Body>
)}
        </>
      )}
    </DetailContainer>
    </ThemeProvider>
  );
};

export default WorkshopDetailScreen;
