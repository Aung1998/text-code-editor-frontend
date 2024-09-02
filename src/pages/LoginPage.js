import {useState} from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  Text,
  Heading, AlertIcon, AlertTitle, AlertDescription, Alert, StackItem, VStack, InputGroup,
} from "@chakra-ui/react";
import {Link as RouteLink, useNavigate} from "react-router-dom";
import {login} from "../util/auth";

export const LoginPage = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alertHide, setAlerHide] = useState(true)
  const [show, setShow] = useState(false)

  function alertError(){
    let count = 0
    setAlerHide(false)
    const interval = setInterval(() => {
      count = count + 1
      if (count >= 5){
        clearInterval(interval)
        setAlerHide(true)
      }
    }, 1000)
  }

  const sendLogin = () => {
    login({username, password}).then((value) =>{
      if (value){
        navigate('/')
      }
      else{
        alertError()
      }
    })
  }

  return (
    <VStack width="full" align="center" justifyContent="center">
      <StackItem>
        <Box p={3}>
          <Box textAlign={"center"}>
            <Heading>Login</Heading>
          </Box>
          <Box my={4} textAlign='left'>
            <form>
              <FormControl>
                <FormLabel>User Name</FormLabel>
                <Input type='username' onChange={(e) => {
                  setUsername(e.target.value);
                }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={show? 'text' : 'password'}
                         placeholder='Enter password'
                         onChange={(e) => {
                           setPassword(e.target.value);
                         }}/>
                  <Button
                    onClick={() => {
                      setShow(!show)
                    }}> Show
                  </Button>
                </InputGroup>
              </FormControl>
            </form>
            <Box my={2}>
              <Button colorScheme={'blue'} onClick={sendLogin}>Login</Button>
            </Box>
            <Text>
              New User?
              <RouteLink to={'/signup'}>
                Sign up
              </RouteLink>:
            </Text>
          </Box>
        </Box>
      </StackItem>
      <StackItem>
        <Alert hidden={alertHide} status='error'>
          <AlertIcon />
          <AlertTitle>Login Failed!!</AlertTitle>
          <AlertDescription>{"Please check your username and password"}</AlertDescription>
        </Alert>
      </StackItem>
    </VStack>
  )
}