import React from 'react';

const SelectedCourses = ({ courses, onCourseLockChange }) => {
    
    const handleLockChange = (index, event) => {
        const updatedCourses = [...courses];
        updatedCourses[index].locked = event.target.checked;
        onCourseLockChange(updatedCourses);
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

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Course</th>
                            <th>Code</th>
                            <th>Teacher</th>
                            <th>Program</th>
                            <th>Lecture Day</th>
                            <th>Lecture Time</th>
                            <th>Lab Day</th>
                            <th>Lab Time</th>
                            <th>Lock Course</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{course.course}</td>
                                <td>{course.code}</td>
                                <td>{course.teacher}</td>
                                <td>{course.program}</td>
                                <td>{mapDay(course.lecDay)}</td>
                                <td>{mapTime(course.lecTime)}</td>
                                <td>{mapDay(course.labDay)}</td>
                                <td>{mapTime(course.labTime)}</td>
                                <td>
                                    <div className="form-control">
                                        <label className="cursor-pointer label">
                                            <input 
                                                type="checkbox" 
                                                className="checkbox checkbox-info" 
                                                checked={course.locked}
                                                onChange={(event) => handleLockChange(index, event)}
                                            />
                                            <span className="label-text">Lock Course</span>
                                        </label>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SelectedCourses;
