import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './AllPet.css';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql,
    useMutation
  } from "@apollo/client";
import {getPet} from './../../graphql-client/queries';
import {DeletePet} from './../../graphql-client/queries';
import {GetPetId} from './../../graphql-client/queries';
import Modal from 'react-awesome-modal';
import EditPet from './EditPet';

function AllPet() {

    const [pet,setPet] = useState([]);
    const {loading, error, data} = useQuery(getPet);
    const [petid, setPetid] = useState(null);
    
    const [DeleteIdPet, { dataDeletePet, loadingDeletePet, errorDeletePet }] = useMutation(DeletePet);
    const [visible , setVisible] = useState(false);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    
    // console.log(data.pets)
    
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

    const handleDeletePet=(e, item)=>{
        console.log(item.id)
        e.preventDefault();
        
        DeleteIdPet({ 
            variables: { id: item.id },
            refetchQueries: [{query: getPet}]
     })
    }
    // function Pet({ id }) {
    //     const { loading, error, data } = useQuery(GetPetId, {
    //       variables: { id },
    //       pollInterval: 500,
    //     });
    // }
    const OpenModal=(e, item)=> {
        setVisible(true);
        setPetid(item.id)
        
        
    }
 
    const closeModal=()=> {
        setVisible(false);
        setPetid(null)
    }

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
                        <th>
                            <button onClick={(e)=>OpenModal(e,item)}>Edit</button>
                            
                            <button onClick={(e)=>handleDeletePet(e, item)}>Delete</button>
                        </th>
                    </tr>
                    
                )
                
            })}
            <Modal visible={visible} width="400" height="300"  onClickAway={() =>closeModal()}>
                <EditPet idPet={petid}/>
                <a href="javascript:void(0);" onClick={() => closeModal()}>Close</a>
            </Modal>
            </tbody>
            
            </table>
        </div>
    );
}

export default AllPet;