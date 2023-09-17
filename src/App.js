import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Sidebar } from './components';
import { Login, Project } from './pages';

function App() {
  const { isLoading, error, data } = useQuery('projectsList', () =>
    fetch('http://localhost:3004/projects').then(res => res.json())
  );

  const location = useLocation();

  if (isLoading) return 'Loading...';
  if (error) return `An error has occurred: ${error.message}`;

  const isLoginRoute = location.pathname === '/';

  return (
    <Flex bg="gray.100">
      {isLoginRoute ? null : <Sidebar projects={data} />}{' '}
      <Box w="100vw" h="100vh" overflow="hidden">
        <Box p={8} overflow="scroll" h="100vh">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/waycarbon"
              element={<Project name="Карбоновый полигон WayCarbon" />}
            />
          </Routes>
        </Box>
      </Box>
    </Flex>
  );
}

export default App;
