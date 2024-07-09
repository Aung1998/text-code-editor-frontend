import {useState} from "react";
import './App.css';
import ReactAce from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import {Button} from "@chakra-ui/react";

function App() {

 const [text, setText] = useState("");
 function onChange(e){
   setText(e)
  }
  return (
    <div className="App">
      <div>
        <ReactAce
          mode="python"
          theme="github"
          onChange={onChange}
          name="UNIQUE_ID"
          editorProps={{ $blockScrolling: true }}

          />
      </div>
      <Button
          onClick={() =>{
              console.log(text)
          }}>
          Run
      </Button>
    </div>
  );
}

export default App;
