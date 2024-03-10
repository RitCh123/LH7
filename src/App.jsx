import React, {useState} from 'react'

import "./App.css";

// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'

import { Text, VStack, HStack, Input, Button, FormControl, FormLabel, Card, CardBody, StackDivider, Flex, Spacer } from '@chakra-ui/react'

function App() {
  // 2. Wrap ChakraProvider at the root of your app

  const[itemText, setItemText] = useState("")
  
  const [items, setItems] = useState([])

  const [file, setFile] = useState(null);

  const [menu, setMenu] = useState([])

    

  const itemsCard = items.map((item) => 
    <Card>
      <CardBody>
        <Text fontSize='lg' as='i'>{item}</Text>
      </CardBody>
    </Card> 
  );

  const menuCard = menu.map((item) => 
    <Card>
      <CardBody>
        <Text fontSize='lg' as='i'>{item[0]}</Text>
      </CardBody>
    </Card> 
  );
    
    
    async function sendPOSTRequest(url = "https://4eb6fa85-411a-4f98-8ea9-5b378304b8bc-00-1esskkal94en7.worf.repl.co/") {
    const formData = new FormData();
    formData.append('file', file, 'least_food_wastage.csv'); 

    formData.append('items', items)
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached// no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: formData, // body data type must match "Content-Type" header
    })
    .then(function(response){ return response.json(); })
    .then(function(data) {
        const items = data;
        console.log(items["data"])
        setMenu(items["data"])
    })
     // parses JSON response into native JavaScript objects
  }
  
  return (
    <main style={{margin: "1.5%"}}>
      <ChakraProvider>
        <VStack
          spacing={10}
          align='stretch'
        >
          <div>
            <Text fontSize='4xl' as='b'>CustoMenu</Text>
          </div>
          <VStack
            spacing={10}
            align='stretch'
          >
            <div>
              <HStack spacing='10px'>
                <HStack
                  spacing={5}
                  align='stretch'
                >
  
                  <Input placeholder='Enter food menu items...' size='lg' onChange={(e) => setItemText(e.target.value)} style={{width: "35vw"}}/>
                  <Button colorScheme='blue' size='lg' onClick={() => {
                    setItems([...items, itemText])
                    setItemText("")
                  }}>
                    Add Item
                  </Button>
                </HStack>
                <Spacer />
                <div>
                  <VStack>
                    <Text fontSize='2xl' as='u'>Upload Usage CSV:</Text>
                    <Input
                       placeholder="Select Date and Time"
                       size="md"
                       type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                    </VStack>
                </div>
                  
                
  
                
              </HStack>
            </div>
            <div>
              <Text fontSize='xl' as='u'>Food Items: </Text>
            </div>
            <div style={{width: "45vw"}}>
              <VStack
                divider={<StackDivider borderColor='gray.200' />}
                spacing={4}
                align='stretch'
              >
                {itemsCard}
              </VStack>
            </div>
          </VStack>
          <div style={{display: "flex", justifyContent: "center"}}>
            <Button onClick={() => sendPOSTRequest()} style={{width: "50%"}}>Create Menu</Button>
          </div>
          <div>
            <VStack
              divider={<StackDivider borderColor='gray.200' />}
              spacing={4}
              align='stretch'
            >
              {menuCard}
            </VStack>
            
          </div>
        </VStack>
        
      </ChakraProvider>
    </main>
  )
}



export default App;