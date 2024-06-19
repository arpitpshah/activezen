import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { FaUser, FaLock, FaEnvelope, FaMapMarkerAlt, FaLeaf, FaBullseye } from 'react-icons/fa';
import Select from 'react-select';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { register } from '../actions/userActions';

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

const StyledLink = styled(Link)`
  color: #e0e5ec;
  &:hover {
    color: #cfd6de;
    text-decoration: none;
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

const validationSchema = Yup.object().shape({
  fname: Yup.string().required('First name is required'),
  lname: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
  // Add additional fields validation here
});

const RegisterScreen = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    confirmPassword: '',
    // Initialize other fields here
  });

  const userRegister = useSelector(state => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (values) => {
    const selectedInterests = values.interests.map((interest) => interest.value);

    if (values.password !== values.confirmPassword) {
      // Handle password mismatch
    } else {
      dispatch(register(values.fname, values.lname, values.email, values.password,"", selectedInterests));
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ padding:'3rem' }}>
      <Formik
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
          <NeomorphicCard as={Form} onSubmit={handleSubmit}>
            <h2 className="mb-4">Sign Up</h2>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            {/* First Name and Last Name */}
            <Row>
              <Col md={6}>
                <NeomorphicInputGroup>
                  <InputGroup.Text><FaUser /></InputGroup.Text>
                  <NeomorphicFormControl
                    type="text"
                    name="fname"
                    value={values.fname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.fname && errors.fname}
                    placeholder="First Name"
                  />
                  <ErrorText>{touched.fname && errors.fname ? errors.fname : ""}</ErrorText>
                </NeomorphicInputGroup>
              </Col>
              <Col md={6}>
                <NeomorphicInputGroup>
                  <InputGroup.Text><FaUser /></InputGroup.Text>
                  <NeomorphicFormControl
                    type="text"
                    name="lname"
                    value={values.lname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.lname && errors.lname}
                    placeholder="Last Name"
                  />
                  <ErrorText>{touched.lname && errors.lname ? errors.lname : ""}</ErrorText>
                </NeomorphicInputGroup>
              </Col>
            </Row>
            {/* Email */}
            <NeomorphicInputGroup>
              <InputGroup.Text><FaEnvelope /></InputGroup.Text>
              <NeomorphicFormControl
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.email && errors.email}
                placeholder="Email Address"
              />
              <ErrorText>{touched.email && errors.email ? errors.email : ""}</ErrorText>
            </NeomorphicInputGroup>
            {/* Password */}
            <NeomorphicInputGroup>
              <InputGroup.Text><FaLock /></InputGroup.Text>
              <NeomorphicFormControl
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.password && errors.password}
                placeholder="Password"
              />
              <ErrorText>{touched.password && errors.password ? errors.password : ""}</ErrorText>
            </NeomorphicInputGroup>
            {/* Confirm Password */}
            <NeomorphicInputGroup>
              <InputGroup.Text><FaLock /></InputGroup.Text>
              <NeomorphicFormControl
                type="password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.confirmPassword && errors.confirmPassword}
                placeholder="Confirm Password"
              />
              <ErrorText>{touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : ""}</ErrorText>
            </NeomorphicInputGroup>
            {/* Interests Field */}
          <NeomorphicInputGroup>
            <Select
              isMulti
              styles={customSelectStyles}
              options={[
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
              ]}
              placeholder="Interests"
              name="interests"
              className="basic-multi-select"
              classNamePrefix="select"
              value={values.interests}
              onChange={(selectedOptions) =>
                setFieldValue('interests', selectedOptions)
            }
            />
          </NeomorphicInputGroup>

            {/* Submit Button */}
            <NeomorphicButton type="submit" className='w-100'>
              Register
            </NeomorphicButton>
            <Row className="py-3">
              <Col>
                Have an Account? <StyledLink to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</StyledLink>
              </Col>
            </Row>
          </NeomorphicCard>
        )}
      </Formik>
    </Container>
  );
};

export default RegisterScreen;
