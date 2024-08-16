import {useState} from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Box,
  Text,
  Heading,
  Link as ChakraLink
} from "@chakra-ui/react";
import {Link as RouteLink, useNavigate} from "react-router-dom";
import {login} from "../util/auth";

export const LoginPage = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const sendLogin = () => {
    //TODO Send login and password to backend
    login({username, password}).then((value) =>{
      if (value){
        navigate('/')
      }
      else{
        console.log("Login Failed!")
      }
    })
  }

  return (
    <Flex width="full" align="center" justifyContent="center">
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
              <Input type='input' onChange={(e) => {
                setPassword(e.target.value);
              }}/>
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
    </Flex>
  )
}