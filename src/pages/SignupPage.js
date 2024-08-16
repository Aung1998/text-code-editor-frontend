import {useState} from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex, Box, Heading
} from "@chakra-ui/react";
import {register} from "../util/auth";
import {useNavigate} from "react-router-dom";

export const SignupPage = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState({
    username: "",
    email:"",
    password:""
  });
  const [show, setShow] = useState(false)

  const sendSignUp = () => {
    register(account).then((value) => {
      if (value){
        navigate('/login')
      }
      else{
        console.log("Sign Up Failed!")
      }
    })
  }

  return (
     <Flex width="full" align="center" justifyContent="center">
       <Box p={3}>
         <Box textAlign={"center"}>
           <Heading>Signup</Heading>
         </Box>
         <Box my={4} textAlign='left'>
           <form>
             <FormControl>
              <FormLabel>User Name</FormLabel>
              <Input type='input' onChange={(e)=>{
                let temp = {...account}
                temp.username = e.target.value
                setAccount(temp)
                console.log(account)
              }}/>
             </FormControl>
             <FormControl>
               <FormLabel>Email Address</FormLabel>
               <Input type='email' onChange={(e)=>{
                 let temp = {...account}
                 temp.email = e.target.value
                 setAccount(temp)
               }}/>
             </FormControl>
             <FormControl>
               <FormLabel>Password</FormLabel>
               <Input
                 type={show? 'text' : 'password'}
                 placeholder='Enter password'
                 onClick={() => {
                   setShow(!show)
                 }}
                 onChange={(e)=>{
                   let temp = {...account}
                   temp.password = e.target.value
                   setAccount(temp)
                 }}/>
             </FormControl>
           </form>
           <Box my={2}>
             <Button
               colorScheme={'blue'}
               onClick={sendSignUp}>
               Sign up
             </Button>
           </Box>
         </Box>
       </Box>
     </Flex>
  )
}