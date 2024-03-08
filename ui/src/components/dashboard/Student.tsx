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
  font-weight: bold; 
  &:hover {
    color: #000; 
  }
`;

const Student: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [students, setStudents] = useState<any[]>([]); 

  useEffect(() => {
    const getStudents = async () => {
      try {
        const studentData = await axios.get(`http://localhost:3001/api/courses/${id}/students`);
        setStudents(studentData.data);
      } catch (error: any) {
        console.error("Error fetching students:", error.message);
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
              <h2>Students</h2>
            </div>
          </div>
        </div>

        <div className='p-5 d-flex align-items-left justify-content-around flex-row flex-wrap'>
          {students.map((student, index) => (
            <>
              <Link key={student.id} to={`${student.id}`} className='card d-flex flex-row col-sm-4 flex-column text-decoration-none mb-3' style={{ width: '350px', height: '250px' }}>
                <div className='bg-warning p-5' style={{ minHeight: '200px' }}>
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
