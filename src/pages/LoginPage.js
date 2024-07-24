import {useState} from "react";
import {ChakraBaseProvider, theme as chakraTheme, Button, FormControl, FormLabel, Input, theme} from "@chakra-ui/react";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const sendLogin = (e) => {
    //TODO Send login and password to backend
    console.log(e)
  }

  return (
   <ChakraBaseProvider theme={theme}>
     <FormControl>
        <FormLabel>Email Address</FormLabel>
        <Input type='email' onChange={setEmail}/>
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input type='input' onChange={setPassword}/>
      </FormControl>
      <Button colorScheme={'blue'} onChange={sendLogin} ></Button>
   </ChakraBaseProvider>
  )
}