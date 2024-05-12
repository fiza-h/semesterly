import React, { useState } from 'react';

const Table = ({ schedule, onCheckboxListChange }) => {
    const times = [
        "8:30AM to 9:45AM",
        "10:00AM to 11:15AM",
        "11:30AM to 12:45PM",
        "1:00PM to 2:15PM",
        "2:30PM to 3:45PM",
        "4:00PM to 5:15PM",
        "5:30PM to 6:45PM"
    ];

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    // Initialize checked state for checkboxes as an object with boxKey as keys
    const [checkedBoxes, setCheckedBoxes] = useState({});

    const handleCheckboxChange = (index, day) => {
        const boxKey = `${index}-${day}`;
        setCheckedBoxes(prevCheckedBoxes => {
            const updatedCheckedBoxes = { ...prevCheckedBoxes };
            updatedCheckedBoxes[boxKey] = !updatedCheckedBoxes[boxKey];
            // Call the function passed from the Home component and pass the updatedCheckedBoxes as an array
            onCheckboxListChange(Object.keys(updatedCheckedBoxes).filter(key => updatedCheckedBoxes[key]));
            return updatedCheckedBoxes;
        });
    };

    return (
        <div className="overflow-x-auto">
            <table className="table table-xs table-pin-rows table-pin-cols">
                <thead>
                    <tr>
                        <th></th>
                        {days.map(day => <td key={day}>{day}</td>)}
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {times.map((time, index) => (
                        <tr key={index}>
                            <th>{time}</th>
                            {days.map(day => (
                                <td key={day} className="p-1">
                                    {schedule && schedule[index] && schedule[index][days.indexOf(day)] ? (
                                        <div className={`card bg-white shadow-sm ${checkedBoxes[`${index}-${day}`] ? 'bg-primary' : ''}`}>
                                            <div className="card-body" style={{ maxHeight: '100px', overflow: 'hidden', padding: '5px', margin: 0 }}>
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox"
                                                    style={{ position: 'absolute', top: '5px', right: '5px', zIndex: 1000 }}
                                                    checked={checkedBoxes[`${index}-${day}`] || false}
                                                    onChange={() => handleCheckboxChange(index, day)}
                                                />
                                                <p className="card-title mb-0" style={{ fontSize: '14px', color: 'black', padding: 0 }}>{schedule[index][days.indexOf(day)].course}</p>
                                                <p className="card-text mb-0" style={{ fontSize: '12px', color: 'black' }}>Teacher: {schedule[index][days.indexOf(day)].teacher}</p>
                                                <p className="card-text mb-0" style={{ fontSize: '12px', color: 'black' }}>Course Code: {schedule[index][days.indexOf(day)].code}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className={`card bg-white shadow-sm ${checkedBoxes[`${index}-${day}`] ? 'bg-primary' : ''}`}>
                                            <div className="card-body" style={{ maxHeight: '100px', overflow: 'hidden' }}>
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox"
                                                    style={{ position: 'absolute', top: '5px', right: '5px', zIndex: 1000 }}
                                                    checked={checkedBoxes[`${index}-${day}`] || false}
                                                    onChange={() => handleCheckboxChange(index, day)}
                                                />
                                                {/* Render empty card */}
                                            </div>
                                        </div>
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
