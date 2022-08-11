import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import { useQuery } from 'react-query';
import Search from './pages/Search';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Transaction from './pages/Transaction';
import Project from './pages/Project';
import Carbon from './pages/Carbon';

function App() {
  const { isLoading, error, data } = useQuery('projectsList', () =>
    fetch('http://localhost:3004/projects').then(res => res.json())
  );

  if (isLoading) return 'Loading...';
  if (error) return `An error has occurred: ${error.message}`;

  return (
    <Flex bg="gray.100">
      <Sidebar projects={data} />
      <Box w="100vw" h="100vh" overflow="hidden">
        <Box p={8} overflow="scroll" h="100vh">
          <Routes>
            <Route path="/" element={<Home />} />
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
