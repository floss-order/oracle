import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

function ToolboxItem({ title, children }) {
    return (
        <Flex direction="column" mt={4} p={4} borderWidth='2px' borderRadius='lg'>
            <Text fontWeight="semibold">{title}</Text>
            <Flex direction="row" mt={4} overflow="scroll" gap={4} wrap="wrap">
                {children}
            </Flex>
        </Flex>
    );
};

export default ToolboxItem;
