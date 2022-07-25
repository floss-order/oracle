import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import data from "./data.json"
import paginate from '../utils/paginate';
import { Button } from '@chakra-ui/react';
import epochToDate from '../utils/epochToDate';

const Chart = React.forwardRef((props, ref) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [dataArray, setDataArray] = useState([]);
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

    // console.log(data);

    function handleClick() {
        setCurrentPage(currentPage + 1);
        console.log(paginate(data['Picarro Flux Processor'], 1000, currentPage));
    };

    return (
        <>
            <Button colorScheme="blue">-</Button>
            <Button colorScheme="facebook" onClick={handleClick}>+ {currentPage}</Button>
            <div style={{ width: '100%', height: 500 }} ref={ref} {...props}>
                <ResponsiveContainer>
                    <LineChart
                        data={data['Picarro Flux Processor']}
                        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                    >
                        <XAxis dataKey="epoch_time" tickFormatter={(epoch) => epochToDate(epoch)} fontWeight="600" minTickGap={40} />
                        <Tooltip labelFormatter={(epoch) => epochToDate(epoch, true)} labelStyle={{fontWeight: 'bold'}} />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <Line type="monotone" dataKey="nh3" stroke="#ff7300" yAxisId={0} />
                        <Line type="monotone" dataKey="co2" stroke="#387908" yAxisId={1} />
                        <Line type="monotone" dataKey="ch4" stroke="#767508" yAxisId={2} />
                        <Legend verticalAlign="bottom" height={36} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>
    );
});

export default Chart;