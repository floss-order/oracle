import React from 'react';
import SearchBox from '../components/SearchBox';
import BlockCard from '../components/BlockCard';
import LoadCircle from '../components/LoadCircle';
import InfoCard from '../components/InfoCard';
import { Box, Heading, Flex, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, StatGroup } from '@chakra-ui/react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            borderColor: 'rgb(21515, 99, 132)',
            backgroundColor: 'rgba(21515, 99, 132, 0.15)',
        },
        {
            label: 'Dataset 2',
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            borderColor: 'rgb(153, 162, 2315)',
            backgroundColor: 'rgba(153, 162, 2315, 0.15)',
        },
    ],
};

function Home() {
    return (
        <>
            <SearchBox />
            <Flex mt={4} gap={4}>
                <LoadCircle title="нагруженность сети" load={80} />
                <InfoCard
                    title="число блоков"
                    value={faker.random.numeric(8)}
                />
                <InfoCard
                    title="количество транзакций"
                    value={faker.random.numeric(8)}
                />
            </Flex>
            <Box mt={8}>
                <Heading as='h3' size='md'>
                    Недавние транзакции
                </Heading>
            </Box>
            <Flex gap={4} wrap="wrap" mt={4}>
                <BlockCard
                transNumber={faker.random.numeric(15)}
                type="ортофотоплан"
                source="карбоновый полигон"
                date={faker.date.recent(1000).toLocaleDateString()}
                time={faker.date.recent(1000).toTimeString().split(' ')[0]}
                />
                <BlockCard
                transNumber={faker.random.numeric(15)}
                type="ортофотоплан"
                source="карбоновый полигон"
                date={faker.date.recent(1000).toLocaleDateString()}
                time={faker.date.recent(1000).toTimeString().split(' ')[0]}
                />
                <BlockCard
                transNumber={faker.random.numeric(15)}
                type="ортофотоплан"
                source="карбоновый полигон"
                date={faker.date.recent(1000).toLocaleDateString()}
                time={faker.date.recent(1000).toTimeString().split(' ')[0]}
                />
                <BlockCard
                transNumber={faker.random.numeric(15)}
                type="ортофотоплан"
                source="карбоновый полигон"
                date={faker.date.recent(1000).toLocaleDateString()}
                time={faker.date.recent(1000).toTimeString().split(' ')[0]}
                />
                <BlockCard
                transNumber={faker.random.numeric(15)}
                type="ортофотоплан"
                source="карбоновый полигон"
                date={faker.date.recent(1000).toLocaleDateString()}
                time={faker.date.recent(1000).toTimeString().split(' ')[0]}
                />
                <BlockCard
                transNumber={faker.random.numeric(15)}
                type="ортофотоплан"
                source="карбоновый полигон"
                date={faker.date.recent(1000).toLocaleDateString()}
                time={faker.date.recent(1000).toTimeString().split(' ')[0]}
                />
            </Flex>
            {/* <Heading as='h2' size='lg' mt={12}>
                Графики
            </Heading>
            <Box mt={6}>
                <Heading as='h3' size='md'>
                    Фотосинтетически активная радиация
                </Heading>
                <Box bg='white' mt={4} p={4} borderWidth='1px' borderRadius='lg'>
                    <Line options={options} data={data} />
                </Box>
            </Box>
            <Box mt={6}>
                <Heading as='h3' size='md'>
                    Фотосинтетически активная радиация
                </Heading>

                <Box bg='white' mt={4} p={4} borderWidth='1px' borderRadius='lg'>

                </Box>
            </Box> */}
        </>
    );
};

export default Home;
