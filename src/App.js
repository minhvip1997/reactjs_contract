import React, { useState } from 'react';

import HtmlEditor, { Toolbar, MediaResizing, Item } from 'devextreme-react/html-editor';
import CheckBox from 'devextreme-react/check-box';
import { markup } from './data.js';
import './style.css';

const sizeValues = ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt'];
const fontValues = ['Arial', 'Courier New', 'Georgia', 'Impact', 'Lucida Console', 'Tahoma', 'Times New Roman', 'Verdana'];
const headerValues = [false, 1, 2, 3, 4, 5];

const App =()=> {
 

  const [isMultiline,setIsMultiline]  = useState(true);
  const [content, setContent] = useState(markup());

  const onChangeTitle = (e)=>{
    console.log(e.target.value)
    setContent(e.target.value)
  }
    return (
      <div className="widget-container">
        <HtmlEditor
          height="725px"
          
        >
          <MediaResizing enabled={true} />
          <Toolbar multiline={isMultiline}>
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
            <Item name="orderedList" />
            <Item name="bulletList" />
            <Item name="separator" />
            <Item
              name="header"
              acceptedValues={headerValues}
            />
            <Item name="separator" />
            <Item name="color" />
            <Item name="background" />
            <Item name="separator" />
            <Item name="link" />
            <Item name="image" />
            <Item name="separator" />
            <Item name="clear" />
            <Item name="codeBlock" />
            <Item name="blockquote" />
            <Item name="separator" />
            <Item name="insertTable" />
            <Item name="deleteTable" />
            <Item name="insertRowAbove" />
            <Item name="insertRowBelow" />
            <Item name="deleteRow" />
            <Item name="insertColumnLeft" />
            <Item name="insertColumnRight" />
            <Item name="deleteColumn" />
          </Toolbar>
        </HtmlEditor>
        <div className="options">
          <div className="caption">Options</div>
          <div className="option">
            <CheckBox
              text="Multiline toolbar"
              value={isMultiline}
              onValueChanged={()=>multilineChanged()}
            />
          </div>
        </div>
      </div>
    );
  };
 const multilineChanged = (e)=> {
    this.setState({
      isMultiline: e.value,
    });
  }


export default App;