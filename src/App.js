import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Sidebar } from './components';
import { Home, Login, Project } from './pages';

function App() {
  const location = useLocation();
  const isLoginRoute = location.pathname === '/login';
  const routes = [
    {
      name: 'Карбоновый полигон WayCarbon ',
      path: 'waycarbon',
    },
  ];

  return (
    <Flex bg="gray.100">
      {isLoginRoute ? null : <Sidebar projects={routes} />}
      <Box w="100vw" h="100vh" overflow="hidden">
        <Box p={8} overflow="scroll" h="100vh">
          <Routes>
            <Route path="/login" element={<Login />} />
            {/* <Route path="/" element={<Home />} /> */}
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<Project name={route.name} />}
              />
            ))}
          </Routes>
        </Box>
      </Box>
    </Flex>
  );
}

export default App;
