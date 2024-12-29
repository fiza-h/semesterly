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

    const [checkedBoxes, setCheckedBoxes] = useState({});

    const handleCheckboxChange = (index, day) => {
        const boxKey = `${index}-${day}`;
        setCheckedBoxes(prevCheckedBoxes => {
            const updatedCheckedBoxes = { ...prevCheckedBoxes };
            updatedCheckedBoxes[boxKey] = !updatedCheckedBoxes[boxKey];
            onCheckboxListChange(Object.keys(updatedCheckedBoxes).filter(key => updatedCheckedBoxes[key]));
            return updatedCheckedBoxes;
        });
    };

    return (
        <div className="overflow-x-auto">
            <table className="table table-xs table-pin-rows table-pin-cols">
                <thead>
                    <tr>
                        <th style={{ fontSize: '20px', fontWeight: 'bold' }}>Time</th>
                        {days.map(day => <td key={day} style={{ fontSize: '22px', fontWeight: 'bold', textAlign: 'center' }}>{day}</td>)}
                    </tr>
                </thead>
                <tbody>
                    {times.map((time, index) => (
                        <tr key={index}>
                            <th style={{ fontSize: '22px', fontWeight: 'bold', lineHeight: '22px', textAlign: 'center' }}>{time}</th>
                            {days.map(day => (
                                <td key={day} className="p-1" style={{ fontSize: '14px' }}>
                                    {schedule && schedule[index] && schedule[index][days.indexOf(day)] ? (
                                        <div className={`card ${checkedBoxes[`${index}-${day}`] ? 'bg-slate-900' : 'bg-white'} shadow-sm`}>
                                            <div className="card-body" style={{ maxHeight: "150px", maxWidth: '150px', height: '150px', width: '150px', overflow: 'hidden', padding: '5px', margin: 0 }}>
                                                <p className="card-title mb-0" style={{ fontSize: '20px', color: 'black', padding: 0 }}>{schedule[index][days.indexOf(day)].course}</p>
                                                <p className="card-text mb-0" style={{ fontSize: '18px', color: 'black', lineHeight: '1' }}>{schedule[index][days.indexOf(day)].teacher}</p>
                                                <p className="card-text mb-0" style={{ fontSize: '20px', color: 'black' }}>{schedule[index][days.indexOf(day)].code}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className={`card ${checkedBoxes[`${index}-${day}`] ? 'bg-slate-900' : 'bg-white'} shadow-sm`}>
                                            <div className="card-body" style={{ maxHeight: "150px", maxWidth: '150px', height: '150px', width: '150px', overflow: 'hidden', padding: '2px' }}>
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
