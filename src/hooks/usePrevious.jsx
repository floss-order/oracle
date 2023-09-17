import React, { useEffect, useRef } from 'react';

export function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = JSON.parse(JSON.stringify(value));
  }, [value]);

  return ref.current;
}
