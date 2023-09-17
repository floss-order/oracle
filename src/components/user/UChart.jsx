import React, { useState, useRef, useEffect } from 'react';
import { useNode } from '@craftjs/core';
import { useQuery } from 'react-query';
import {
  Button,
  CheckboxGroup,
  Checkbox,
  Stack,
  Heading,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  HStack,
  Box,
  Text,
  Select,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import Tree from '../Tree';
import Toggle from '../Toggle';
import Chart from '../Chart';
import * as transformers from '../../utils/transformers';
import { transformersDescription } from '../../utils/transformers/transformersDescription';

// http://192.168.2.201:8001/api/v1/data

function UChart({ chartData, dataKeys, chartSettings }) {
  console.log(chartSettings);
  const {
    connectors: { connect, drag },
  } = useNode();

  const { isLoading, data, error } = useQuery('devices', () =>
    fetch('http://localhost:3004/device').then(res => res.json())
  );

  if (error) {
    return <p>Error</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ width: '100%' }}>
      {chartSettings && <Heading size="md">{chartSettings.title}</Heading>}
      <Chart
        data={Array.isArray(chartData) ? chartData : data}
        chartSettings={chartSettings}
        dataKeys={dataKeys}
        ref={ref => connect(drag(ref))}
      />
    </div>
  );
}

function UChartSettings() {
  const {
    dataKeys,
    chartSettings,
    actions: { setProp },
  } = useNode(node => ({
    dataKeys: node.data.props.dataKeys,
    chartSettings: node.data.props.chartSettings,
  }));
  const [keys, setKeys] = useState(dataKeys);
  const [userDataKeys, setUserDataKeys] = useState([]);
  const [apiURL, setApiURL] = useState('');

  const { isFetching, data, error, refetch } = useQuery(
    'deviceData',
    getDeviceData,
    {
      refetchOnWindowFocus: false,
      enabled: false,
      keepPreviousData: false,
    }
  );

  useEffect(() => {
    if (apiURL) refetch();
  }, [apiURL]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
  });

  const {
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
    control: control2,
    watch: watch2,
  } = useForm({
    mode: 'onBlur',
  });

  const datakeyX = watch2('datakeyX');
  const datakeysY = watch2('datakeysY');
  // console.log(datakeysY);

  function getDeviceData() {
    return fetch(apiURL).then(res => res.json());
  }

  function onApiURLSubmit(input) {
    setApiURL(input.apiURL);
  }

  function onChartSettingsSubmit(chartSettings) {
    console.log(chartSettings);
    setProp(props => (props.chartSettings = chartSettings));
  }

  function handleChange(e) {
    setProp(props => (props.dataKeys = e));
  }

  function handleDataKeysChange(e) {
    setKeys(e);
    setUserDataKeys(e);
  }

  function drawChart() {
    setKeys(userDataKeys);
    setProp(props => (props.dataKeys = userDataKeys));
  }

  return (
    <Stack spacing={4}>
      <form onSubmit={handleSubmit(onApiURLSubmit)}>
        <FormControl isRequired isInvalid={error}>
          <FormLabel>API url</FormLabel>
          <HStack>
            <Input
              type="text"
              placeholder="Введите url сервера для получения данных"
              {...register('apiURL', { required: true })}
            />
            <Button isLoading={isFetching} type="submit">
              Сохранить
            </Button>
          </HStack>
          {error && (
            <FormErrorMessage>
              Произошла ошибка: {error.message}
            </FormErrorMessage>
          )}
        </FormControl>
      </form>
      <Box mt={4}>
        {data && (
          <form onSubmit={handleSubmit2(onChartSettingsSubmit)}>
            <Stack spacing={4}>
              <Box>
                <Heading size="md">Данные</Heading>
                <FormControl>
                  <FormLabel>Заголовок</FormLabel>
                  <Input
                    type="text"
                    placeholder="Введите заголовок графика"
                    {...register2('title', { required: true })}
                  />
                </FormControl>
                <HStack align="stretch">
                  <FormControl>
                    <FormLabel>Y</FormLabel>
                    <Controller
                      control={control2}
                      name="datakeysY"
                      defaultValue={false}
                      render={({ field: { onChange, ref } }) => (
                        <CheckboxGroup ref={ref} onChange={onChange}>
                          <Stack>
                            {Object.keys(data[0]).map((key, index) => (
                              <Checkbox value={key} key={index}>
                                {key}
                              </Checkbox>
                            ))}
                          </Stack>
                        </CheckboxGroup>
                      )}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>X</FormLabel>
                    <Select {...register2('datakeyX', { required: true })}>
                      {Object.keys(data[0]).map((variable, index) => (
                        <option value={variable} key={index}>
                          {variable}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </HStack>
              </Box>
              {/* <Box>
                                <Stack>
                                    <Heading size="md">Трансформации</Heading>
                                    {
                                        Object.keys(transformers).map((transformer, index) => (
                                            <Box>
                                                <Heading size="sm">
                                                    {transformersDescription[index][transformer]}
                                                </Heading>
                                                <Controller
                                                    control={control2}
                                                    name="transformations"
                                                    defaultValue={false}
                                                    render={({ field: { onChange, ref } }) => (
                                                        <CheckboxGroup
                                                            onChange={onChange}
                                                        >
                                                            {
                                                                datakeysY &&
                                                                datakeysY.map((datakeyY, index) => (
                                                                    <Checkbox 
                                                                    value={datakeyY}>{datakeyY}</Checkbox>
                                                                ))
                                                            }
                                                        </CheckboxGroup>)}
                                                />
                                            </Box>
                                        ))
                                    }
                                </Stack>
                            </Box> */}
              <Button type="submit" colorScheme="blue" size="lg">
                Построить график
              </Button>
            </Stack>
          </form>
        )}
      </Box>
      <CheckboxGroup
        colorScheme="green"
        onChange={handleChange}
        defaultValue={keys}
      >
        <Heading size="sm">Оси y</Heading>
        <Stack spacing={[1, 5]} direction={['column', 'row']}>
          {keys.map((dataKey, index) => (
            <Checkbox defaultChecked key={index} value={dataKey}>
              {dataKey}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
    </Stack>
  );
}

UChart.craft = {
  props: {
    dataKeys: [],
  },
  related: {
    settings: UChartSettings,
  },
};

export default UChart;
