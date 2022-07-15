import React from "react";
import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
import ToolboxItem from "./ToolboxItem";
import LoadCircle from "./LoadCircle";
import InfoCard from './InfoCard';

function Toolbox() {
    return (
        <Box h="100vh" bg="white" p={6} overflowY="scroll" overflowX="hidden">
            <Heading size="md">Компоненты</Heading>
            <Stack spacing={4}>
                <ToolboxItem title="Графики">
                    <Button>Something 1</Button>
                    <Button>Something 2</Button>
                    <Button>Something 2</Button>
                    <Button>Something 2</Button>
                    <Button>Something 2</Button>
                    <Button>Something 2</Button>
                    <Button>Something 2</Button>
                    <Button>Something 2</Button>
                    <Button>Something 2</Button>
                    <Button>Something 2</Button>
                    <Button>Something 3</Button>
                </ToolboxItem>
                <ToolboxItem title="Показатели">
                    <LoadCircle title="Нагрузка" load={40} minW="100%" />
                    <InfoCard title="Карточка" value={4000} minW="100%" />
                </ToolboxItem>
            </Stack>
        </Box>
    );
};

export default Toolbox;
