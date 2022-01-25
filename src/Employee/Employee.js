import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react/cjs/react.development';
import './Employee.css';

const Employee=(props)=> {

    const [employee,setEmployee] = useState([]);

    useEffect(() => {
        const url = "http://localhost:8000/user";
    
        const fetchData = async () => {
          try {
            const response = await fetch(url);
            const json = await response.json();
            setEmployee(json);
            // console.log(json);
          } catch (error) {
            console.log("error", error);
          }
        };
    
        fetchData();
    }, []);

    // console.log(employee)
    return (
        <div>
            <select value={employee} className="active">
            {employee.length>0 && employee.map((item,index)=>{
                return(
                    <option value="A">{item.name}</option>
                )
            })}
            </select>
            <table>
            {/* <button>Create</button> */}
            <NavLink to="/employee/add" activeClassName="selected">
                <button>Add Employee</button>
            </NavLink>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Age</th>
                <th>Email</th>
                <th>Image</th>
            </tr>
            <tr>
                <td>Alfreds Futterkiste</td>
                <td>Maria Anders</td>
                <td>Germany</td>
                <td>Germany</td>
                <td>Germany</td>
                <td>
                    <button>Edit</button>
                    <button>Delete</button>
                </td>
            </tr>
            </table>
        </div>
    );
}

export default Employee;