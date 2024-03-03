// NavBar.tsx
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


const Header = styled.h2`
  font-family: 'Pacifico', cursive; 
  text-align: center;
  color: #212529;
  font-weight: bold;
  font-size: 3rem; 
  &:hover {
    color: #212529;
  }
`;

const StyledLink = styled(Link)`
  color: #fff;
  font-weight: bold;
  &:hover {
    color: #000; 
  }
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  color: #fff;
  font-weight: bold; 
  &:hover {
    color: #000; 
  }
`;



const NavBar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#48cae4' }}>
      <div className="container">
        <Header className="navbar-brand">Learn Sync</Header>
        <StyledLink to="/student" className="navbar-brand">Students</StyledLink>
        <StyledLink to = "/dashboard" className="navbar-brand" > Back to Courses</StyledLink>
        <StyledFontAwesomeIcon icon={faUser} className="navbar-brand" />
      </div>
    </nav>
  );
};

export default NavBar;
