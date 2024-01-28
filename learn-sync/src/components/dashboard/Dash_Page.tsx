// DashboardPage.tsx
import React from 'react';
import CourseList from './course_list'; // Import the CourseList component

const DashPage: React.FC = () => {
  return (
    <div>
      <h2>Your Courses</h2>
      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
        {/* Display the CourseList component here */}
        <CourseList />
      </div>
    </div>
  );
};

export default DashPage;
