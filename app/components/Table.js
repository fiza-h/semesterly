import React from 'react';

const Table = ({ schedule }) => {
    console.log(schedule);
    
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
                                        <div className="card bg-white shadow-sm" style={{ height: '100px' , width: '100px'}}>
                                            <div className="card-body" style={{ maxHeight: '100px', overflow: 'hidden', padding: '5px', margin: 0 }}>
                                                <p className="card-title mb-0" style={{ fontSize: '14px', color: 'black', padding: 0 }}>{schedule[index][days.indexOf(day)].course}</p>
                                                <p className="card-text mb-0" style={{ fontSize: '12px', color: 'black' }}>Teacher: {schedule[index][days.indexOf(day)].teacher}</p>
                                                <p className="card-text mb-0" style={{ fontSize: '12px', color: 'black' }}>Course Code: {schedule[index][days.indexOf(day)].code}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="card bg-white shadow-sm" style={{ height: '100px' , width: '100px'}}>
                                            <div className="card-body" style={{ maxHeight: '100px', overflow: 'hidden' }}>
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
