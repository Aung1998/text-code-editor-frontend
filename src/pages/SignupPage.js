import {useState} from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex, Box, Heading, AlertIcon, AlertTitle, AlertDescription, Alert, VStack, StackItem, InputGroup
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
  const [alertHide, setAlerHide] = useState(true)

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

  const sendSignUp = () => {
    register(account).then((value) => {
      if (value){
        navigate('/login')
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
                 <InputGroup>
                   <Input
                     type={show? 'text' : 'password'}
                     placeholder='Enter password'
                     onChange={(e)=>{
                       let temp = {...account}
                       temp.password = e.target.value
                       setAccount(temp)
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
               <Button
                 colorScheme={'blue'}
                 onClick={sendSignUp}>
                 Sign up
               </Button>
             </Box>
           </Box>
         </Box>
       </StackItem>
       <StackItem>
         <Alert hidden={alertHide} status='error'>
           <AlertIcon />
           <AlertTitle>Signup Failed!!</AlertTitle>
           <AlertDescription>{`The ${account.username} name may already exist! If you are ${account.username} please login instead!`}</AlertDescription>
         </Alert>
       </StackItem>
     </VStack>
  )
}