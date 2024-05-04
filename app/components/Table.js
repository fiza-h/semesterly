import React from 'react'

const Table = () => {
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-xs table-pin-rows table-pin-cols">
                    <thead>
                        <tr>
                            <th></th>
                            <td>Monday</td>
                            <td>Tuesday</td>
                            <td>Wednesday</td>
                            <td>Thursday</td>
                            <td>Friday</td>
                            <td>Saturday</td>
                            <td>Sunday</td>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>8:30AM to 9:45AM</th>
                            
                        </tr>
                        <tr>
                            <th>10:00AM to 11:15AM</th>
                           
                        </tr>
                        <tr>
                            <th>11:30AM to 12:45PM</th>
                            
                        </tr>
                        <tr>
                            <th>1:00PM to 2:15PM</th>
                            
                        </tr>
                        <tr>
                            <th>2:30PM to 3:45PM</th>
                         
                        </tr>
                        <tr>
                            <th>4:00PM to 5:15PM</th>
                           
                        </tr>
                        <tr>
                            <th>5:30PM to 6:45PM</th>
                            
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table
