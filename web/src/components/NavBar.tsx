import { Box, Button  , Link as ChakraLink} from '@chakra-ui/react';
import React from 'react'
import { Container } from './Container';

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({}) => {
        return (
            // <Box bg='tomato'>
            //     pretty good
            // </Box>
            <Container
                flexDirection="column"
                position="fixed"
                width="100%"
                maxWidth="60rem"
                py={3}
            >
            <Container
                flexDirection="row"
                position="fixed"
                width="100%"
                maxWidth="15rem"
                py={3}
            >
                  <ChakraLink
                    isExternal
                    flexGrow={3}
                    mx={2}
                >
                <Button width="100%" variant="solid" colorScheme="green">
                    login
                </Button>
                </ChakraLink>
              <ChakraLink isExternal href="https://chakra-ui.com" flexGrow={1} mx={2}>
               <Button width="100%" variant="outline" colorScheme="green">
                sign up
               </Button>
             </ChakraLink>
             </Container>
            </Container>
        );
}