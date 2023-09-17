import React from 'react';
import { useEditor } from '@craftjs/core';
import { Button, Heading } from '@chakra-ui/react';

function SettingsPanel() {
  const { selected, actions } = useEditor((state, query) => {
    const [currentNodeId] = state.events.selected;
    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings:
          state.nodes[currentNodeId].related &&
          state.nodes[currentNodeId].related.settings,
        isDeletable: query.node(currentNodeId).isDeletable(),
      };
    }

    return { selected };
  });

  return selected ? (
    <>
      {selected.settings && <Heading size="md">Настройки компонента</Heading>}

      {selected.settings && React.createElement(selected.settings)}

      {selected.isDeletable && (
        <Button
          colorScheme="red"
          onClick={() => {
            actions.delete(selected.id);
          }}
          size="lg"
        >
          Удалить
        </Button>
      )}
    </>
  ) : null;
}

export default SettingsPanel;
