import React, { useState } from 'react';

const CourseCard = ({ courseTitle, courses, onAdd }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isAdded, setIsAdded] = useState(false); // State to track if the course has been added

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleAdd = () => {
        setIsAdded(true); // Update state to indicate the course has been added
        onAdd(courses);
    };

    return (
        <div>
            <div
                tabIndex={0}
                className={`collapse collapse-arrow border border-base-300 bg-base-200 ${isCollapsed ? 'collapsed' : ''}`}
                onClick={toggleCollapse}
            >
               <div className="collapse-title text-xl font-medium flex justify-between items-center px-20">
                    <div className="flex items-center">{courseTitle}</div>
                    <button 
                        className="btn btn-active btn-primary" 
                        onClick={handleAdd} 
                        disabled={isAdded} // Disable button if the course has been added
                    >
                        {isAdded ? 'Added' : 'Add'}
                    </button>
                </div>
                <div className={`collapse-content ${isCollapsed ? 'hidden' : ''}`}>
                    {courses.map((course, index) => (
                      <div key={index} className='py-5'>
                        <p>Teacher: {course.teacher}</p>
                        <p>Program: {course.program}</p>
                        <p>Lecture Day: {course.lecDay}</p>
                        <p>Lecture Time: {course.lecTime}</p>
                        <p>Lab Day: {course.labDay}</p>
                        <p>Lab Time: {course.labTime}</p>
                      </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
