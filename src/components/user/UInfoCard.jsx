import React, { useRef } from 'react';
import InfoCard from '../InfoCard';
import { useNode } from '@craftjs/core';
import { Input, FormControl, FormLabel, FormHelperText, Stack } from '@chakra-ui/react';

function UInfoCard({ title, value, ...props }) {
    const { connectors: { connect, drag } } = useNode();
    return (
        <InfoCard
            title={title}
            value={value}
            ref={ref => connect(drag(ref))}
            {...props}
        />
    );
};

function UInfoCardSettings() {
    const titleRef = useRef();
    const valueRef = useRef();

    const { title, value, actions: { setProp } } = useNode((node) => ({
        title: node.data.props.title,
        value: node.data.props.value
    }));

    return (
        <FormControl>
            <Stack>
                <FormLabel>Заголовок</FormLabel>
                <Input
                    ref={titleRef}
                    onChange={() => setProp((props) => props.title = titleRef.current.value)}
                    value={title}
                    size="lg"
                />
                <FormLabel>Показатель</FormLabel>
                <Input
                    ref={valueRef}
                    onChange={() => setProp((props) => props.value = valueRef.current.value)}
                    value={value}
                    size="lg"
                />
            </Stack>
        </FormControl>
    )
}

UInfoCard.craft = {
    props: {
        title: "заголовок",
        value: 3000
    },
    related: {
        settings: UInfoCardSettings
    }
};

export default UInfoCard;