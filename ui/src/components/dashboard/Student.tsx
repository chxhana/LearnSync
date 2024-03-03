import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import NavBar from './navBar';



const CourseName = styled.p`
  color: black;
  font-weight: bold;
  margin-bottom: 5px;
  text-align: center;
`;


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

interface Students {
    name: string;
    id: number;
}

const Student: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [courses, setCourses] = useState<Course[]>([]);
  const [students, setStudent] = useState<Students[]>([]);

 

  useEffect(() => {
    const getStudents = async () => {
      try {
        const studentData = await axios.get(`http://localhost:3001/api/courses/${id}/students`);
        setStudent(studentData.data);
      } catch (error: any) {
        console.error((error as Error).message);
      }
    };
    getStudents();
  }, [id]);




  return (
    <div className="row">
    <div className="container-fluid">
      <NavBar /> 
      
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            {courses.map(course => (
              <header key={course.id} className="text-center"> 
                <h2 className="font-weight-bold">Students</h2>
              </header>
            ))}
          </div>
        </div>
      </div>

      <div className='p-5 d-flex align-items-left justify-content-around flex-row flex-wrap'>
        {students.map((student, index) => (
          <>
            <Link key={student.id} to={`/Student/${student.id}`} className='card d-flex flex-row col-sm-4 flex-column text-decoration-none mb-3' style={{ width: '350px', height: '250px' }}>
              <div className='bg-warning p-5' style={{minHeight:'200px'}}>
              </div>
              <div>
                <CourseName>{student.name}</CourseName>
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

export default Student;
