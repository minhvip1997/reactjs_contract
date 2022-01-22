import React, { useEffect } from 'react';

import HtmlEditor, { Toolbar, Item } from 'devextreme-react/html-editor';
import ButtonGroup, { Item as ButtonItem } from 'devextreme-react/button-group';
import { markup } from './data.js';
import 'devextreme/ui/html_editor/converters/markdown';
import { useState } from 'react/cjs/react.development';
import Header from './component/header/header.js';

import { useRef } from "react";
import Edit_Header from './component/header/edit_header.js';

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
      <div className="widget-container">
      <Header getResult={getResult} htmlEditor={htmlEditor} nameView={callbackFunctionName} emailView={callbackFunctionEmail} passwordView={callbackFunctionPassword}/>
        <HtmlEditor ref={htmlEditor}
          height={300}
          value={valueContent}
          valueType={editorValueType}
          onValueChanged={(e)=>valueChanged(e)}
        >
        
          <Toolbar>
            <Item name="undo" />
            <Item name="redo" />
            <Item name="separator" />
            <Item
              name="size"
              acceptedValues={sizeValues}
            />
            <Item
              name="font"
              acceptedValues={fontValues}
            />
            <Item name="separator" />
            <Item name="bold" />
            <Item name="italic" />
            <Item name="strike" />
            <Item name="underline" />
            <Item name="separator" />
            <Item name="alignLeft" />
            <Item name="alignCenter" />
            <Item name="alignRight" />
            <Item name="alignJustify" />
            <Item name="separator" />
            <Item name="color" />
            <Item name="background" />
            {/* <Item>{data.map((item,index)=>{
              return(<li key={item.id} onClick={()=>insertText(item.name)}>{item.name}</li>);
            })}</Item> */}
          </Toolbar>
          
        </HtmlEditor>

        

        <div className="options">
          <ButtonGroup
            onSelectionChanged={(e)=>valueTypeChanged()}
            defaultSelectedItemKeys={defaultSelectedItemKeys}
          >
            <ButtonItem text="Html" />
            <ButtonItem text="Markdown" />
          </ButtonGroup>
          <div className="value-content">
            {/* {valueContent} */}
            {/* <Edit_Header name={inputName} email={inputEmail} password={inputPassword}/> */}
            <HtmlEditor  value={result === "" ? valueContent : result}></HtmlEditor>   
            {/* <p>Hi</p>
            <p>Ho_va_ten: {inputName}</p>
            <p>Email: {inputEmail}</p>
            <p>Password: {inputPassword}</p> */}
          </div>
        </div>
      </div>
    );
  

}


export default App;
