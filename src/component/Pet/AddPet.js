import { useMutation } from '@apollo/react-hooks';
import React, { useEffect, useState } from 'react';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
  } from "@apollo/client";
import {getOwn} from './../../graphql-client/queries';
import {getPet} from './../../graphql-client/queries';
import {CreatePet} from './../../graphql-client/queries';
function AddPet(props) {

    const [owner, setOwner] = useState([]);
    const {loading, error, data} = useQuery(getOwn);
    
    const [AddPet, { dataCreatePet, loadingCreatePet, errorCreatePet }] = useMutation(CreatePet);
    
  
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [ownerId, setOwnerId] = useState(1);
    
    useEffect(()=>{
        if (data) {

            // console.log(data)
            setOwner(data.owners)
          }
    },[data,owner])
    
    if (loadingCreatePet) return 'Submitting...';

    if (errorCreatePet) return `Submission error! ${errorCreatePet.message}`;
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    const handleOnChangeName=(e)=>{
        setName(e.target.value)
    }

    const handleOnChangeType=(e)=>{
        setType(e.target.value);
    }

    const handleOnChangeOwner=(e)=>{
        console.log(e.target.value);
        
        setOwnerId(e.target.value);
    }

    const handleSubmit=(event)=>{

        console.log(owner)
        event.preventDefault();
        setName('');
        setType('');
        
        AddPet({ 
            variables: { name: name, type: type, ownerId: parseInt(ownerId,10) },
            refetchQueries: [{query: getPet},{query: getOwn}]
     })
        setOwner([])
    }
    console.log(owner)
    


    return (
        <div>
        <form className="attribute" onSubmit={(e)=>handleSubmit(e)}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={name} onChange={(e)=> handleOnChangeName(e)}/><br/><br/>
        <label htmlFor="lname">Type:</label>
        <input type="text" id="age" name="age" value={type} onChange={(e)=>handleOnChangeType(e)}/><br/><br/>
        <label htmlFor="image">Owner Name:</label>
        <select className="typeentity"  id="cars" onChange={(e)=>handleOnChangeOwner(e)}>
                {owner.map((item,index)=>{
                    return(
                        <option value={item.id} key={item.id}>{item.name}</option>
                    )
                })}
                </select><br/><br/>
        <input type="submit" value="Submit"/>
        </form>
        </div>
    );
}

export default AddPet;