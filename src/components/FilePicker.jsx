import { Checkbox, CheckboxGroup, Flex, Select, Stack } from '@chakra-ui/react';
import React from 'react';

export function getDeviceIdByName(deviceName, data, deviceList) {
  if (Object.keys(data).find(d => d === deviceName)) {
    const device = deviceList.device_list.find(d => d.name === deviceName);

    if (device) return device.id;
  }
}

function FilePicker({ data, deviceList, currentDevice }) {
  const devices = ['eddy'];

  console.log(currentDevice);

  /*
    1. передать идентификатор текущего устройства
    2. выбрать текущее устройство в списке
  */

  return (
    <Stack>
      {devices && <DevicePicker devices={devices} />}
      {/* <DatePicker /> */}
    </Stack>
  );
}

function DevicePicker({ devices }) {
  return (
    <Select placeholder="Выберите устройство">
      {devices.map((device, index) => (
        <option key={index + device} value={device}>
          {device}
        </option>
      ))}
    </Select>
  );
}

function DatePicker() {}

export default FilePicker;
