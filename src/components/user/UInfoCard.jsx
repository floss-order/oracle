import React from 'react';
import InfoCard from '../InfoCard';
import { useNode } from '@craftjs/core';

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

export default UInfoCard;