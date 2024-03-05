import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link} from 'react-router-dom';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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

const DropdownMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 10px); 
  right: 0;
  z-index: 1;
  display: none; 
  ${props => props.isOpen && `
    display: block;
  `}
`;

const DropdownItem = styled.div`
padding: 0.5rem;
background-color: #48cae4;
color: #fff;
cursor: pointer;
&:hover {
  color: #000; /* Change text color on hover */
}
`;

interface Course {
  id: number;
  name: string;
}

const NavBar: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const coursesData = await axios.get("http://localhost:3001/api/courses");
        setCourses(coursesData.data);
      } catch (error: any) {
        console.error((error as Error).message);
      }
    };

    getCourses();
  }, []);
  
  const handleLogout = () => {
    // Perform logout actions here, such as clearing tokens or user data
    // Redirect to the login page after logout
    // For now, let's just console log
    console.log("Logging out...");
  };
  const link = "/student/" + id;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#48cae4' }}>
      <div className="container">
        <Header className="navbar-brand">Learn Sync</Header>
        <StyledLink to={link} className="navbar-brand">Students</StyledLink>
        <StyledLink to="/dashboard" className="navbar-brand">Back to Courses</StyledLink>
        <div className="position-relative">
          <StyledFontAwesomeIcon icon={faUser} className="navbar-brand" onClick={() => setIsDropdownOpen(!isDropdownOpen)} />
          <DropdownMenu isOpen={isDropdownOpen}>
          <StyledLink to="/" className="navbar-brand"> 
            <DropdownItem onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </DropdownItem>
            </StyledLink>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
