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

interface Missing {
  user_id: number;
  grade: string;
}

const AssignmentDetails: React.FC = () => {
  const { assignmentId, id } = useParams<{ assignmentId: string, id: string }>();
  const [assignments, setAssignment] = useState<Assignment[]>([]);
  const [missings, setMissing] = useState<Missing[]>([]);
  const [studentDict, setStudentDict] = useState<{ [key: number]: string }>({
    9945831: "Taeden Anderson",
    12113467: "Nathan Hutton",
    12266736: "Arogya Upadhyaya"
  });
 

  useEffect(() => {
    const getAssignment = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/courses/${id}/quizzes/${assignmentId}/statistics`);
        const missing = await axios.get(`http://localhost:3001/api/courses/${id}/assignments/${assignmentId}/submissions`);
        setAssignment(response.data);
        setMissing(missing.data);
        
      } catch (error: any) {
        console.error((error as Error).message);
      }
    };

    getAssignment();
  }, [assignmentId, id]);


    //if (submission.grade === "null" && submission.user_id in studentDict) {
    // then add this user name to missing submission lists;
    // missing gives me the data 
    


  const pathSegments = window.location.pathname.split('/');
  const currentAssignmentId = parseInt(pathSegments[pathSegments.length - 1]);

  const currentAssignment = assignments.find(assignment => assignment.assignment_id === currentAssignmentId);


  return (
    <div className="row">
      <div className="container-fluid">
        <NavBar />
        <div className="container mt-5">
          <div className="row">
            <div className="col">
              <CourseName>{currentAssignment ? currentAssignment.title : ""}</CourseName>
              {currentAssignment ? <RechartsBarGraph data={[{ name: "Points Possible", value: currentAssignment?.points_possible }, { name: "Min Score", value: currentAssignment?.min_score }, { name: "Median Score", value: currentAssignment.median }, { name: "Max Score", value: currentAssignment.max_score }, { name: "Q1", value: currentAssignment.first_quartile }, { name: "Q3", value: currentAssignment.third_quartile }]} /> : ""}
              <div>
                <h2>Missing Submissions:</h2>
                <ul>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentDetails;
