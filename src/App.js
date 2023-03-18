import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './components/pages/home/Home';
import Company from './components/pages/Company';
import Contact from './components/pages/Contact';
import NewProject from './components/pages/projects/newProject/NewProject';
import Container from './components/layout/container/Container';
import Navbar from './components/layout/navbar/Navbar';
import Footer from './components/layout/footer/Footer';
import Projects from './components/pages/projects/Projects';
import Project from './components/pages/projects/project/Project';

function App() {
  return (
    <Router>
      <Navbar />

      <Container customClass='min-height'>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/projects' element={<Projects />} /> 
          <Route path='/company' element={<Company />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/newproject' element={<NewProject />} /> 
          <Route path='/project/:id' element={<Project />} /> 

        </Routes>
      </Container>
      <Footer />
    </Router>

  );
}

export default App;
