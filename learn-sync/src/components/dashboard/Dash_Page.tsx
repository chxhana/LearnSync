import React, { useEffect, useState } from 'react';
import fetchCourses from './course_list';

interface Course {
  id: number;
  name: string;
}

const DashPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const coursesData = await fetchCourses();
        setCourses(coursesData);
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