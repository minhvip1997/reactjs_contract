import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react/cjs/react.development';
import './Employee.css';

const Employee=(props)=> {

    const [employee,setEmployee] = useState([]);
    const [entitytype, setEntitytype] = useState(0);
    const [entityvalue, setEntityvalue] = useState(0);

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
            <select value={employee} className="active" >
            {employee.length>0 && employee.map((item,index)=>{
                return(
                    <option value="A">{item.name}</option>
                )
            })}
            </select>
            <table>

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
            {employee.length> 0 && employee.map((item,index)=>{
                return(
                    <>
                    <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                    <td>{item.email}</td>
                    <td>{item.image}</td>
                    <td>
                        <NavLink to="/contract" activeClassName="selected">
                        <button>Add Contract</button>
                        </NavLink>
                        <NavLink to={`/contract/usershow/${item.id}`}  activeClassName="selected">
                        <button>Show All Contract</button>
                        </NavLink>
                    </td>
                    </tr>
                    </>
                )
            })}
            
                
            
            </table>
        </div>
    );
}

export default Employee;