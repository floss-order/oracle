import React, { useState } from 'react';
import Chart from '../Chart';
import { useNode } from '@craftjs/core';
import { useQuery } from 'react-query';
import { Button, CheckboxGroup, Checkbox, Stack } from '@chakra-ui/react';

function UChart({ dataKeys }) {
    const { connectors: { connect, drag } } = useNode();
    const { isLoading, data, error } = useQuery('devices', () => fetch('http://192.168.2.201:8001/api/v1/data').then(res =>
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

    console.log(data);

    return (
        <Chart data={data['Picarro Flux Processor']} dataKeys={dataKeys} ref={ref => connect(drag(ref))} />
    );
};

function UChartSettings() {
    const { dataKeys, actions: { setProp } } = useNode((node) => ({
        dataKeys: node.data.props.dataKeys
    }));
    const [keys, setKeys] = useState(dataKeys);

    function handleChange(e) {
        console.log(e);
        setProp((props) => props.dataKeys = e);
    };

    return (
        <CheckboxGroup colorScheme='green' onChange={handleChange} defaultValue={keys}>
            <Stack spacing={[1, 5]} direction={['column', 'row']}>
                {
                    keys.map((dataKey, index) => (
                        <Checkbox defaultChecked key={index} value={dataKey}>{dataKey}</Checkbox>
                    ))
                }
            </Stack>
        </CheckboxGroup>
    );
};

UChart.craft = {
    props: {
        dataKeys: ['n2o', 'co2', 'ch4', 'h2o', 'nh3']
    },
    related: {
        settings: UChartSettings
    }
};

export default UChart