import React from "react";
import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
import { useEditor } from "@craftjs/core";
import ToolboxItem from "./ToolboxItem";
import LoadCircle from "./LoadCircle";
import InfoCard from './InfoCard';
import SearchBox from "./SearchBox";
import Chart from "./Chart";
import UChart from "./user/UChart";
import ULoadCircle from "./user/ULoadCircle";
import SettingsPanel from "./SettingsPanel";
import UInfoCard from "./user/UInfoCard";
import data from './data.json';

function Toolbox() {
    const { connectors, query } = useEditor();
    return (
        <Box maxH="3xl" w="xl" bg="white" p={6} overflowY="scroll" overflowX="hidden">
            <Heading size="md">Компоненты</Heading>
            <Stack spacing={4}>
                <ToolboxItem title="Графики">
                    <Chart data={data} dataKeys={['n2o', 'co2', 'ch4', 'h2o', 'nh3']} ref={ref => connectors.create(ref, <UChart />)} />
                </ToolboxItem>
                <ToolboxItem title="Показатели">
                    <LoadCircle title="Нагрузка" load={40} minW="100%" ref={ref => connectors.create(ref, <ULoadCircle />)} />
                    <InfoCard title="Карточка" value={4000} minW="100%" ref={ref => connectors.create(ref, <UInfoCard title="Карточка" value={3000} />)} />
                </ToolboxItem>
                <ToolboxItem title="Прочее">
                    <SearchBox />
                </ToolboxItem>
                <SettingsPanel />
            </Stack>
        </Box>
    );
};

export default Toolbox;
