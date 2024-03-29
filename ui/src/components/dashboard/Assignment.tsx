import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from './navBar';
import styled from 'styled-components';

const CourseName = styled.p`
  color: black;
  font-weight: bold;
  margin-bottom: 5px;
  text-align: center;
  font-size: 2rem;
`;

interface Assignment {
    id: number;
    due_at: Date;
    name: string;
}

interface Summary{
  id: number;
  max_score: number
  min_score: number;
  median: Float32Array;
}

const AssignmentDetails: React.FC = () => {
  const { assignmentId, id } = useParams<{ assignmentId: string, id: string }>();
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [summary, setSummary] = useState<Summary[]>([])

  useEffect(() => {
    const getAssignment = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/courses/${id}/assignments/${assignmentId}`);
        setAssignment(response.data);
        const stats = await axios.get(`http://localhost:3001/api/courses/${id}/analytics/assignments`);
      } catch (error: any) {
        console.error((error as Error).message);
      }
    };

    getAssignment();
  }, [assignmentId, id]);

  console.log(assignment)

  return (
    <div className="row">
      <div className="container-fluid">
        <NavBar />
        <div className="container mt-5">
          <div className="row">
            <div className="col">
            {assignment && (
                  <CourseName>{assignment.name}</CourseName>
            )}

        {summary.map(s => {
          if (s.id.toString() === assignmentId) {
            return (
              <div key={s.id}>
                {s.max_score}
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

export default AssignmentDetails;
