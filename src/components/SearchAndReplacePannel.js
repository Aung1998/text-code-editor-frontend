import {Box,
  Button,
  ButtonGroup,
  ChakraProvider,
  Input,
  InputGroup,
  theme as chakraTheme,} from "@chakra-ui/react";
import {useState} from "react";
import {findNext,
  closeSearchPanel,
  replaceAll,
  replaceNext,
  SearchQuery,
  setSearchQuery} from "@codemirror/search";


export default function SearchPanel({ view }) {
  const [searchText, setSearchText] = useState("")
  const [replaceText, setReplaceText] = useState("")

  return (
    <ChakraProvider theme={chakraTheme}>
      <Box gap={2} bg={'white'} p={4} borderRadius={'md'}>
        <InputGroup gap={2}>
          <Input placeholder={"Find"} size={"xs"} value={searchText} onChange={(e)=> {
            setSearchText(e.target.value)
          }}  />
          <Box mr={2}>
            <Button width={'100px'} size={"xs"} onClick={()=> {
              const searchQuery = new SearchQuery({
                search:searchText
              })
              view.dispatch({
                effects: setSearchQuery.of(searchQuery)
              })
              findNext(view)
            }}> Find </Button>
          </Box>
        </InputGroup>
        <InputGroup gap={2}>
          <Input placeholder={"Replace"} size={"xs"} value={replaceText} onChange={(e)=> {
            setReplaceText(e.target.value)
          }}  />
          <Box mr={2}>
            <Button width={'100px'} size={"xs"} onClick={()=> {
              const searchQuery = new SearchQuery({
                search:searchText,
                replace: replaceText
              })
              view.dispatch({
                effects: setSearchQuery.of(searchQuery)
              })
              replaceNext(view)
            }}> Replace </Button>
          </Box>
        </InputGroup>
        <ButtonGroup>
          <Button size={'xs'} width={100} onClick={()=>{
            const searchQuery = new SearchQuery({
              search:searchText,
              replace: replaceText
            })
            view.dispatch({
              effects: setSearchQuery.of(searchQuery)
            })
            replaceAll(view)
          }}>Replace All</Button>
          <Button size={'xs'} width={100} onClick={()=> {
            closeSearchPanel(view)
          }}>Close Panel</Button>
        </ButtonGroup>
      </Box>
    </ChakraProvider>
  );
}