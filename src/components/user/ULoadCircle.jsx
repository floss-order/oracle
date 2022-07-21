import React, { useRef } from 'react';
import { useNode } from '@craftjs/core';
import LoadCircle from '../LoadCircle';

function ULoadCircle({ title, load, ...props }) {
    const { connectors: { connect, drag } } = useNode();
    return (
        <LoadCircle title={title} load={load} ref={ref => connect(drag(ref))} {...props} />
    );
}

export default ULoadCircle