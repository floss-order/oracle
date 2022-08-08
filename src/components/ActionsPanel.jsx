import React, { useEffect, useState } from 'react';
import { Button, Heading, Stack, HStack } from '@chakra-ui/react';
import { FiSave, FiSlash, FiRotateCcw, FiRotateCw } from 'react-icons/fi';
import { useEditor } from '@craftjs/core';

function ActionsPanel() {
  const { actions, query, enabled } = useEditor(state => ({
    enabled: state.options.enabled,
  }));
  const [json, setJson] = useState('');

  useEffect(() => {
    setJson(query.serialize());
  }, []);

  function disable() {
    actions.setState(state => (state.options.enabled = false));
  }

  function onSave() {
    disable();
  }

  function onCancel() {
    /*
        - загрузить предыдущее состояние (прокинуть через контекст?)
    */
    disable();
  }

  return (
    <Stack>
      <Heading size="md">Действия</Heading>
      <HStack>
        <Button colorScheme="blue" leftIcon={<FiSave />} onClick={onSave}>
          Сохранить
        </Button>
        <Button colorScheme="red" leftIcon={<FiSlash />} onClick={onCancel}>
          Отменить
        </Button>
        <Button leftIcon={<FiRotateCcw />}>Назад</Button>
        <Button leftIcon={<FiRotateCw />}>Вперёд</Button>
      </HStack>
    </Stack>
  );
}

export default ActionsPanel;
