import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import NavBar from './navBar';
import { useRadioGroup } from '@mui/material';

const CourseName = styled.p`
  color: black;
  font-weight: bold;
  margin-bottom: 5px;
  text-align: center;
  font-size: 2rem;
`;

interface Student {
  id: string;
  name: string;
}

interface Grade {
  id: string;
  user_id: string;
  assignment_name: string;
  entered_score: string;
}

    const Student_Info: React.FC = () => {
    const { id, studentId } = useParams<{ id: string, studentId: string }>();
    const [student, setStudent] = useState<Student[]>([]);
    const [grades, setGrades] = useState<Grade[]>([]);
  
    useEffect(() => {
      const getStudent = async () => {
        try {
          const studentData = await axios.get(`http://localhost:3001/api/courses/${id}/students`);
          setStudent(studentData.data);
        } catch (error: any) {
          console.error("Error fetching students:", error.message);
        }
      };
      getStudent();
    }, [id]);
  
    useEffect(() => {
      const getGrades = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/api/courses/${id}/gradebook_history/feed`);
          setGrades(response.data);
        } catch (error: any) {
          console.error("Error fetching grades:", error.message);
        }
      };
      getGrades();
    }, [studentId]);

  console.log(grades);
  interface AssignmentSummary {
    score: number;
    assignmentName: string;
    userId: number;
  }

  const jsonData: any[] = []; 
  axios.get('http://localhost:3001/api/courses/3471562/gradebook_history/feed')
  .then(response => {
    const responseData = response.data;
    //console.log(responseData);
  })
  .catch(error => {
    console.error("Error fetching data:", error.message);
  });
  
  
  const assignmentSummaries: AssignmentSummary[] = jsonData
  .filter(item => item.user_id === studentId) 
  .map(item => ({
    score: item.score,
    assignmentName: item.assignment_name,
    userId: item.user_id,
  }));
  console.log(assignmentSummaries);

 

  return (
    <div className="row">
      <div className="container-fluid">
        <NavBar />
        <div className="container mt-5">
          <div className="row ">
            <div className="col">
              {student.map(std => {
                if (std.id.toString() === studentId) {
                  return (
                    <div key={std.id}>
                      <CourseName>{std.name}</CourseName>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student_Info;
