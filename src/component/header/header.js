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
    // console.log(props)
    useEffect(()=>{
        const loaddata=()=>{
            setData(listattr);
        }
        loaddata();
    },[])

    const listattr = [
        {id: "1", name: "ho_va_ten", thuoctinh_id: "1"},
        {id: "2", name: "email", thuoctinh_id: "1"},
        {id: "3", name: "password", thuoctinh_id: "1"},
    ]

    const insertTextAtTheBeginning = (item) => {
        // Inserts bold, green text at the beginning of the content
        console.log(props.htmlEditor.current.instance.getSelection(), "item");
        props.htmlEditor.current.instance.insertText(
            props.htmlEditor.current.instance.getSelection().index,
          '<<'+item+'>>',
          {
            bold: true,
            color: "green",
          }
        );
      };

      const handleInputName=(e)=>{
        console.log(e.target.value)
        setInputName(e.target.value)
      }

      const handleInputEmail=(e)=>{
        console.log(e.target.value)
        setInputEmail(e.target.value)
      }

      const handleInputPassword=(e)=>{
        console.log(e.target.value)
        setInputPassword(e.target.value)
      }


    return (
        <div className="header">
            {data.length>0 && data.map((item,index)=>{
                return(
                    
                    <li style={{style: "bold"}} key={item.id}>
                    {item.name === 'ho_va_ten' ? <><input key={item.id} type="text" value={inputName} onChange={(e) => handleInputName(e)} /><button onClick={() => insertTextAtTheBeginning(item.name)}>{item.name}</button></>
                     : item.name === 'email'? <><input key={item.id} type="text" value={inputEmail} onChange={(e) => handleInputEmail(e)} /><button onClick={() => insertTextAtTheBeginning(item.name)}>{item.name}</button></>
                      : <><input key={item.id} type="text" value={inputPassword} onChange={(e) => handleInputPassword(e)} /><button onClick={() => insertTextAtTheBeginning(item.name)}>{item.name}</button></>}
                    
                    </li>
                )
            })}
        </div>
    );
}

export default Header;