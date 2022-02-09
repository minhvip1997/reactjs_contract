import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './AllPet.css';

function AllPet() {

    const [pet,setPet] = useState([]);

    const getPetquery = `
    {
        pets {
          id
          name
          type
          owner {
            id
            name
          }
        }
      }
      
    `;
    useEffect(()=>{
        const url = "http://localhost:8000/graphql" ;
        
        fetch(url,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({query: getPetquery})
        }).then(response=> response.json())
        .then(data=> setPet(data.data.pets))
       
    },[])
    console.log(pet)

    return (
        <div>
            <h2>HTML Table</h2>
            
            <NavLink to="/pet/add" activeClassName="selected">
                <button>Add Pet</button>
            </NavLink>
            <table>
            
            <tbody>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Type</th>
                <th>OwnerId</th>
            </tr>
            {pet.length >0 && pet.map((item,index)=>{
                return(
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.type}</td>
                        <th>{item.owner.id}</th>
                    </tr>
                )
                
            })}
            
            </tbody>
            
            </table>
        </div>
    );
}

export default AllPet;