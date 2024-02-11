import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Course {
  id: number;
  name: string;
}

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
    <div style={{ backgroundColor: '#B35B8F', minHeight: '100vh', padding: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{ color: 'black', fontWeight: 'bold', fontFamily: 'Times New Roman', fontSize: '24px', marginBottom: '3%', marginTop: '20', textAlign: 'center' }}>YOU ARE CURRENTLY TEACHING</h2>
      <div style={{ border: '1px solid #ccc', padding: '0px', borderRadius: '8px', backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
        {courses.map(course => (
          <div key={course.id} style={{ border: '10px #B35B8F', padding: '10px', marginBottom: '10px', width: '200px', height: '200px' }}> {/* Adjust width and height as needed */}
            <p style={{ color: 'black', fontWeight: 'bold', marginBottom: '5px' }}>Course ID: {course.id}</p>
            <p style={{ color: 'black', fontWeight: 'bold', marginBottom: '5px' }}>Name: {course.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
        };

export default DashPage;