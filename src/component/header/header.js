import React, { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import './header.css';

function Header(props) {

    const [data, setData] = useState([]);
    const [attribute, setAttribute] = useState([]);
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



    return (
        <div className="header">
            {data.length>0 && data.map((item,index)=>{
                return(
                    <li style={{style: "bold"}} key={item.id}>{item.name}</li>
                )
            })}
        </div>
    );
}

export default Header;