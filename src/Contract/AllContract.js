import React from 'react';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react/cjs/react.development';

function AllContract(props) {

    const [contract, setContract] = useState([]);

    useEffect(()=>{
        const url = "http://localhost:8000/contract";
    
        const fetchData = async () => {
          try {
            const response = await fetch(url);
            const json = await response.json();
            setContract(json);
            console.log(json);
          } catch (error) {
            console.log("error", error);
          }
        };
    
        fetchData();
    },[])
    return (
        <div>
            <table>
            <NavLink to="/contract" activeClassName="selected">
                <button>Add Contract</button>
            </NavLink>
            <tr>
                <th>Id</th>
                <th>Name</th>
            </tr>
            {contract.length>0 && contract.map((item,index)=>{
                return (
                    <>
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>
                            <button>Edit Contract</button>
                            <button>Delete Contract</button>
                        </td>
                    </tr>
                    </>
                )
            })}
            
            </table>
        </div>
    );
}

export default AllContract;