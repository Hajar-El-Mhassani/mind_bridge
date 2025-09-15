import React from 'react';

export default function CourseDetailPage({ params }) {
  const { courseId } = params;

  return (
    <div>
      <h1>Course Details Page</h1>
      <p>Course ID: {courseId}</p>
    </div>
  );
}