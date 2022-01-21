import React from 'react';

import HtmlEditor, { Toolbar, Item } from 'devextreme-react/html-editor';
import ButtonGroup, { Item as ButtonItem } from 'devextreme-react/button-group';
import { markup } from './data.js';
import 'devextreme/ui/html_editor/converters/markdown';
import { useState } from 'react/cjs/react.development';
import Header from './component/header/header.js';

const sizeValues = ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt'];
const fontValues = ['Arial', 'Courier New', 'Georgia', 'Impact', 'Lucida Console', 'Tahoma', 'Times New Roman', 'Verdana'];
const defaultSelectedItemKeys = ['Html'];

const App =()=>{
  

  const [valueContent, setValueContent] = useState(markup())
  const [editorValueType,setEditorValueType] = useState('html')

 const  valueChanged=(e)=> {

    setValueContent(e.value);
  }
  const valueTypeChanged=(e)=> {


    setEditorValueType(e.value)
  }


    return (
      <div className="widget-container">
      <Header/>
        <HtmlEditor
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

        <div className="options">
          <ButtonGroup
            onSelectionChanged={(e)=>valueTypeChanged()}
            defaultSelectedItemKeys={defaultSelectedItemKeys}
          >
            <ButtonItem text="Html" />
            <ButtonItem text="Markdown" />
          </ButtonGroup>
          <div className="value-content">
            {valueContent}
          </div>
        </div>
      </div>
    );
  

  

  
}


export default App;
