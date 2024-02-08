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
    <div>
      <h2>Your Courses</h2>
      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
        <ul>
          {courses.map(course => (
            <li key={course.id}>{`Course ID: ${course.id}, Name: ${course.name}`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashPage;