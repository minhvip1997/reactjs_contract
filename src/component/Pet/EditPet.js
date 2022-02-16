import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useMemo, useState } from 'react';
import {GetPetId} from './../../graphql-client/queries';
import {getOwn} from './../../graphql-client/queries';
import {UpdatePet} from './../../graphql-client/queries';
import {getPet} from './../../graphql-client/queries';
import { useLazyQuery } from '@apollo/client';

const EditPet=(props)=> {
    // console.log(props.idPet)
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [ownerId, setOwnerId] = useState(null);
    const [owner, setOwner] = useState([]);
    const  [EditPet, { dataUpdatePet, loadingUpdatePet, errorUpdatePet }] = useMutation(UpdatePet);

    
    const { loading, error, data } = useQuery(GetPetId, {
        variables: { id: props.idPet }
      });
    const own = useQuery(getOwn);  

    // if(data && data.getPet){
    //     setName(data.getPet.name)
    // }
    useEffect(()=>{
        if(data && data.getPet){
            setName(data.getPet.name);
            setType(data.getPet.type);
            setOwnerId(data.getPet.owner.id)
        }
         
      },[data])

      if (loading) return null;
      if (error) return `Error! ${error}`;  
      if (loadingUpdatePet) return null;
      if (errorUpdatePet) return `Error! ${errorUpdatePet}`;  
      
      
    //   console.log(data)
    //   console.log(own.data.owners);
    const handleChangeInputName=(e)=>{
        setName(e.target.value)
    }  

    const handleOnChangeOwner=(e)=>{
        setOwnerId(e.target.value);
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        // if(ownerId===null){
        //     setOwnerId(data.getPet.owner.id);
        // }
        
        const editpet = {
            id: data.getPet.id,
            name: name,
            type: type,
            ownerId: ownerId
        }
        // console.log(ownerId)

        EditPet({
            variables: { id: data.getPet.id, input: editpet },
            refetchQueries: [{query: getPet},{query: getOwn}]
        })
    }

    const handleChangeInputType=(e)=>{
        setType(e.target.value);
    }
    
    return (
        <div>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <label htmlFor="fname">Name:</label><br/>
                <input type="text" id="fname" name="fname" defaultValue={data.getPet.name} onChange={(e)=>handleChangeInputName(e)}/><br/>
                <label htmlFor="lname">Type:</label><br/>
                <input type="text" id="lname" name="lname" defaultValue={data.getPet.type} onChange={(e)=>handleChangeInputType(e)}/><br/><br/>
                <label htmlFor="image">Owner Name:</label>
                <select className="typeentity"  id="cars" defaultValue={data.getPet.owner.id} onChange={(e)=>handleOnChangeOwner(e)}>
                {own.data.owners.map((item)=>{
                    return(
                    <option value={item.id} key={item.id} >{item.name}</option>
                    )
                })}
                </select><br/><br/>
                <input type="submit" value="Submit"/><br/><br/>
                
            </form>
        </div>
    );
}

export default EditPet;