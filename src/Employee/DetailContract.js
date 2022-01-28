import axios from 'axios';
import { HtmlEditor } from 'devextreme-react';
import ButtonGroup, { Item as ButtonItem } from 'devextreme-react/button-group';
import { Item, Toolbar } from 'devextreme-react/html-editor';
import React, { useRef } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect, useState } from 'react/cjs/react.development';
import './DetailContract.css';


const sizeValues = ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt'];
const fontValues = ['Arial', 'Courier New', 'Georgia', 'Impact', 'Lucida Console', 'Tahoma', 'Times New Roman', 'Verdana'];
const defaultSelectedItemKeys = ['Html'];
function DetailContract(props) {


  const {id} = useParams();
  const [valueContent, setValueContent] = useState('');
  const [editorValueType,setEditorValueType] = useState('html')
  const htmlEditor = useRef(null);
  const [attribute, setAttribute] = useState([]);
  const [result, setResult] = useState('');
  const [contract, setContract] = useState([]);
  const [nameContract, setNameContract] = useState('')
  const [idcon, setId] = useState(id);
    useEffect(()=>{
        

        

        const url2 = `http://localhost:8000/employeecontract/${id}`;

        const fetchData2 = async () => {
          try {
            const response = await fetch(url2);
            const json = await response.json();
            setValueContent(json.content);
            valueChanged(json.content);
            // setNameContract(json.name);
            console.log(json)
          } catch (error) {
            console.log("error", error);
          }
        };
    
        fetchData2();
        
    },[id])


    

 const  valueChanged=(e)=> {

    setValueContent(e.value);
  }
  const valueTypeChanged=(e)=> {


    setEditorValueType(e.value)
  }

//   const saveTypeContract = async (e)=>{
//     //   console.log(e)
//     // e.preventDefault();
//     const saveContract = {
//         name: nameContract,
//         content: e
//     }

//     return await axios.put(`http://localhost:8000/contract/${id}`, saveContract )
//         .then(res => {
//             console.log(res);
//             console.log(res.data);
//           })
//         .catch(function (error) {
//             console.log(error);
//           });
//   }



 
    return (
        <div className="widget-container">
        
        
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
            
          </Toolbar>
          
         
        </HtmlEditor>

        {/* <button className="save" onClick={(e)=>saveTypeContract(valueContent)}>Save</button> */}
        

        
      </div>
        
    );
}

export default DetailContract;