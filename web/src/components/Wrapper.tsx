import { Box } from '@chakra-ui/react';
import React from 'react'

interface WrapperProps {

}

export const Wrapper: React.FC<WrapperProps> = ({children}) => {
        return (
            <Box mt={8} maxW={800} w="100%">{children}</Box>
        );
}