import React, { createContext, useState, useEffect, useContext } from 'react';
import { useEditor } from '@craftjs/core';

const EditorNodesContext = createContext();

export function ProvideEditorNodes({ children }) {
  const json = useProvideEditorNodes();
  return (
    <EditorNodesContext.Provider value={json}>
      {children}
    </EditorNodesContext.Provider>
  );
}

export function useEditorNodes() {
  return useContext(EditorNodesContext);
}

function useProvideEditorNodes() {
  const [nodes, setNodes] = useState(null);

  const { query } = useEditor();

  return {
    nodes,
    setNodes,
  };
}
