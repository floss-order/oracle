import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Avatar,
  Box,
  Badge,
  Flex,
  Heading,
  Icon,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
} from '@chakra-ui/react';
import {
  FiActivity,
  FiClock,
  FiCalendar,
  FiCompass,
  FiImage,
  FiSquare,
  FiFile,
  FiHash,
} from 'react-icons/fi';
import { faker } from '@faker-js/faker';

function Transaction() {
  const params = useParams();
  const { transaction } = params;

  return (
    <>
      <Heading>
        Транзакция
        <Text as="span" color="gray.400">
          {' '}
          {transaction}
        </Text>
      </Heading>
      <Box mt={4}>
        <Heading as="h3" size="md">
          Информация о транзакции
        </Heading>
        <Flex gap={4} wrap="wrap" mt={4}>
          <Flex
            backgroundColor="white"
            p={4}
            borderWidth="1px"
            borderRadius="lg"
          >
            <Icon
              as={FiActivity}
              w={12}
              h={12}
              backgroundColor="gray.200"
              p={2}
              borderRadius="lg"
            />
            <Box ml="3">
              <Text fontWeight="bold">Статус</Text>
              <Text fontSize="sm">Успешно</Text>
            </Box>
          </Flex>
          <Flex
            backgroundColor="white"
            p={4}
            borderWidth="1px"
            borderRadius="lg"
          >
            <Icon
              as={FiHash}
              w={12}
              h={12}
              backgroundColor="gray.200"
              p={2}
              borderRadius="lg"
            />
            <Box ml="3">
              <Text fontWeight="bold">Хэш</Text>
              <Text fontSize="sm">{faker.random.numeric(20)}</Text>
            </Box>
          </Flex>
          <Flex
            backgroundColor="white"
            p={4}
            borderWidth="1px"
            borderRadius="lg"
          >
            <Icon
              as={FiSquare}
              w={12}
              h={12}
              backgroundColor="gray.200"
              p={2}
              borderRadius="lg"
            />
            <Box ml="3">
              <Text fontWeight="bold">Номер блока</Text>
              <Text fontSize="sm">{faker.random.numeric(20)}</Text>
            </Box>
          </Flex>
          <Flex
            backgroundColor="white"
            p={4}
            borderWidth="1px"
            borderRadius="lg"
          >
            <Icon
              as={FiFile}
              w={12}
              h={12}
              backgroundColor="gray.200"
              p={2}
              borderRadius="lg"
            />
            <Box ml="3">
              <Text fontWeight="bold">Тип данных</Text>
              <Text fontSize="sm">ортофотоплан</Text>
            </Box>
          </Flex>
          <Flex
            backgroundColor="white"
            p={4}
            borderWidth="1px"
            borderRadius="lg"
          >
            <Icon
              as={FiCompass}
              w={12}
              h={12}
              backgroundColor="gray.200"
              p={2}
              borderRadius="lg"
            />
            <Box ml="3">
              <Text fontWeight="bold">Источник данных</Text>
              <Text fontSize="sm">карбоновый полигон</Text>
            </Box>
          </Flex>
          <Flex
            backgroundColor="white"
            p={4}
            borderWidth="1px"
            borderRadius="lg"
          >
            <Icon
              as={FiClock}
              w={12}
              h={12}
              backgroundColor="gray.200"
              p={2}
              borderRadius="lg"
            />
            <Box ml="3">
              <Text fontWeight="bold">Время создания</Text>
              <Text fontSize="sm">
                {faker.date.recent(1000).toTimeString().split(' ')[0]}
              </Text>
            </Box>
          </Flex>
          <Flex
            backgroundColor="white"
            p={4}
            borderWidth="1px"
            borderRadius="lg"
          >
            <Icon
              as={FiCalendar}
              w={12}
              h={12}
              backgroundColor="gray.200"
              p={2}
              borderRadius="lg"
            />
            <Box ml="3">
              <Text fontWeight="bold">Дата создания</Text>
              <Text fontSize="sm">
                {faker.date.recent(1000).toLocaleDateString()}
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Box>
      <Box mt={4}>
        <Heading as="h3" size="md">
          Файлы
        </Heading>
        <Flex mt={4} flexDirection="column" gap={2}>
          <Flex
            backgroundColor="white"
            p={4}
            borderWidth="1px"
            borderRadius="lg"
          >
            <Icon
              as={FiImage}
              w={12}
              h={12}
              backgroundColor="gray.200"
              p={2}
              borderRadius="lg"
            />
            <Box ml="3">
              <Text fontWeight="bold">полигон.jpg</Text>
              <Text fontSize="sm">
                {faker.random.numeric(2)}.{faker.random.numeric(2)} мБ
              </Text>
            </Box>
          </Flex>
          <Flex
            backgroundColor="white"
            p={4}
            borderWidth="1px"
            borderRadius="lg"
          >
            <Icon
              as={FiFile}
              w={12}
              h={12}
              backgroundColor="gray.200"
              p={2}
              borderRadius="lg"
            />
            <Box ml="3">
              <Text fontWeight="bold">data.xslx</Text>
              <Text fontSize="sm">
                {faker.random.numeric(2)}.{faker.random.numeric(2)} мБ
              </Text>
            </Box>
          </Flex>
          <Flex
            backgroundColor="white"
            p={4}
            borderWidth="1px"
            borderRadius="lg"
          >
            <Icon
              as={FiImage}
              w={12}
              h={12}
              backgroundColor="gray.200"
              p={2}
              borderRadius="lg"
            />
            <Box ml="3">
              <Text fontWeight="bold">icon.png</Text>
              <Text fontSize="sm">
                {faker.random.numeric(2)}.{faker.random.numeric(3)} мБ
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

export default Transaction;
