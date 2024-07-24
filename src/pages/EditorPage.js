import ReactAce from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import {ChakraBaseProvider, theme as chakraTheme, Button, Input, theme} from "@chakra-ui/react";
import {useState} from "react";
import {OutputDisplay} from "../components/OutputDisplay";

export const EditorPage = (props) => {
  const [text, setText] = useState("");
  const [input, setInput] = useState("");
  const [result, setResult] = useState("")
  function onChange(e){
    setText(e)
  }

  function onClick(){
     // TODO: Send REST REQUEST TO DJANGO SERVER AND SET RESPONSE INTO result
    setResult(text)
  }
  function onLoad(e){
    e.values = text
  }
  return (
    <div>
      <div className="grid grid-cols-2">
        <div>
          <ReactAce
            onLoad={onLoad}
            mode="python"
            theme="github"
            onChange={onChange}
            name="UNIQUE_ID"
            editorProps={{
              $blockScrolling: true
            }}
          />
        </div>
        <div className="grid grid-rows-2">
          <div className="">
            <OutputDisplay
              result = {result}/>
          </div>
          <div className="grid">
            <ChakraBaseProvider theme={theme}>
              <Input
                w={[100, 200]}
                placeholder={"Enter your input"}
                onChange={(e)=> setInput(e)} />
            </ChakraBaseProvider>
          </div>
        </div>
      </div>
      <div>
        <ChakraBaseProvider theme={theme}>
          <Button
            colorScheme='blue'
            size='md'
            className={"blue"}
            onClick={onClick}>
            Run
          </Button>
        </ChakraBaseProvider>
      </div>
    </div>
  );
}