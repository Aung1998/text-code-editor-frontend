import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {Heading, Button, Table, TableContainer, Tbody, Td, Thead, Tr} from "@chakra-ui/react";
import {useSelector} from "react-redux";
import {getFiles, deleteFile} from "../util/codeFilesManagement";


export const FilePage = () => {
  const navigate = useNavigate()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const codeFiles = useSelector((state) => state.codeFiles.codeFiles)

  useEffect(() => {
    if (isAuthenticated){
      // losd files
      getFiles().then(r => {
        // do nothing
      })
    }

  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Heading>Please Login to your account first before viewing Your Files</Heading>
  }

  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Td>File Name</Td>
            <Td>Date Created</Td>
            <Td>Date Modified</Td>
            <Td>Open</Td>
            <Td>Delete</Td>
          </Tr>
        </Thead>
        <Tbody>
          {codeFiles.map((codeFile)=> (
            <Tr key={codeFile.id}>
              <Td>{codeFile.name}</Td>
              <Td>{codeFile.created_date}</Td>
              <Td>{codeFile.modified_date}</Td>
              <Td><Button onClick={()=> {
                navigate('/', {
                  state: {
                    fileId: codeFile.id,
                    fileName: codeFile.name,
                    code: codeFile.code,
                    created_date:  codeFile.created_date
                  }
                })
              }}>
                Open
              </Button></Td>
              <Td><Button onClick={()=> {
                deleteFile(codeFile.id).then((res) => {
                  if(!res){
                    // alert something went wrong!!!
                  }
                })
              }}>Delete</Button> </Td>
            </Tr>
          ))}
          <Tr>
            <Button onClick={()=> {navigate('/')}}>New file</Button>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}