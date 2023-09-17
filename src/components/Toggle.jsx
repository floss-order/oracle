import React, { useState } from 'react';
import { Button } from '@chakra-ui/react';

function Toggle({ children }) {
  const [isToggled, setIsToggled] = useState(true);

  function toggle(value) {
    setIsToggled(!value);
    console.log(!value);
  }

  return (
    <>
      <Button onClick={() => toggle(isToggled)} variant="link" mb={4}>
        {!isToggled ? 'Показать' : 'Скрыть'}
      </Button>
      {isToggled && children}
    </>
  );
}

export default Toggle;
