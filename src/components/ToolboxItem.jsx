import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

function ToolboxItem({ title, children }) {
    return (
        <Box mt={4} p={4} borderWidth='2px' borderRadius='lg'>
            <Text fontWeight="semibold">{title}</Text>
            <Flex direction="row" mt={4} overflow="scroll" gap={4} wrap="wrap">
                {children}
            </Flex>
        </Box>
    );
};

export default ToolboxItem;
