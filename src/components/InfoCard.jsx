import React from 'react';
import { Box, Center, Heading, Text } from '@chakra-ui/react';

const InfoCard = React.forwardRef(({ title, value, minW }, ref) => {
    return (
        <Box bg='white' p={4} borderWidth='1px' borderRadius='lg' minW={minW} ref={ref}>
            <Heading color="gray.400" as='h3' size='md'>{title}</Heading>
            <Center>
                <Text noOfLines={3} mt={4} fontSize='5xl'>{value}</Text>
            </Center>
        </Box>
    );
});

export default InfoCard;