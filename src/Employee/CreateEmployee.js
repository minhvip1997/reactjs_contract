import axios from 'axios';
import React from 'react';
import { useState } from 'react/cjs/react.development';
import './CreateEmployee.css';

const CreateEmployee=(props)=> {

    const [name, setName] = useState('');
    const [age,setAge] = useState(0);
    const [email,setEmail] = useState('');
    const [image, setImage] = useState('');

    const axios = require('axios');
    const handleOnChangeName=(e)=>{
        setName(e.target.value);
    }

    const handleOnChangeAge=(e)=>{
        setAge(e.target.value);
    }

    const handleOnChangeEmail=(e)=>{
        setEmail(e.target.value);
    }

    const handleOnChangeImage=(e)=>{
        setImage(e.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const employee = {
          name: String(name),
          age: Number(age),
          email: String(email),
          image: String(image),
        };
        setName('');
        setEmail('');
        setAge(0);
        setImage('');
        
    
       return await axios.post('http://localhost:8000/user/add', employee )
        .then(res => {
            console.log(res);
            console.log(res.data);
          })
        .catch(function (error) {
            console.log(error);
          });
          
      }

    return (
        <div>
        <form onSubmit={(e)=>handleSubmit(e)}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={name} onChange={(e)=> handleOnChangeName(e)}/><br/><br/>
        <label htmlFor="lname">Age:</label>
        <input type="number" id="age" name="age" value={age} onChange={(e)=>handleOnChangeAge(e)}/><br/><br/>
        <label htmlFor="image">Image:</label>
        <input type="text" id="image" name="image" value={image} onChange={(e)=>handleOnChangeImage(e)}/><br/>
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" name="email" value={email} onChange={(e)=>handleOnChangeEmail(e)}/><br/>
        <input type="submit" value="Submit"/>
        </form>
        </div> 
    );
}

export default CreateEmployee;