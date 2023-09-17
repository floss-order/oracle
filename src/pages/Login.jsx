import React from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Flex,
  Heading,
  Input,
  Button,
  Switch,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue('white', 'gray.700');
  const navigate = useNavigate();

  function handleSubmit(event) {
    console.log(event);
    event.preventDefault();
    navigate('/carbon', {
      replace: false,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <Flex h="100vh" alignItems="center" justifyContent="center">
        <Flex
          flexDirection="column"
          bg={formBackground}
          p={12}
          borderRadius={8}
          boxShadow="lg"
        >
          <Heading mb={6}>Авторизация</Heading>
          <Input
            placeholder="johndoe@gmail.com"
            type="email"
            variant="filled"
            mb={3}
          />
          <Input
            placeholder="**********"
            type="password"
            variant="filled"
            mb={6}
          />
          <Button type="submit" colorScheme="teal" mb={8}>
            Войти
          </Button>
        </Flex>
      </Flex>
    </form>
  );
};

export default Login;
