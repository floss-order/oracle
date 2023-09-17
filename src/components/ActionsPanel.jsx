import React, { useEffect, useState } from 'react';
import { Button, Heading, Stack, HStack, useToast } from '@chakra-ui/react';
import { FiSave, FiSlash, FiRotateCcw, FiRotateCw } from 'react-icons/fi';
import { useEditor } from '@craftjs/core';
import { useEditorNodes } from '../hooks/useEditorNodes';

function ActionsPanel() {
  const { actions, query, enabled } = useEditor(state => ({
    enabled: state.options.enabled,
  }));
  const [editorNodes, setEditorNodes] = useState(null);
  const { nodes, setNodes } = useEditorNodes();
  const toast = useToast();

  useEffect(() => {
    setEditorNodes(query.serialize());
  }, []);

  function disable() {
    actions.setState(state => (state.options.enabled = false));
  }

  function onSave() {
    disable();
  }

  function onCancel() {
    setNodes(editorNodes);
    disable();
  }

  function onUndo() {
    actions.history.undo();
  }

  function onRedo() {
    actions.history.redo();
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
        <Button onClick={onUndo} leftIcon={<FiRotateCcw />}>
          Назад
        </Button>
        <Button onClick={onRedo} leftIcon={<FiRotateCw />}>
          Вперёд
        </Button>
      </HStack>
    </Stack>
  );
}

export default ActionsPanel;
