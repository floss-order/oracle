import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import SearchBox from '../components/SearchBox';
import BlockCard from '../components/BlockCard';
import { faker } from '@faker-js/faker';

function Search() {
    const { state } = useLocation();
    console.log(state.searchQuery);
    return (
        <>
            <SearchBox />
            <Heading mt={6} as='p' size='lg'>
                Результаты поиска
            </Heading>
            <Flex gap={4} wrap="wrap" mt={6}>
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
        </>
    );
}

export default Search;