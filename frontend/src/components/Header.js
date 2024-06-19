import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'
import './Header.css';

const Header = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <header>
       <Navbar variant="dark" expand="lg" collapseOnSelect>
      <Container style={{maxWidth:'100%'}}>
        <LinkContainer to='/'>
          <Navbar.Brand>ActiveZen</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <LinkContainer to='/community'>
              <Nav.Link><i className='fas fa-shopping-cart'></i>Community</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/trivia'>
              <Nav.Link><i className='fas fa-shopping-cart'></i>Trivia</Nav.Link>
            </LinkContainer>
            {userInfo ? (
              <NavDropdown title={userInfo.name} id='username'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ):(
              <LinkContainer to='/login'>
                <Nav.Link><i className='fas fa-user'></i>Sign In</Nav.Link>
              </LinkContainer>
            )}
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
  )
}

export default Header
