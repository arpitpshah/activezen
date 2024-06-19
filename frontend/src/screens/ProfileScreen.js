import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col, InputGroup, FormControl, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, resetProfileUpdate, updateUserProfile } from '../actions/userActions';
import { FaUser, FaLock, FaEnvelope, FaMapMarkerAlt, FaLeaf, FaBullseye } from 'react-icons/fa';
import styled from 'styled-components';
import Select from 'react-select';

// Styled Components for modern look
const ProfileCard = styled(Card)`
  background: #f3f4f6;
  border: none;
  border-radius: 20px;
  padding: 20px;
  margin-top: 20px;
`;

const ProfileHeader = styled(Card.Header)`
  background-color: #4a4e69;
  color: #fff;
  border-radius: 15px 15px 0 0;
  font-size: 1.5rem;
`;

const SaveButton = styled(Button)`
  background-color: #22223b;
  border: none;
  &:hover {
    background-color: #4a4e69;
  }
`;
const customSelectStyles = {
  control: (provided) => ({
    ...provided,
    background: '#303A40',
    color: '#e0e5ec',
    borderColor: 'transparent',
    boxShadow: 'inset 6px 6px 12px #23272e, inset -6px -6px 12px #3e464e',
    borderRadius: '10px',
    padding: '5px',
  }),
  menu: (provided) => ({
    ...provided,
    background: '#303A40',
    color: '#e0e5ec',
  }),
  option: (provided, state) => ({
    ...provided,
    background: state.isFocused ? '#3e464e' : '#303A40',
    color: '#e0e5ec',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#e0e5ec',
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: '#e0e5ec',
    ':hover': {
      backgroundColor: '#303A40',
      color: '#e0e5ec',
    },
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    color: '#e0e5ec',
  }),
};

const NeomorphicCard = styled.div`
  max-width: 950px;  // Increased size of card
  background: #303A40;
  border-radius: 20px;
  padding: 3rem;  // Increased padding
  box-shadow: 11px 11px 22px #23272e, -11px -11px 22px #3e464e;
  color: #e0e5ec;
  margin: auto;
  text-align: center;
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
    color: #303A40;
  }
  &:invalid {
    // Styles for when the input is invalid
    box-shadow: 0 0 0 0.25rem rgba(255, 100, 100, 0.25);
  }
`;


const ErrorText = styled.div`
  color: #ff6565; // Red color for errors
  font-size: 1rem; // Small font size for the error text
  position: absolute; // Position absolutely within the relative parent
  bottom: -30px; // Position below the input field
  left: 0; // Align to the left
  width: 100%; // Full width to ensure it doesn't overflow
  text-align:left;
`;

const containerClass = styled.div`
  padding:12rem;
  margin:auto
`

// Main Component
const ProfileScreen = () => {
  //const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [location, setLocation] = useState('');
  const [interests, setInterests] = useState('');
  const [dietaryPreferences, setDietaryPreferences] = useState('');
  const [goals, setGoals] = useState('');
  const [message, setMessage] = useState('');
  const interestsOptions = [
    { value: 'yoga', label: 'Yoga' },
    { value: 'swimming', label: 'Swimming' },
    { value: 'painting', label: 'Painting' },
    { value: 'creativity', label: 'Creativity' }, 
    { value: 'design', label: 'Design' }, 
    { value: 'digital_art', label: 'Digital Art' }, 
    { value: 'programming', label: 'Programming' },
    { value: 'technology', label: 'Technology' },
    { value: 'coding', label: 'Coding' }, 
    { value: 'innovation', label: 'Innovation' }, 
    { value: 'software_development', label: 'Software Development' }, 
    { value: 'fitness', label: 'Fitness' }, 
    { value: 'wellness', label: 'Wellness' },
    { value: 'mental_health', label: 'Mental Health' }, 
    { value: 'physical_health', label: 'Physical Health' }, 
    { value: 'cooking', label: 'Cooking' }, 
    { value: 'cuisine', label: 'Cuisine' },
    { value: 'food', label: 'Food' }, 
    { value: 'culinary', label: 'Culinary' }, 
    { value: 'baking', label: 'Baking' }, 
    { value: 'hiking', label: 'Hiking' }, 
    { value: 'camping', label: 'Camping' }, 
    { value: 'adventure', label: 'Adventure' }, 
    { value: 'outdoor', label: 'Outdoor' },
    { value: 'extreme_sports', label: 'Extreme Sports' }, 
    { value: 'music', label: 'Music' }, 
    { value: 'instruments', label: 'Instruments' }, 
    { value: 'performing_arts', label: 'Performing Arts' }, 
    { value: 'theater', label: 'Theater' }, 
    { value: 'dance', label: 'Dance' }, 
    { value: 'team_sports', label: 'Team Sports' }, 
    { value: 'gym', label: 'Gym' }, 
    { value: 'home_improvement', label: 'Home Improvement' }, 
    { value: 'diy', label: 'DIY' }, 
    { value: 'sustainable_living', label: 'Sustainable Living' }
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const handleInterestsChange = (selectedOptions) => {

    setInterests(selectedOptions || []);
  };

  useEffect(() => {
    return () => {
      dispatch(resetProfileUpdate());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else if (!user || !user.interests) {
      dispatch(getUserDetails('profile'));
    } else {
      // Directly use the array of interests from the user object
      setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
        setLocation(user.location);
        const interestsArray = user.interests.map(interest => ({ value: interest, label: interest }));
        setInterests(interestsArray);
      setGoals(user.goals);
      // Set other user details
    }
  }, [dispatch, navigate, userInfo, user]);

 
  
  const setUserFormFields = (userData) => {
    setFirstName(userData.firstName)
    setLastName(userData.lastName)
    setEmail(userData.email || '');
    setLocation(userData.location || '');
    setInterests(userData.interests?.join(', ') || '');
    setDietaryPreferences(userData.dietaryPreferences?.join(', ') || '');
    setGoals(userData.goals?.join(', ') || '');
  };
  

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      const interestsToSubmit = interests.map(interest => interest.value);
      dispatch(updateUserProfile({ id: user._id, firstName,lastName, email, location, interests: interestsToSubmit, dietaryPreferences, goals }));
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height:'84vh' }}>
      <NeomorphicCard>
        <h2 className="mb-4">User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">Profile Updated</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          {/* First Name and Last Name */}
          <Row>
            <Col md={6}>
              <NeomorphicInputGroup >
                <InputGroup.Text><FaUser /></InputGroup.Text>
                <NeomorphicFormControl
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </NeomorphicInputGroup>
            </Col>
            <Col md={6}>
              <NeomorphicInputGroup >
                <InputGroup.Text><FaUser /></InputGroup.Text>
                <NeomorphicFormControl
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </NeomorphicInputGroup>
            </Col>
          </Row>
          
          {/* Email */}
          <NeomorphicInputGroup >
            <InputGroup.Text><FaEnvelope /></InputGroup.Text>
            <NeomorphicFormControl
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </NeomorphicInputGroup>
          
          
          {/* Interests */}
          <NeomorphicInputGroup>
            <InputGroup.Text><FaLeaf /></InputGroup.Text>
            <Select
              styles={customSelectStyles}
              options={interestsOptions}
              isMulti
              name="interests"
              value={interests}
              onChange={handleInterestsChange} // Simplified for brevity
              className="basic-multi-select"
              classNamePrefix="select"
              style={{width:'95%'}}
            />
          </NeomorphicInputGroup>
          
          <NeomorphicButton type="submit">
            Save Changes
          </NeomorphicButton>
        </Form>
      </NeomorphicCard>
    </Container>
  );
};

export default ProfileScreen;
