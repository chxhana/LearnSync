import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import NavBar from './navBar';
import PieChartComponent from '../common/piechart';
import RechartsBarGraph from '../common/bargraph';

const CourseName = styled.p`
  color: black;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
  font-size: 2rem;
`;

const H2 = styled.p`
  color: black;
  font-weight: bold;
  margin-top: 5px;
  margin-bottom: 5px;
  text-align: center;
  font-size: 1.2rem;
`;

interface Student {
  id: string;
  name: string;
}

interface Grade {
  id: string;
  name: string;
  user_id: string;
  assignment_id: string;
  assignment_name: string;
  user_name: string;
  current_grade: string;
  score: number;
  posted_at: Date;
}

interface BarChartData {
  name: string;
  value: number;
}

const Student_Info: React.FC = () => {
  const { id, studentId } = useParams<{ id: string, studentId: string }>();
  const [student, setStudent] = useState<Student[]>([]);
  const [grade, setGrade] = useState<Grade[]>([]);
  const [quizScores, setQuizScores] = useState<BarChartData[]>([]);
  const [homeworkScores, setHomeworkScores] = useState<BarChartData[]>([]);

  let hasRenderedPieChart = false;
  let hasRenderedHomeworkGraph = false;
  let hasRenderedQuizGraph = false;

  useEffect(() => {
    const getStudent = async () => {
      try {
        const studentData = await axios.get(`http://localhost:3001/api/courses/${id}/students`);
        const gradeData = await axios.get(`http://localhost:3001/api/courses/${id}/gradebook_history/feed`);
        setStudent(studentData.data);
        setGrade(gradeData.data);
      } catch (error: any) {
        console.error("Error fetching students:", error.message);
      }
    };
    getStudent();
  }, [id]);

  
  useEffect(() => {
    const aggregateScores = () => {
      const aggregatedHomeworkScores: { [key: string]: number } = {};
      const aggregatedQuizScores: { [key: string]: number } = {};

      grade.forEach(g => {
        if (g.user_id.toString() === studentId) {
        if (g.assignment_name.includes("Homework")) {
        if (aggregatedHomeworkScores[g.assignment_name]) {
        aggregatedHomeworkScores[g.assignment_name] = g.score;
        } else {
        aggregatedHomeworkScores[g.assignment_name] = g.score;
        }
        } else if (g.assignment_name.includes("Quiz")) {
        if (aggregatedQuizScores[g.assignment_name]) {
        aggregatedQuizScores[g.assignment_name] += g.score;
        } else {
        aggregatedQuizScores[g.assignment_name] = g.score;
        }
        }
        }
        });
       

      const homeworkData: BarChartData[] = Object.keys(aggregatedHomeworkScores).map(key => ({
        name: key,
        value: aggregatedHomeworkScores[key]
       
      }));

      const quizData: BarChartData[] = Object.keys(aggregatedQuizScores).map(key => ({
        name: key,
        value: aggregatedQuizScores[key]
      }));

      setHomeworkScores(homeworkData);
      setQuizScores(quizData);
    };

    aggregateScores();
  }, [grade, studentId]);
  
// quiz data is not working
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
            
            <div className="row">
              {grade.map(g => {
                if (g.user_id.toString() === studentId) {
                  if (!hasRenderedPieChart && g.assignment_name === "Roll Call Attendance") {
                    hasRenderedPieChart = true;
                    return (
                      <div key={g.assignment_name + g.user_id} className="col">
                        <H2>Attendance</H2>
                        <PieChartComponent 
                          data={[
                            { name: 'Present', value: parseInt(g.current_grade), fill: '#e0aaff' }, 
                            { name: 'Absent', value: 100 - parseInt(g.current_grade), fill: '#ffc8dd' }
                          ]} 
                        />
                        <br />
                      </div>
                    );
                  }
                }
                return null;
              })}
            </div>

            <div className="row">
              <div className="col">
                {grade.map(g => {
                  if (g.user_id.toString() === studentId) {
                    if (!hasRenderedHomeworkGraph && g.assignment_name.includes("Homework")) {
                      hasRenderedHomeworkGraph = true;
                      return (
                        <div key={g.assignment_name + g.user_id} className="row">
                          <div className="col">
                            <H2>Homework</H2>
                            <RechartsBarGraph data={homeworkScores} />
                            <br />
                          </div>
                        </div>
                      );
                    }
                  }
                  return null;
                })}
              </div>
              
              <div className="col">
                {grade.map(g => {
                  if (g.user_id.toString() === studentId) {
                    if (!hasRenderedQuizGraph && g.assignment_name.includes("Quiz")) {
                      hasRenderedQuizGraph = true;
                      return (
                        <div key={g.assignment_name + g.user_id} className="row">
                          <div className="col">
                            <H2>Quiz</H2>
                            <RechartsBarGraph data={quizScores} />
                            <br />
                          </div>
                        </div>
                      );
                    }
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
              };

export default Student_Info;