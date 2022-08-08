import React from 'react';
import { useEditor } from '@craftjs/core';
import { Heading } from '@chakra-ui/react';

function SettingsPanel() {
  const { selected } = useEditor(state => {
    const [currentNodeId] = state.events.selected;
    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings:
          state.nodes[currentNodeId].related &&
          state.nodes[currentNodeId].related.settings,
      };
    }

    return { selected };
  });

  return selected ? (
    <>
      {selected.settings && <Heading size="md">Настройки компонента</Heading>}

      {selected.settings && React.createElement(selected.settings)}
    </>
  ) : null;
}

export default SettingsPanel;
