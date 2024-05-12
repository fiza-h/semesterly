import React from 'react';

const SelectedCourses = ({ courses, onCourseLockChange }) => {
    
    const handleLockChange = (index, event) => {
        const updatedCourses = [...courses];
        updatedCourses[index].locked = event.target.checked;
        onCourseLockChange(updatedCourses);
    };

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Course</th>
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
                                <td>{course.teacher}</td>
                                <td>{course.program}</td>
                                <td>{course.lecDay}</td>
                                <td>{course.lecTime}</td>
                                <td>{course.labDay}</td>
                                <td>{course.labTime}</td>
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
