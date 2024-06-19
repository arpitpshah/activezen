import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listWorkshops } from '../actions/workshopActions';
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import WorkshopCard from '../components/WorkshopCard';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const workshopList = useSelector(state => state.workshopList);
  const { loading, error, workshops } = workshopList;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  
  useEffect(() => {
    if (userInfo && userInfo.interests) {
      
      dispatch(listWorkshops(""));
    }
  }, [dispatch, userInfo]);
  return (
    <div>
      <h1>Workshops</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {workshops.map((workshop) => (
            <Col key={workshop._id} sm={12} md={6} lg={4} xl={3}>
              <WorkshopCard workshop={workshop} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default HomeScreen
