
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  Input,
  Grid,
  GridItem,
  FormControl, InputLeftElement, InputGroup, ButtonGroup, InputRightElement
} from "@chakra-ui/react";

import {useEffect, useState} from "react";
import {OutputDisplay} from "../components/OutputDisplay";
import {createFile, getOutput, updateFile} from "../util/codeFilesManagement";
import {useSelector} from "react-redux";
import {Editor} from "../components/Editor";
import {useLocation} from "react-router-dom";
import {Conversation} from "../components/Conversation";

export const EditorPage = () => {

  const location = useLocation();

  const [fileName, setFileName] = useState('')
  const [text, setText] = useState('print(\'Hello World\')');
  const [codeInput, setCodeInput] = useState("");
  const [newFile, setNewFile] = useState(true)
  const [result, setResult] = useState("")
  const codeFiles = useSelector((state) => state.codeFiles.codeFiles)
  const [defaultName, setDefaultName] = useState('')
  const [id, setID] = useState(null)
  const [alertHide, setAlertHide] = useState(true)
  const [alertText, setAlertText] = useState("")
  const [alertTitle, setAlertTitle] = useState('Something Went Wrong!')
  const [alertStatus, setAlertStatus] = useState('error')
  const [fileDate, setFileDate] = useState(Date.now().toString())

  useEffect(() => {
    if (location.state) {
      console.log(location.state.fileId)
      setNewFile(false)
      setID(location.state.fileId)
      setFileName(location.state.fileName)
      setDefaultName(location.state.fileName)
    }}, []);

  useEffect(() => {
    if (codeFiles){
      const codeFileNames = codeFiles.filter((codeFile) => codeFile.name === fileName)
      if (codeFileNames.length !== 0){
        setNewFile(false)
        alertError("You're editing old file", 'Old file warning!','warning')
      }
      else{
        setNewFile(true)
      }
    }
  }, [codeFiles,fileName]);

  function alertError(alertMessage, title='Something went wrong!', status='error'){
    let count = 0
    setAlertHide(false)
    setAlertStatus(status)
    setAlertTitle(title)
    setAlertText(alertMessage)
    const interval = setInterval(() => {
      count = count + 1
      if (count >= 5){
        clearInterval(interval)
        setAlertHide(true)
      }
    }, 1000)
  }

  function onClickSave() {
    if (newFile) {
      const file = {
        "text": text,
        "name":fileName,
      }
      createFile(file).then((value) => {
        if (value) {
          setNewFile(false)
        }
        else{
          alertError("Maybe you haven't login yet!")
        }
      })
    } else {
      if(location.state){
        setFileDate(location.state.created_date)
      }
      const temp = {
        id: id,
        name: fileName,
        code: text,
        created_date: fileDate
      }
      updateFile(temp).then((value) => {
        if (value) {
          console.log("Success saving code file!")
          setNewFile(false)
        }
        else{
          alertError("the server may not be responding!")
        }
      })
    }
  }

  function onClickRun(){
    getOutput({code:text, codeInput:codeInput}).then((value) => {
      if(value.success){
        setResult(value.stdout)
      }
      else{
      alertError("something went wrong running the code!")
      }
    })
  }

  function onClickDownload(){
    const element = document.createElement("a")
    const file = new Blob([text], {
      type: 'text/plain',
    })
    element.href = URL.createObjectURL(file)
    element.download = `${fileName}.py`
    document.body.appendChild(element)
    element.click()
  }

  return (
    <Grid templateRows={'50px 1fr'} gap={3}>
      <Alert hidden={alertHide} status={alertStatus}>
        <AlertIcon />
        <AlertTitle>{alertTitle}</AlertTitle>
        <AlertDescription>{alertText}</AlertDescription>
      </Alert>
      <GridItem>
        <InputGroup size={'lg'}>
          <Input pr='4.5rem' defaultValue={defaultName}  placeholder={"Enter your file name here..."} onChange={(e)=>{
            setFileName(e.target.value)
            console.log([fileName, e.target.value])
          }}/>
          <InputRightElement width='4.5rem'>
            <Button onClick={() => {
              setFileName('')
              setNewFile(true)
            }}>New File</Button>
          </InputRightElement>
        </InputGroup>
      </GridItem>
      <GridItem>
        <Grid
          gridTemplateColumns={'1fr 1fr 1fr'}
          gap="1">
          <GridItem>
            {
              (newFile && location.state) ?
                <Editor
                  code={location.state.code}
                  onChange={(e)=> {
                    setText(e.target.value)
                  }
                  } /> :
                <Editor
                  code={text}
                  onChange={(e)=> {
                    setText(e.target.value)}} />
            }
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
                        onChange={(e)=> setCodeInput(e.target.value)} />
                    </InputLeftElement>
                  </InputGroup>
                </GridItem>
              </Grid>
            </GridItem>
            <GridItem>
              <Conversation />
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
                      onClick={onClickRun}>
                      Run
                    </Button>
                    <Button
                      colorScheme='blue'
                      size='md'
                      className={"blue"}
                      onClick={onClickSave}>
                      Save
                    </Button>
                    <Button
                      colorScheme='blue'
                      size='md'
                      className={"blue"}
                      onClick={onClickDownload}>
                      Download
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