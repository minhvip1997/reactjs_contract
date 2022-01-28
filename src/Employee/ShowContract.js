import React from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import './ShowContract.css';   
import { useEffect, useState } from 'react/cjs/react.development'; 
import { NavLink } from 'react-router-dom';

function ShowContract(props) {
    const{id} = useParams();
    const [contractdetail, setContractdetail] = useState([]);

    useEffect(()=>{
    const url3 = `http://localhost:8000/employeecontract/allcontract/${id}`;

      const fetchData3 = async () => {
          try {
            const response = await fetch(url3);
            const json3 = await response.json();
            setContractdetail(json3.employeecontracts);
            console.log(json3)

          } catch (error) {
            console.log("error", error);
          }
        };
    
        fetchData3();
    },[])
    
    return (
        <div>
            <table>
            <tr>
                <th>Id</th>
                <th>Name Type Contract</th>
            </tr>
            {contractdetail.length>0 && contractdetail.map((item,index)=>{
                return(
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.contract.name}</td>
                        <td>
                            <NavLink to={`/contract/detail/${item.id}`} activeClassName="selected">
                            <button>Show Detail</button>
                            </NavLink>
                        </td>
                    </tr>
                )
            })}
            </table>
        </div>
    );
}

export default ShowContract;