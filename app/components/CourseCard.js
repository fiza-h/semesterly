import React, { useState, useEffect } from 'react';

const CourseCard = ({ courseTitle, courses, onAdd, clearCourses }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isAdded, setIsAdded] = useState(false); // State to track if the course has been added

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleAdd = () => {
        setIsAdded(true); // Update state to indicate the course has been added
        onAdd(courses);
    };

    // Function to map numerical day index to day names
    const mapDay = (dayIndex) => {
        switch (dayIndex) {
            case 0:
                return 'Monday/ Wednesday';
            case 1:
                return 'Tuesday/ Thursday';
            case 2:
                return 'Friday/ Saturday';
            default:
                return 'N/A';
        }
    };

    // Function to map numerical time index to time formats
    const mapTime = (timeIndex) => {
        switch (timeIndex) {
            case 0:
                return '8:30AM to 9:45AM';
            case 1:
                return '10:00AM to 11:15AM';
            case 2:
                return '11:30AM to 12:45PM';
            case 3:
                return '1:00PM to 2:15PM';
            case 4:
                return '2:30PM to 3:45PM';
            case 5:
                return '4:00PM to 5:15PM';
            case 6:
                return '5:30PM to 6:45PM';
            case 7:
                return '7:00PM to 8:15PM';
            default:
                return 'N/A';
        }
    };

    useEffect(() => {
        setIsAdded(false); // Reset the isAdded state when courses are cleared
    }, [clearCourses]);

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
                            <p>Lecture Day: {mapDay(course.lecDay)}</p>
                            <p>Lecture Time: {mapTime(course.lecTime)}</p>
                            <p>Lab Day: {mapDay(course.labDay)}</p>
                            <p>Lab Time: {mapTime(course.labTime)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
