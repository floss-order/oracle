import React from 'react';
import { Box, Heading, Flex } from '@chakra-ui/react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { useQuery } from 'react-query';
import SearchBox from '../components/SearchBox';
import LoadCircle from '../components/LoadCircle';
import InfoCard from '../components/InfoCard';
import Toggle from '../components/Toggle';

function Carbon({ name, apiURL }) {
  const { isLoading, error, data } = useQuery('project', () =>
    fetch(apiURL).then(res => res.json())
  );

  if (isLoading) return 'Loading...';
  if (error) return `An error has occurred: ${error.message}`;
  const sources = data[0];
  console.log(sources);

  return (
    <>
      <Heading as="h1" size="lg" mb={4}>
        {name}
      </Heading>
      <SearchBox />
      <Box mt={8}>
        <Flex gap={4}>
          <LoadCircle title="баланс региона" load={40} />
          <InfoCard title="выбросы парниковых газов (ppm)" value="4000" />
          <InfoCard title="уровень кислорода (ppm)" value="4000" />
        </Flex>
      </Box>
      <Box mt={8}>
        <Heading as="h3" size="md" mb={4}>
          Карбоновые полигоны Чеченской Республики
        </Heading>
        <Box bg="white" p={4} borderWidth="1px" borderRadius="lg">
          <YMaps>
            <Map
              defaultState={{
                center: [43.251890652055764, 45.7797947867823],
                zoom: 5,
              }}
              width="100%"
              height="500px"
            >
              <Placemark
                geometry={[43.251890652055764, 45.7797947867823]}
                properties={{ iconCaption: 'WayCarbon' }}
              />
            </Map>
          </YMaps>
        </Box>
      </Box>
      <Box mt={8}>
        <Heading as="h2" size="lg" mb={4}>
          Источники
        </Heading>
        <Heading as="h3" size="md" mb={4}>
          Оборудование
        </Heading>
      </Box>
    </>
  );
}

export default Carbon;
