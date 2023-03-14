import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './components/pages/home/Home';
import Company from './components/pages/Company';
import Contact from './components/pages/Contact';
import NewProject from './components/pages/newProject/NewProject';
import Container from './components/layout/container/Container';
import Navbar from './components/layout/navbar/Navbar';
import Footer from './components/layout/footer/Footer';
import Projects from './components/pages/projects/Projects';


function App() {
  return (
    <Router>
      <Navbar />

      <Container customClass='min-height'>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/projects' element={<Projects />} /> 
          <Route exact path='/company' element={<Company />} />
          <Route exact path='/contact' element={<Contact />} />
          <Route exact path='/newproject' element={<NewProject />} /> 
        </Routes>
      </Container>
      <Footer />
    </Router>

  );
}

export default App;
