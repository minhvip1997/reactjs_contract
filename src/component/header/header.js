import { HtmlEditor } from 'devextreme-react';
import React, { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import './header.css';
import { useRef } from "react";


function Header(props) {

    const [data, setData] = useState([]);
    const [attribute, setAttribute] = useState([]);
    const htmlEditor = useRef(null);
    const [inputName, setInputName] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [employee,setEmployee] = useState([]);
    const [id, setId] = useState(1);
    // console.log(props)
    useEffect(()=>{
        const loaddata=()=>{
            setData(listattr);
        }
        loaddata();
        const url = "http://localhost:8000/user";
    
        const fetchData = async () => {
          try {
            const response = await fetch(url);
            const json = await response.json();
            setEmployee(json);
            // console.log(json);
          } catch (error) {
            console.log("error", error);
          }
        };
    
        fetchData();
        const url2 = `http://localhost:8000/user/${id}`;
        const fetchData2 = async () => {
          try {
            const response = await fetch(url2);
            const json = await response.json();
            setInputName(json.name);
            setInputEmail(json.email);
            setInputPassword(json.age);
            // setEmployee(json);
            // console.log(json);
          } catch (error) {
            console.log("error", error);
          }
        };
    
        fetchData2();
        
    },[id])

    const listattr = [
        {id: "1", name: "ho_va_ten", thuoctinh_id: "1"},
        {id: "2", name: "email", thuoctinh_id: "1"},
        {id: "3", name: "age", thuoctinh_id: "1"},
    ]

    const insertTextAtTheBeginning = (item) => {
        props.htmlEditor.current.instance.insertText(
            props.htmlEditor.current.instance.getSelection().index,
          '{{'+item+'}}',
          {
            bold: true,
            color: "green",
          }
        );
      };

      const insertTextAtTheViewName = (text) => {
        console.log(text)
        props.nameView(text)
      };

      const insertTextAtTheViewEmail = (text) => {
        console.log(text)
        props.emailView(text)
      };

      const insertTextAtTheViewPassword = (text) => {
        console.log(text)
        props.passwordView(text)
      };

      const insertAllData=(name, email,password,id)=>{
        props.getResult({
          "ho_va_ten": name,
          "email": email,
          "age": password,
          "id":id
        })
      }

      const handleInputName=(e)=>{

        setInputName(e.target.value)
      }

      const handleInputEmail=(e)=>{

        setInputEmail(e.target.value)
      }

      const handleInputPassword=(e)=>{

        setInputPassword(e.target.value)
      }

      const handleChangeEmployee =(e)=>{
        console.log()
        const idchoose = e.target.value;
        setId(idchoose);
        
      }


    return (
        <div className="header">
        <div>
        <select  className="active" onChange={(e)=>handleChangeEmployee(e)}>
            {employee.length>0 && employee.map((item,index)=>{
                return(
                    <option key={item.id} value={item.id}>{item.name}</option>
                )
            })}
            </select>
        </div>
            {data.length>0 && data.map((item,index)=>{
                return(
                    
                    <li style={{style: "bold"}} key={item.id}>
                    {item.name === 'ho_va_ten' ?<button onClick={() => {insertTextAtTheBeginning(item.name)}}>{item.name}</button>
                     : item.name === 'email'? <button onClick={() => {insertTextAtTheBeginning(item.name)}}>{item.name}</button>
                      : <button onClick={() => {insertTextAtTheBeginning(item.name)}}>{item.name}</button>}
                    
                    </li>
                )
            })}
            <div>
            <input  type="text" value={inputName} onChange={(e) => handleInputName(e)} />
            <input  type="text" value={inputEmail} onChange={(e) => handleInputEmail(e)} />
            <input  type="text" value={inputPassword} onChange={(e) => handleInputPassword(e)} />
            <button  onClick={()=>insertAllData(inputName,inputEmail,inputPassword,id)}>ok</button>
            </div>
        </div>
    );


}

export default Header;