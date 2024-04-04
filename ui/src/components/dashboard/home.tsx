import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import NavBar from './navBar';
import Chart from 'chart.js/auto';




const CourseName = styled.p`
  color: black;
  font-weight: bold;
  margin-bottom: 5px;
  text-align: center;
`;

const colors = ['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93'];




const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  color: #fff;
  font-weight: bold; /* Bold font */
  &:hover {
    color: #000; /* Change color on hover */
  }
`;

const toggleMenu = () => {
  const topnav = document.getElementById('myTopnav');
  if (topnav) {
    if (topnav.className === 'navbar-collapse') {
      topnav.className += ' responsive';
    } else {
      topnav.className = 'navbar-collapse';
    }
  }
};

interface Course {
    id: number;
    name: string;
}

interface Assignment {
    id: number;
    due_at: Date;
    name: string;
}

const Home: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [courses, setCourses] = useState<Course[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);

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

  useEffect(() => {
    const getAssignments = async () => {
      try {
        const assignmentData = await axios.get(`http://localhost:3001/api/courses/${id}/assignments`);
        setAssignments(assignmentData.data);
      } catch (error: any) {
        console.error((error as Error).message);
      }
    };
    getAssignments();
  }, [id]);

const getColor = (index:number) => colors[index % colors.length];


  return (
    <div className="row">
    <div className="container-fluid">
      <NavBar /> 
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            {courses.map(course => (
              <header key={course.id} className="text-center"> 
                <h2 className="font-weight-bold">{course.name}</h2>
              </header>
            ))}
          </div>
        </div>
      </div>

      <div className='p-5 d-flex align-items-left justify-content-around flex-row flex-wrap'>
        {assignments.map((assignment, index: number) => (
          <>
            <Link key={assignment.id} to={`${assignment.id}`} className='card d-flex flex-row col-sm-4 flex-column text-decoration-none mb-3' style={{ width: '350px', height: '260px' }}>
              <div className= 'p-5' style={{minHeight:'200px',  backgroundColor: getColor(index)}}>
              </div>
              <div className="">
                <CourseName>{assignment.name}</CourseName>
                <p className = 'text-center'><strong>{new Date(assignment.due_at).toLocaleDateString()}</strong></p>
              </div>
            </Link>
            {index % 3 === 2 && <div key={`row-${index}`} className="w-100"></div>} 
          </>
        ))}
      </div>

    </div>
  </div>
  );
};

export default Home;
