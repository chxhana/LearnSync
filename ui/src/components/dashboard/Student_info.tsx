import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from './navBar';
import styled from 'styled-components';
import { Dict } from 'styled-components/dist/types';
//import AttendancePieChart from './AttendancePieChart';

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

const Student_Info: React.FC = () => {
  const { id, studentId } = useParams<{ id: string, studentId:string }>();
  const [student, setStudent] = useState<Student[]>([]);

  useEffect(() => {
    const getStudent = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/courses/${id}/students`);
        setStudent(response.data);
      } catch (error: any) {
        console.error("Error fetching students:", error.message);
      }
    };
    getStudent();
  }, [ id, studentId]); 

  console.log(
    student
  );


  return (
    <div className="row">
      <div className="container-fluid">
        <NavBar />
        <div className="container mt-5">
          <div className="row">
            <div className="col">
            {student.map(std => (
            <div key={std.id}>
            {std.id === studentId && (
              <>
                <CourseName className="font-weight-bold">{std.name}</CourseName>
                
              </>
         )}
    </div>
))}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student_Info;
