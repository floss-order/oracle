import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Routes, Route, useLocation } from 'react-router-dom'; // Import useLocation from react-router-dom
import { useQuery } from 'react-query';
import Search from './pages/Search';
import Sidebar from './components/Sidebar';
import Transaction from './pages/Transaction';
import Project from './pages/Project';
import Login from './pages/Login';

function App() {
  const { isLoading, error, data } = useQuery('projectsList', () =>
    fetch('http://localhost:3004/projects').then(res => res.json())
  );

  const location = useLocation(); // Get the current location

  if (isLoading) return 'Loading...';
  if (error) return `An error has occurred: ${error.message}`;

  const isLoginRoute = location.pathname === '/';

  return (
    <Flex bg="gray.100">
      {isLoginRoute ? null : <Sidebar projects={data} />}{' '}
      {/* Render Sidebar only if it's not a Login route */}
      <Box w="100vw" h="100vh" overflow="hidden">
        <Box p={8} overflow="scroll" h="100vh">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/search" element={<Search />} />
            <Route
              path="/transactions/:transaction"
              element={<Transaction />}
            />
            {data.map((project, index) => (
              <Route
                key={index}
                path={`/${project.slug}`}
                element={<Project name={project.name} />}
              />
            ))}
          </Routes>
        </Box>
      </Box>
    </Flex>
  );
}

export default App;
