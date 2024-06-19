import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import SkillsDetailScreen from './screens/SkillsDetailScreen';
import WorkshopDetailScreen from './screens/WorkshopDetailScreen';
import CommunityScreen from './screens/CommunityScreen'
import { ProtectedRoute } from './components/ProtectedRoute';
import { NotFoundScreen } from './components/NotFound';
import { useSelector } from 'react-redux';
import TriviaScreen from './screens/TriviaScreen'

const App = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <Router>
    <Header />
        <Container  style={{maxWidth:'100%'}}>
          <Routes>
            <Route path='/' element={<ProtectedRoute><HomeScreen /></ProtectedRoute>} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/community' element={<ProtectedRoute><CommunityScreen /></ProtectedRoute>} />
            <Route path='/skill/:id' element={<ProtectedRoute><SkillsDetailScreen /></ProtectedRoute>} />
            <Route path='/workshop/:id' element={<ProtectedRoute><WorkshopDetailScreen /></ProtectedRoute>} />
            <Route path='/trivia' element={<ProtectedRoute><TriviaScreen /></ProtectedRoute>} />
            <Route path='*' element={<NotFoundScreen />} />
          </Routes>
        </Container>
      <Footer />
    </Router>
  );
}

export default App;
