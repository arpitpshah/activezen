import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Container, Card, InputGroup, FormControl, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage  } from 'formik';
import { FaUser, FaKey  } from 'react-icons/fa';
import * as Yup from 'yup';
import styled from 'styled-components';

import Message from '../components/Message';
import Loader from '../components/Loader';
import { login } from '../actions/userActions';
import ReCAPTCHA from 'react-google-recaptcha';

const NeomorphicCard = styled.div`
  max-width: 650px;  // Increased size of card
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
  padding:4rem;
  margin:auto
`

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required'),
});

const LoginScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const { search } = useLocation();
  const redirect = new URLSearchParams(search).get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{height:'84vh'}}>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          dispatch(login(values.email, values.password, recaptchaToken));
        }}
      >
        {({ errors, touched, handleChange, handleBlur }) => (
          <NeomorphicCard>
            <h2 className="text-center mb-4">Sign In</h2>
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form>
              <NeomorphicInputGroup>
                <InputGroup.Text>
                  <FaUser size={20} />
                </InputGroup.Text>
                <NeomorphicFormControl
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.email && errors.email}
                />
                <ErrorMessage name="email" component={ErrorText} />
              </NeomorphicInputGroup>
              <NeomorphicInputGroup>
                <InputGroup.Text>
                  <FaKey size={20} />
                </InputGroup.Text>
                <NeomorphicFormControl
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.password && errors.password}
                />
                <ErrorMessage name="password" component={ErrorText} />
              </NeomorphicInputGroup>
              <NeomorphicButton type="submit" className="w-100">
                Sign In
              </NeomorphicButton>
            </Form>
            <div className="mt-3 text-center">
              New Customer?{' '}
              <StyledLink to={'/register'}>
                Register
              </StyledLink>
            </div>
            <div style={{ marginTop: '16px', marginBottom: '16px' }}>
                <ReCAPTCHA
                  sitekey='6Ld3qb4pAAAAACEoykw_IX7rR7cDmqfx7IDfoeDy' // Replace with your site key
                  onChange={(value) => setRecaptchaToken(value ?? '')}
                />
              </div>
          </NeomorphicCard>
        )}
      </Formik>
    </Container>
  );
};

export default LoginScreen;
