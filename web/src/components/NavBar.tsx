import { Box, Button, Link as ChakraLink } from '@chakra-ui/react';
import React from 'react'
import { Container } from './Container';
import NextLink from 'next/link'
import { useCurrentUserQuery, useLogoutMutation } from '../generated/graphql';

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({ }) => {
    const [{ data, fetching }] = useCurrentUserQuery()
    const [{fetching: fetchingLogout},logout] = useLogoutMutation()
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
            >  {
                fetching? null:!data?.me ?
                    <>
                        <ChakraLink
                            flexGrow={3}
                            mx={2}
                            href='/login'
                        >
                            <Button width="100%" variant="solid" colorScheme="green">
                                login
                            </Button>
                        </ChakraLink>

                        <ChakraLink href='/register' flexGrow={1} mx={2}>
                            <Button width="100%" variant="outline" colorScheme="green">
                                sign up
                            </Button>
                        </ChakraLink>
                    </> :<>
                     <ChakraLink flexGrow={1} mx={2}>
                        <Button width="100%" variant="ghost" colorScheme="green">
                            {data.me.username}
                        </Button>
                    </ChakraLink>
                    <ChakraLink flexGrow={1} mx={2}>
                    <Button onClick={()=>{
                        logout()
                    }}
                     isLoading={fetchingLogout}
                     width="100%"
                      variant="solid"
                       colorScheme="green">
                        logout
                    </Button>
                </ChakraLink>
                </>
                
            }
                
            </Container>

        </Box>
    );
}
// isExternal --> open new tab  <<ChakraLink>>