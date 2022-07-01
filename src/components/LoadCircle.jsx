import React from 'react';
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react';
import { Box, Center, Heading } from '@chakra-ui/react';

function LoadCircle({ title, load }) {
    function changeColor(loadValue) {
        if (loadValue > 70) {
            return 'red.400';
        }

        if (loadValue > 50 && loadValue < 70) {
            return 'orange.400';
        } else {
            return 'green.400';
        }
    }
    return (
        <Box bg='white' p={4} borderWidth='1px' borderRadius='lg'>
            <Heading color="gray.400" as='h3' size='md'>{title}</Heading>
            <Center>
                <CircularProgress
                    mt={4}
                    value={load}
                    color={() => changeColor(load)}
                    size='180px'
                    thickness='8px'
                >
                    <CircularProgressLabel>{load}%</CircularProgressLabel>
                </CircularProgress>
            </Center>
        </Box>
    )
}

export default LoadCircle