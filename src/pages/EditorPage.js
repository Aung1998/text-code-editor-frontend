
import {
  Button,
  Input,
  Grid,
  GridItem,
  FormControl, InputLeftElement, InputGroup, ButtonGroup
} from "@chakra-ui/react";

import {useEffect, useState} from "react";
import {OutputDisplay} from "../components/OutputDisplay";
import {createFile} from "../util/codeFilesManagement";
import {useSelector} from "react-redux";
import {Editor} from "../components/Editor";

export const EditorPage = (props) => {
  const [text, setText] = useState("");
  const [initialCode, setInitialCode] = useState("")
  const [input, setInput] = useState("");
  const [newFile, setNewFile] = useState(true)
  const [result, setResult] = useState("")
  const [file, setFile] = useState({})
  const codeFiles = useSelector((state) => state.codeFiles.codeFiles)

  function onClick(){
     // TODO: Send REST REQUEST TO DJANGO SERVER AND SET RESPONSE INTO result
    setResult()
  }

  useEffect(() => {
    const fileNames = codeFiles.map(value => value.name);
    if (file.name in fileNames){
      setNewFile(false)
      // set initial code.
    }
  }, [codeFiles, file.name]);

  function onClickSave() {
    if (newFile) {
      let temp = {...file}
      temp.code = text
      createFile(temp).then((value) => {
        if (value) {
          console.log("Success creating code file!")
          setNewFile(false)
        }
      })
    } else{
      // put the file instead
    }
  }

  return (
    <Grid templateRows={'50px 1fr'} gap={3}>
      <GridItem>
        <Input size={'lg'} placeholder={"Enter your file name here..."} onChange={(e)=>{
          let temp = {...file}
          console.log(e.target)
          temp.name = e.target.value
          setFile(temp)
        }}/>
      </GridItem>
      <GridItem>
        <Grid
          gridTemplateColumns={'1fr 1fr 1fr'}
          gap="1">
          <GridItem>
            <Editor
              code={initialCode}
              onChange={(e)=> {
                setText(e.target.value)
              }
            } />
          </GridItem>
            <GridItem>
              <Grid
                gap={1}>
                <GridItem>
                  <OutputDisplay
                    result = {result}/>
                </GridItem>
                <GridItem>
                  <InputGroup>
                    <InputLeftElement
                      w={[100, 200]}>
                      <Input
                        placeholder={"Enter your input"}
                        onChange={(e)=> setInput(e)} />
                    </InputLeftElement>
                  </InputGroup>
                </GridItem>
              </Grid>
            </GridItem>
            <GridItem>
              Implement Chatbot here
            </GridItem>
            <GridItem>
              <Grid gap={2}
              templateColumns='repeat(2, 1fr)'>
                <FormControl>
                  <ButtonGroup>
                    <Button
                      colorScheme='blue'
                      size='md'
                      className={"blue"}
                      onClick={onClick}>
                      Run
                    </Button>
                    <Button
                      colorScheme='blue'
                      size='md'
                      className={"blue"}
                      onClick={onClickSave}>
                      Save
                    </Button>
                  </ButtonGroup>
                </FormControl>
              </Grid>
            </GridItem>
          </Grid>
      </GridItem>
    </Grid>
  );
}