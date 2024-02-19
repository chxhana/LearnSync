import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Card } from 'react-bootstrap'; 

interface Course {
  id: number;
  name: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: linear-gradient(to bottom right, #6c63ff, #ff636c);
`;

const Header = styled.h2`
  color: black;
  font-weight: bold;
  font-family: 'Times New Roman';
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
  text-transform: uppercase;
`;

const CardBox = styled.div`
  background-color: #fff;
  width: 250px;
  height: 250px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Card = styled.div`
  margin: 10px;
  width: 200px;
  height: 200px;
  background-image: ffff;
  display: flex;
  flex-direction: column;
  padding: 0px;
  position: relative; 
  border-radius: 0px;
  
`;

const TopSection = styled.div`
  height: 70%;
  background-color: pink;
  padding: 10px;
`;

const BottomSection = styled.div`
  height: 30%;
  background-color: #fff;
  padding: 10px;
`;

const CourseId = styled.p`
  color: black;
  font-weight: bold;
  margin-bottom: 5px;
  text-align: center;
`;

const CourseName = styled.p`
  color: black;
  font-weight: bold;
  margin-bottom: 5px;
  text-align: center;
`;

const DashPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

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

  return (
    <div className='container d-flex flex-column justify-content-start mt-5'>
      <h3>You are currently teaching:</h3>
      <hr/>
      {/* <Header>YOU ARE CURRENTLY TEACHING</Header> */}
      <div className='p-5 d-flex align-items-center justify-content-around flex-row'>
        {courses.map(course => (
          <div key={course.id} className='card d-flex flex-row col-sm-3 flex-column text-decoration-none'>
            <div className='bg-warning p-5' style={{minHeight:'200px'}}>

            </div>
            <div>
              <CourseId>{course.id}</CourseId>
              <CourseName>{course.name}</CourseName>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashPage;
