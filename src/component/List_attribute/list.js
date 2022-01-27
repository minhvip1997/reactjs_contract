import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react/cjs/react.development';
import './attribute.css';

function ListAttribute(props) {
    const [attribute, setAttribute] = useState([]);
    const [typeentity, setTypeentity] = useState([]);
    const [typevalue, setTypevalue] = useState([]);

    const [typevalueinput, setTypevalueinput] = useState(1);
    const [typeentityinput, setTypeentityinput] = useState(1);
    const [label, setLabel] = useState('');
    useEffect(()=>{
        const url = "http://localhost:8000/attribute/getallattributerelation";
        
    
        const fetchData = async () => {
          try {
            const response = await fetch(url);
            const json = await response.json();
            setAttribute(json);

          } catch (error) {
            console.log("error", error);
          }
        };
    
        fetchData();

        const url2 = "http://localhost:8000/typeentity";
        
    
        const fetchData2 = async () => {
          try {
            const response = await fetch(url2);
            const json2 = await response.json();
            setTypeentity(json2);

          } catch (error) {
            console.log("error", error);
          }
        };
    
        fetchData2();

        const url3 = "http://localhost:8000/typevalue";

        const fetchData3 = async () => {
            try {
              const response = await fetch(url3);
              const json3 = await response.json();
              setTypevalue(json3);

            } catch (error) {
              console.log("error", error);
            }
          };
      
          fetchData3();
    },[typevalueinput,typeentityinput,attribute])

    const onChangeValueTypeValue=(e)=>{

        setTypevalueinput(e.target.value);
    }

    const onChangeValueTypeEntity=(e)=>{

        setTypeentityinput(e.target.value);
    }

    const onChangeValueLabel=(e)=>{

        setLabel(e.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const attribute = {
          label: String(label),
          idtypevalue: Number(typevalueinput),
          idtypeentity: Number(typeentityinput),
        };
        setLabel('');
        setTypeentityinput(1);
        setTypevalueinput(1);

        setTypeentity([]);
        setTypevalue([]);


    
       return await axios.post('http://localhost:8000/attribute/add', attribute)
        .then(res => {
            console.log(res);
            console.log(res.data);
          })
        .catch(function (error) {
            console.log(error);
          });
          
      }

    return (
        <>
        <div className="split left">
            <div className="centered">
            <span>Add Attribute</span>
                <form className="attribute" onSubmit={(e)=>handleSubmit(e)}>
                <label htmlFor="fname">Label:</label><br/>
                <input type="text" id="fname" name="fname" value={label} onChange={(e)=>onChangeValueLabel(e)}/><br/>
                <label htmlFor="lname">Type Entity:</label><br/>
                <select className="typeentity"  id="cars" onChange={(e)=>onChangeValueTypeEntity(e)}>
                {typeentity.length>0 && typeentity.map((item,index)=>{
                    return(
                        <option value={item.id}>{item.name}</option>
                    )
                })}
                </select><br/><br/>
                <label htmlFor="lname">Type Value:</label><br/>
                <select className="typevalue"  id="cars" onChange={(e)=>onChangeValueTypeValue(e)}>
                {typevalue.length>0 && typevalue.map((item,index)=>{
                    return(
                        <option value={item.id}>{item.type}</option>
                    )
                })}
                </select><br/><br/>
                <input type="submit" value="Submit"/>
                </form>
            </div>
        </div>

        <div className="split right">
        <div classname="centered">

        <h2>Table Attribute</h2>

            <table>
            <tr>
                <th>Id</th>
                <th>Label</th>
                <th>TypeValue</th>
                <th>TypeEntity</th>
            </tr>
            {attribute.length> 0 && attribute.map((item, index)=>{
                return(
                    <>
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.label}</td>
                        <td>{item.typeentity.name}</td>
                        <td>{item.typevalue.type}</td>
                    </tr>
                    </>
                )
            })}
            
            </table>
        </div>
        </div>
        </>
    );
}

export default ListAttribute;