import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from './navBar';
import styled from 'styled-components';
import RechartsBarGraph from '../common/bargraph';

const CourseName = styled.p`
  color: black;
  font-weight: bold;
  margin-bottom: 5px;
  text-align: center;
  font-size: 2rem;
`;

interface Assignment {
  title: string;
  assignment_id: number;
  due_at: Date;
  name: string;
  points_possible: number;
  median: number;
  first_quartile: number;
  third_quartile: number;
  min_score: number;
  max_score: number;
  
}


const AssignmentDetails: React.FC = () => {
  const { assignmentId, id } = useParams<{ assignmentId: string, id: string }>();
  const [assignments, setAssignment] = useState<Assignment[]>([]);


  useEffect(() => {
    const getAssignment = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/courses/${id}/quizzes/assignmentId/statistics`);
        setAssignment(response.data);
        console.log(response.data);
      } catch (error: any) {
        console.error((error as Error).message);
      }
    };

    getAssignment();
  }, [assignmentId, id]);

  const pathSegments = window.location.pathname.split('/');
  const currentAssignmentId = parseInt(pathSegments[pathSegments.length - 1]);

  // Finding the assignment in the array
  const currentAssignment = assignments.find(assignment => assignment.assignment_id === currentAssignmentId);



  console.log(currentAssignment);

  return (
    <div className="row">
      <div className="container-fluid">
        <NavBar />
        <div className="container mt-5">
          <div className="row">
            <div className="col">
            <CourseName>{currentAssignment ? currentAssignment.title : ""}</CourseName>
{currentAssignment ?             <RechartsBarGraph data={[{ name: "Points Possible", value: currentAssignment?.points_possible }, { name: "Min Score", value: currentAssignment?.min_score }, { name: "Median Score", value: currentAssignment.median }, { name: "Max Score", value: currentAssignment.max_score }, { name: "Q1", value: currentAssignment.first_quartile }, { name: "Q3", value: currentAssignment.third_quartile }]} />
 : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentDetails;
