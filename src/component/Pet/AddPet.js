import { useMutation } from '@apollo/react-hooks';
import React, { useEffect, useState } from 'react';
import gql from "graphql-tag";

function AddPet(props) {
    const getownerquery = `
    {
        owners{
          id
          name
        }
      }`;

      const createpet = `
      mutation CreateMessage($name: String!, $type: String!, $ownerId: Int!) {
        createPet(createPetInput:{name: $name, type:$type, ownerId: $ownerId}) {
          id
          name
          type
          
        }
      }
      `;
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [ownerId, setOwnerId] = useState(1);
    const [ownername, setOwnername] = useState([]);
    // const [createTodo] = useMutation(createpet);
    
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

    useEffect(()=>{
        const url = "http://localhost:8000/graphql" ;
        
        fetch(url,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({query: getownerquery})
        }).then(response=> response.json())
        .then(data=> setOwnername(data.data.owners))
    },[])


    const handleSubmit=(event)=>{
        event.preventDefault(); 
        console.log(name,type,ownerId)
        
        const url = "http://localhost:8000/graphql" ;
        setName('');
        setType('');
        // setOwnerId(1);
        fetch(url,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({query: createpet, 
                variables: {
                    name: name,
                    type: type,
                    ownerId: parseInt(ownerId,10)
                  }
            })
        }).then(response=> response.json())
        .then(data=> console.log('data returned:', data))
    }


    return (
        <div>
        <form className="attribute" onSubmit={(e)=>handleSubmit(e)}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={name} onChange={(e)=> handleOnChangeName(e)}/><br/><br/>
        <label htmlFor="lname">Type:</label>
        <input type="text" id="age" name="age" value={type} onChange={(e)=>handleOnChangeType(e)}/><br/><br/>
        <label htmlFor="image">Owner Name:</label>
        <select className="typeentity"  id="cars" onChange={(e)=>handleOnChangeOwner(e)}>
                {ownername.length>0 && ownername.map((item,index)=>{
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