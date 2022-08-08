import React from 'react';
import { Box, CheckboxGroup, Checkbox, Stack } from '@chakra-ui/react';

function convertObject(object) {
  return Object.entries(object).map(([key, value]) => ({ [key]: value }));
}

function Tree({ data = [], onChange }) {
  return (
    <CheckboxGroup onChange={onChange}>
      <Stack>
        {Object.keys(data[0]).map((key, index) => (
          <Checkbox value={key} key={index}>
            {key}
          </Checkbox>
        ))}
      </Stack>
    </CheckboxGroup>
  );
}

export default Tree;
