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
  id: string;
  due_at: Date;
  name: string;
}

interface Summary {
  id: string;
  max_score: number;
  min_score: number;
  median: number;
  title: string;
}

const AssignmentDetails: React.FC = () => {
  const { assignmentId, id } = useParams<{ assignmentId: string, id: string }>();
  const [assignment, setAssignment] = useState<Assignment[]>([]);
  const [summary, setSummary] = useState<Summary[]>([]);
  const [summaryScores, setSummaryScores] = useState<any[]>([]);
  const [dictionary, setDictionary] = useState<{ [key: number]: string }>({
    9945831: 'Taeden Anderson',
    12113467: 'Nathan Hutton',
    12266736: 'Arogya Upadhyaya',
  });

  useEffect(() => {
    const getAssignment = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/courses/${id}/assignments/${assignmentId}`);
        const stats = await axios.get(`http://localhost:3001/api/courses/${id}/analytics/assignments`);
        setAssignment(response.data);
        setSummary(stats.data);
      } catch (error: any) {
        console.error((error as Error).message);
      }
    };

    getAssignment();
  }, [assignmentId, id]);

//summary data 
useEffect(() => {
  const aggregateSummaryData = () => {
    const aggregatedData: any[] = [];

    summary.forEach((sum) => {
      if (sum.id === assignmentId) {
        aggregatedData.push({
          pointsPossible: sum.max_score,
          maxScore: sum.max_score,
          minScore: sum.min_score,
          median: sum.median,
        });
      }
    });

    setSummaryScores(aggregatedData);
    console.log(aggregatedData); 
  };

  aggregateSummaryData();
}, [summary, assignmentId]);


//doesnt display title of assignment
//making a  bargraph for low,high, median and total_possible
//display list of users that have not submitted hw using dictionary 

  return (
    <div className="row">
      <div className="container-fluid">
        <NavBar />
        <div className="container mt-5">
          <div className="row">
            <div className="col">
              {summary.map((sum) => {
                if (sum.id === assignmentId) {
                  return (
                    <div key={sum.id}>
                      <CourseName>{sum.title}</CourseName>
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
