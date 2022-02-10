import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './AllPet.css';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
  } from "@apollo/client";
import {getPet} from './../../graphql-client/queries'

function AllPet() {

    const [pet,setPet] = useState([]);
    const {loading, error, data} = useQuery(getPet);
    
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    
    console.log(data.pets)
    
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
    
    // useEffect(()=>{
    //     const url = "http://localhost:8000/graphql" ;
        
    //     fetch(url,{
    //         method: "POST",
    //         headers: {"Content-Type": "application/json"},
    //         body: JSON.stringify({query: getPetquery})
    //     }).then(response=> response.json())
    //     .then(data=> setPet(data.data.pets))
       
    // },[])
    // console.log(pet)

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
            { data.pets.map((item,index)=>{
                return(
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.type}</td>
                        <th>{item.ownerId}</th>
                    </tr>
                )
                
            })}
            
            </tbody>
            
            </table>
        </div>
    );
}

export default AllPet;