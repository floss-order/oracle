import React from "react";
import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
import ToolboxItem from "./ToolboxItem";
import LoadCircle from "./LoadCircle";
import InfoCard from './InfoCard';
import SearchBox from "./SearchBox";
import Chart from "./Chart";

function Toolbox() {
    return (
        <Box maxH="3xl" w="xl" bg="white" p={6} overflowY="scroll" overflowX="hidden">
            <Heading size="md">Компоненты</Heading>
            <Stack spacing={4}>
                <ToolboxItem title="Графики">
                    <Chart />
                </ToolboxItem>
                <ToolboxItem title="Показатели">
                    <LoadCircle title="Нагрузка" load={40} minW="100%" />
                    <InfoCard title="Карточка" value={4000} minW="100%" />
                </ToolboxItem>
                <ToolboxItem title="Прочее">
                    <SearchBox />
                </ToolboxItem>
            </Stack>
        </Box>
    );
};

export default Toolbox;
