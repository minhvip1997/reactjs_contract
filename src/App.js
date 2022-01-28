import React, { useEffect } from 'react';

import HtmlEditor, { Toolbar, Item } from 'devextreme-react/html-editor';
import ButtonGroup, { Item as ButtonItem } from 'devextreme-react/button-group';
import { markup } from './data.js';
import 'devextreme/ui/html_editor/converters/markdown';
import { useState } from 'react/cjs/react.development';
import Header from './component/header/header.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useRef } from "react";
import Edit_Header from './component/header/edit_header.js';
import Contract from './Contract/Contract.js';
import Nav from './component/Nav/Nav.js';
import Employee from './Employee/Employee.js';
import CreateEmployee from './Employee/CreateEmployee.js';
import AllContract from './Contract/AllContract.js';
import EditContract from './Contract/EditContract.js';
import ListAttribute from './component/List_attribute/list.js';
import ShowContract from './Employee/ShowContract.js';

const sizeValues = ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt'];
const fontValues = ['Arial', 'Courier New', 'Georgia', 'Impact', 'Lucida Console', 'Tahoma', 'Times New Roman', 'Verdana'];
const defaultSelectedItemKeys = ['Html'];

const App =()=>{
  

  const [valueContent, setValueContent] = useState(markup())
  const [editorValueType,setEditorValueType] = useState('html')
  const htmlEditor = useRef(null);
  const [data, setData] = useState([]);
  const [attribute, setAttribute] = useState([]);
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [result, setResult] = useState('')
    useEffect(()=>{
        const loaddata=()=>{
            setData(listattr);
        }
        loaddata();
        // console.log(data)
    },[])

    const listattr = [
        {id: "1", name: "{{ho_va_ten}}", thuoctinh_id: "1"},
        {id: "2", name: "{{email}}", thuoctinh_id: "1"},
        {id: "3", name: "{{password}}", thuoctinh_id: "1"},
    ]

 const  valueChanged=(e)=> {

    setValueContent(e.value);
  }
  const valueTypeChanged=(e)=> {


    setEditorValueType(e.value)
  }

  const getResult = (obj) => {
    // console.log(rvalueContent.replace('{{ho_va_ten}}', name))
    // setResult(valueContent.replace('{{ho_va_ten}}', name))
    // setResult(valueContent.replace('{{email}}', email))
    // setResult(valueContent.replace('{{password}}', password))
    // const newState = valueContent.replace('{{ho_va_ten}}', name);
    // setResult(valueContent => {
    //   if(valueContent.search('{{ho_va_ten}}')){
    //     //  console.log(valueContent)
        
    //   }

    // });
    console.log(obj)

    let copyContent = valueContent;
    // console.log(copyContent)
    for(let i = 0; i < listattr.length; i++){
      let value = listattr[i].name.replace("{{", "");
      value = value.replace("}}", "");

      console.log(listattr[i])
      copyContent = copyContent.replace(listattr[i].name, obj[value])
      
      
      
    }
    // console.log(copyContent)
    setResult(copyContent);
    

    
    // console.log(newState)
    
    

  }
// console.log(result)
  // const insertText=(item)=>{
  //   htmlEditor.current.instance.insertText(
  //     htmlEditor.current.instance.getSelection().index,
  //     item,
  //     {
  //       bold: true,
  //       color: "green",
  //     }
  //   );
  // }

 const callbackFunctionName = (childData) => {
    setInputName(childData);
}

const callbackFunctionEmail = (childData) => {
  setInputEmail(childData);
}

const callbackFunctionPassword = (childData) => {
  setInputPassword(childData);
}

    return (
      <Router>
      <div className="widget-container">
      <Nav/>
      <Switch>
          <Route path="/" exact>
          <Contract/>
          </Route>
          <Route path="/contract" exact>
          <Contract/>
          </Route>
          <Route path="/employee" exact>
          <Employee/>
          </Route>
          <Route path="/employee/add">
          <CreateEmployee/>
          </Route>
          <Route path="/contract/all">
          <AllContract/>
          </Route>
          <Route path="/contract/edit/:id">
          <EditContract/>
          </Route>
          <Route path="/attribute" exact>
          <ListAttribute/>
          </Route>
          <Route path="/contract/usershow/:id">
          <ShowContract/>
          </Route>
        </Switch>
      
      </div>
      </Router>
    );
  

}


export default App;
