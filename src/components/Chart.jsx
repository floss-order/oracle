import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from '@chakra-ui/react';
import epochToDate from '../utils/epochToDate';
import randomColor from '../utils/randomColor';

const Chart = React.forwardRef(({ data }, ref) => {
    return (
        <>
            <Button colorScheme="blue">-</Button>
            <Button colorScheme="facebook">+</Button>
            <div style={{ width: '100%', height: 500 }} ref={ref}>
                <ResponsiveContainer>
                    <LineChart
                        data={data}
                        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                    >
                        <XAxis dataKey="epoch_time" tickFormatter={(epoch) => epochToDate(epoch)} fontWeight="600" minTickGap={40} />
                        <Tooltip labelFormatter={(epoch) => epochToDate(epoch, true)} labelStyle={{ fontWeight: 'bold' }} />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <Line type="monotone" dataKey="ch4" stroke="#ff7300" yAxisId={0} />
                        <Line type="monotone" dataKey="co2" stroke="#387908" yAxisId={1} />
                        <Line type="monotone" dataKey="h2o" stroke="#767508" yAxisId={2} />
                        <Line type="monotone" dataKey="n20" stroke="#226408" yAxisId={3} />
                        <Line type="monotone" dataKey="nh3" stroke="#923469" yAxisId={4} />
                        {/* {
                            Object.keys(data['Picarro Flux Processor'][0]).map((key, index) => (
                                <Line type="monotone" dataKey={key} stroke={randomColor()} yAxisId={index} key={index} />
                            ))
                        } */}
                        <Legend verticalAlign="bottom" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>
    );
});

export default Chart;