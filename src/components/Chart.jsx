import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import epochToDate from '../utils/epochToDate';
import randomColor from '../utils/randomColor';
import { maxNumber } from '../utils/maxNumber';

const Chart = React.forwardRef(({ data, dataKeys, chartSettings }, ref) => {
    const [bottom, setBottom] = useState(1000);
    const [top, setTop] = useState(0);

    useEffect(() => {
        if (Array.isArray(data)) {
            setBottom(maxNumber(data, chartSettings.dataKeysY));
        };
    }, [bottom, data, chartSettings, ref]);

    return (
        <>
            <div style={{ width: '100%', height: 500 }} ref={ref}>
                <ResponsiveContainer>
                    <LineChart
                        data={data}
                        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                    >
                        <YAxis allowDataOverflow domain={[top, bottom]} type="number" yAxisId="1" />
                        <XAxis
                            dataKey={chartSettings?.datakeyX}
                            tickFormatter={(epoch) => epochToDate(epoch)} fontWeight="600"
                            minTickGap={40}
                        />
                        <Tooltip labelFormatter={(epoch) => epochToDate(epoch, true)} labelStyle={{ fontWeight: 'bold' }} />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        {/* <Line type="monotone" dataKey="ch4" stroke="#ff7300" yAxisId={0} />
                        <Line type="monotone" dataKey="co2" stroke="#387908" yAxisId={1} />
                        <Line type="monotone" dataKey="h2o" stroke="#767508" yAxisId={2} />
                        <Line type="monotone" dataKey="n20" stroke="#226408" yAxisId={3} />
                        <Line type="monotone" dataKey="nh3" stroke="#923469" yAxisId={4} /> */}
                        {/* {
                            Object.keys(data['Picarro Flux Processor'][0]).map((key, index) => (
                                <Line type="monotone" dataKey={key} stroke={randomColor()} yAxisId={index} key={index} />
                            ))
                        } */}
                        {
                            chartSettings?.dataKeysY.map((dataKey, index) => (
                                <Line type="monotone" dataKey={dataKey} stroke="#226408" yAxisId="1" key={index} />
                            ))
                        }
                        <Legend verticalAlign="bottom" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>
    );
});

export default Chart;