import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listWorkshops } from '../actions/workshopActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import WorkshopCard from '../components/WorkshopCard';
import styled from 'styled-components';
import { listSkills } from '../actions/skillActions';
import { Container, Row, Col, Carousel } from 'react-bootstrap';

// Colors from the inspiration image
const colors = {
  textPrimary: '#FFFFFF', // White color for primary text
  background: '#283035', // Dark background color from the inspiration
};

const Heading = styled.h1`
  color: ${colors.textPrimary};
  font-family: 'Roboto', sans-serif; // Modern sans-serif font
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem; // Extra space for aesthetic spacing
  margin-top: 3rem;
  text-transform: uppercase; // Optional: Uppercase for a design choice
`;

// Override the bootstrap Container to match the theme
const StyledContainer = styled(Container)`
  background-color: ${colors.background};
  padding: 2rem;
  border-radius: 15px; // Consistent rounded corners
  margin-top: 2rem; // Space from the top of the viewport
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); // Depth with shadow
  max-width:100%;
`;

const CarouselWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;

  .carousel-control-prev, .carousel-control-next {
    width: 5%; // Increase hit area for navigation arrows
  }
`;

const StyledCarousel = styled(Carousel)`
  .carousel-control-prev, .carousel-control-next {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 5%; // Control size
    top: 0;
    bottom: 0;
    z-index: 1;
  }

  .carousel-control-prev-icon, .carousel-control-next-icon {
    width: 30px; // Arrow size
    height: 30px;
    background-image: none; // Remove default images
    border: 1px solid #fff; // Give it a border or style as you wish
    border-radius: 15px; // Rounded corners
    &::before {
      content: ''; // Add custom arrow styles here
    }
  }

  .carousel-item {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .carousel-indicators {
    display: none; // Hide indicators as we're using arrows
  }
`;

const CarouselItemWrapper = styled.div`
  flex: 0 0 auto;
  width: 25%; // Adjust width based on number of items to show
  transition: transform 0.2s ease;
`;

const HeroSection = styled.section`
  display: flex;
  align-items: flex-start;
  justify-content: space-around; // or 'space-between' for more separation
  padding: 50px 0;
  background: url(${process.env.PUBLIC_URL + '/images/img17.jpg'}) no-repeat center center;
  background-size: cover;
  height:600px;
`;

const HeroText = styled.div`
  flex-basis: 40%; // Adjust the text width as needed
  padding: 20px;
  background: rgba(0, 0, 0, 0.5); // Dark overlay for text readability
  color: #fff;
  border-radius: 8px;
`;



const TextSection = styled.div`
  flex-basis: 50%;
  padding-right: 2rem;
`;

const ImageSection = styled.div`
  flex-basis: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeroImage = styled.img`
  max-width: 100%;
  height: auto;
  display: block; // Or 'none' if you want to hide it on smaller screens
`;



const HomeScreen = () => {
  const dispatch = useDispatch();
  const skillsList = useSelector((state) => state.skillsList);
  const { loading, error, skills } = skillsList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [recommendedSkills, setRecommendedSkills] = useState([]);
  const [remainingSkills, setRemainingSkills] = useState([]);

  useEffect(() => {
    if (!skills.length) {
      dispatch(listSkills());
    }
  }, [dispatch, skills.length]);

  useEffect(() => {
    if (userInfo?.interests && skills.length > 0) {
      const interestsLower = userInfo.interests.map(interest => interest.toLowerCase());
      const recommended = skills.filter(skill =>
        skill.tags.some(tag => interestsLower.includes(tag.toLowerCase()))
      );
      const remaining = skills.filter(skill =>
        !skill.tags.some(tag => interestsLower.includes(tag.toLowerCase()))
      );
  
      setRecommendedSkills(recommended);
      setRemainingSkills(remaining);
    }
  }, [userInfo, skills]);

  const chunkSize = window.innerWidth > 992 ? 4 : 2; // Display 4 items for large screens and 2 for smaller screens
  const numOfChunks = Math.ceil(skills.length / chunkSize);
  const skillChunks = Array.from({ length: numOfChunks }, (_, index) => (
    skills.slice(index * chunkSize, index * chunkSize + chunkSize)
  ));
  const createSkillChunks = (skillArray, chunkSize) => {
    const numOfChunks = Math.ceil(skillArray.length / chunkSize);
    return Array.from({ length: numOfChunks }, (_, index) => (
      skillArray.slice(index * chunkSize, index * chunkSize + chunkSize)
    ));
  };
  
  const recommendedSkillChunks = createSkillChunks(recommendedSkills, window.innerWidth > 992 ? 4 : 2);
  const remainingSkillChunks = createSkillChunks(remainingSkills, window.innerWidth > 992 ? 4 : 2);

  return (
    <>
    <HeroSection>
  <HeroText>
    <h1 style={{textAlign:'center'}}>Fuel Your Passion</h1>
    <p style={{textAlign:'center'}}>Discover wellness routines that energize your body, mind, and soul.</p>
    {/* Additional text or a call-to-action button */}
  </HeroText>
</HeroSection>
<StyledContainer fluid="lg">
        {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
          <>
            <Heading>Curated Just for You</Heading>
            <Carousel 
              interval={null} 
              indicators={false} // Show indicators only if more than one chunk
              controls={recommendedSkillChunks.length > 1} // Show controls only if more than one chunk
              nextLabel={recommendedSkillChunks.length > 1 ? "Next" : ""} 
              prevLabel={recommendedSkillChunks.length > 1 ? "Previous" : ""}
            >
              {recommendedSkillChunks.map((chunk, index) => (
                <Carousel.Item key={index}>
                  <Row>
                    {chunk.map(skill => (
                      <Col key={skill._id} sm={6} md={4} lg={3} className="d-flex">
                        <WorkshopCard workshop={skill} fullWidth={true} image={true} path="skill" />
                      </Col>
                    ))}
                  </Row>
                </Carousel.Item>
              ))}
            </Carousel>

            <Heading>Explore More Skills</Heading>
            <Carousel interval={null} indicators={false} nextLabel="" prevLabel="">
              {remainingSkillChunks.map((chunk, index) => (
                <Carousel.Item key={index}>
                  <Row>
                    {chunk.map(skill => (
                      <Col key={skill._id} sm={6} md={4} lg={3} className="d-flex">
                        <WorkshopCard workshop={skill} fullWidth={true} image={true} path="skill" />
                      </Col>
                    ))}
                  </Row>
                </Carousel.Item>
              ))}
            </Carousel>
          </>
        )}
      </StyledContainer>
    </>
  );
};

export default HomeScreen;
