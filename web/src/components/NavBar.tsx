import { Box, Button  , Link as ChakraLink} from '@chakra-ui/react';
import React from 'react'
import { Container } from './Container';
import NextLink from 'next/link'

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({}) => {
        return (
           <Box 
             position="fixed"
             top="1rem"
             left="1rem"
             color="green"
           >
               
            <Container
                flexDirection="row"
                position="fixed"
                width="100%"
                maxWidth="15rem"
                py={3}
                >
                  <ChakraLink
                    flexGrow={3}
                    mx={2}
                    href='/login'
                    >
                <Button width="100%" variant="solid" colorScheme="green">
                    login
                </Button>
                </ChakraLink>

              <ChakraLink  href='/register' flexGrow={1} mx={2}>
               <Button width="100%" variant="outline" colorScheme="green">
                sign up
               </Button>
             </ChakraLink>
             </Container>
                    </Box>
        );
}
// isExternal --> open new tab  <<ChakraLink>>