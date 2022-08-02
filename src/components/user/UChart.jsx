import React, { useState, useRef } from 'react';
import Chart from '../Chart';
import { useNode } from '@craftjs/core';
import { useQuery } from 'react-query';
import { Button, CheckboxGroup, Checkbox, Stack, Heading, Input, FormControl, FormLabel, FormErrorMessage, HStack, Box, Text, Select } from '@chakra-ui/react';
import Tree from '../Tree';
import Toggle from '../Toggle';

//http://192.168.2.201:8001/api/v1/data

function UChart({ dataKeys }) {
    const { connectors: { connect, drag } } = useNode();
    const { isLoading, data, error } = useQuery('devices', () => fetch('http://localhost:3001/device').then(res =>
        res.json()
    ));

    if (error) {
        return (
            <p>Error</p>
        )
    };

    if (isLoading) {
        return (
            <p>Loading...</p>
        )
    };

    return (
        <Chart data={data} dataKeys={dataKeys} ref={ref => connect(drag(ref))} />
    );
};

function UChartSettings() {
    const { dataKeys, actions: { setProp } } = useNode((node) => ({
        dataKeys: node.data.props.dataKeys
    }));
    const [keys, setKeys] = useState(dataKeys);
    const [userDataKeys, setUserDataKeys] = useState([]);

    const apiInputRef = useRef();
    const { isFetching, data, error, refetch } = useQuery('deviceData', getDeviceData, {
        refetchOnWindowFocus: false,
        enabled: false,
        keepPreviousData: false
    })

    function getDeviceData() {
        return fetch(apiInputRef.current.value).then(res => res.json());
    }

    function handleSubmit(e) {
        e.preventDefault();
        refetch();
        console.log(data);
    };

    function handleChange(e) {
        setProp((props) => props.dataKeys = e);
    };

    function handleDataKeysChange(e) {
        setKeys(e);
        setUserDataKeys(e);
    }

    function drawChart() {
        setKeys(userDataKeys);
        setProp((props) => props.dataKeys = userDataKeys);
    };

    return (
        <Stack spacing={4}>
            <form onSubmit={handleSubmit}>
                <FormControl isInvalid={error}>
                    <FormLabel>API url</FormLabel>
                    <HStack>
                        <Input isRequired type="text" placeholder="Введите url сервера для получения данных" ref={apiInputRef} />
                        <Button isLoading={isFetching} type="submit">Сохранить</Button>
                    </HStack>
                    {error &&
                        <FormErrorMessage>
                            Произошла ошибка: {error.message}
                        </FormErrorMessage>
                    }
                </FormControl>
            </form>
            <Box mt={4}>
                {data &&
                    <form>
                        <Heading size="md">Данные</Heading>
                        <Box mt={4}>
                            <HStack align="stretch">
                                <FormControl>
                                    <FormLabel>Y</FormLabel>
                                    <Tree onChange={handleDataKeysChange} data={data} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>X</FormLabel>
                                    <Select>
                                        {
                                            Object.keys(data[0]).map((variable, index) => (
                                                <option value={variable} key={index}>{variable}</option>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </HStack>
                        </Box>
                        <Button mt={4} onClick={drawChart} colorScheme="blue">Построить график</Button>
                    </form>
                }
            </Box>
            <CheckboxGroup colorScheme='green' onChange={handleChange} defaultValue={keys}>
                <Heading size="sm">Оси y</Heading>
                <Stack spacing={[1, 5]} direction={['column', 'row']}>
                    {
                        keys.map((dataKey, index) => (
                            <Checkbox defaultChecked key={index} value={dataKey}>{dataKey}</Checkbox>
                        ))
                    }
                </Stack>
            </CheckboxGroup>
        </Stack>
    );
};

UChart.craft = {
    props: {
        dataKeys: []
    },
    related: {
        settings: UChartSettings
    }
};

export default UChart