import React from 'react';

const SelectedCourses = ({ courses }) => {
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SelectedCourses;
