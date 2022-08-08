import React, { useRef } from 'react';
import { useNode } from '@craftjs/core';
import {
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Stack,
} from '@chakra-ui/react';
import LoadCircle from '../LoadCircle';

function ULoadCircle({ title, load, ...props }) {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <LoadCircle
      title={title}
      load={load}
      ref={ref => connect(drag(ref))}
      {...props}
    />
  );
}

function ULoadCircleSetting() {
  const titleRef = useRef();
  const loadRef = useRef();

  const {
    title,
    load,
    actions: { setProp },
  } = useNode(node => ({
    title: node.data.props.title,
    load: node.data.props.load,
  }));

  return (
    <FormControl>
      <Stack>
        <FormLabel>Заголовок</FormLabel>
        <Input
          ref={titleRef}
          onChange={() =>
            setProp(props => (props.title = titleRef.current.value))
          }
          value={title}
          size="lg"
        />
        <FormLabel>Значение нагрузки</FormLabel>
        <Input
          ref={loadRef}
          onChange={() =>
            setProp(props => (props.load = loadRef.current.value))
          }
          value={load}
          size="lg"
        />
      </Stack>
    </FormControl>
  );
}

ULoadCircle.craft = {
  props: {
    title: 'нагрузка',
    load: 40,
  },
  related: {
    settings: ULoadCircleSetting,
  },
};

export default ULoadCircle;
