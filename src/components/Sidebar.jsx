import React, { useState } from 'react';
import {
  Flex,
  IconButton,
  Stack,
  Avatar,
  Text,
  Button,
} from '@chakra-ui/react';
import { FiMenu, FiHome, FiMinus, FiBox } from 'react-icons/fi';
import NavItem from './NavItem';
import { Link } from 'react-router-dom';

function Sidebar({ projects }) {
  const [navSize, changeNavSize] = useState('large');
  return (
    <Flex
      // pos="sticky"
      h="100vh"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      w={navSize == 'small' ? '75px' : '220px'}
      flexDir="column"
      justifyContent="space-between"
      bg="white"
    >
      <Stack h="100%" justifyContent="space-between" p={2}>
        <Flex
          flexDir="column"
          // w="100%"
          alignItems={navSize == 'small' ? 'center' : 'flex-start'}
          as="nav"
        >
          {/* <IconButton
            background="none"
            mt={5}
            _hover={{ background: 'none' }}
            icon={<FiMenu />}
            onClick={() => {
              if (navSize == 'small') changeNavSize('large');
              else changeNavSize('small');
            }}
          /> */}
          {/* <NavItem
            navSize={navSize}
            icon={FiHome}
            title="Главная"
            active
            to="/"
          /> */}
          {projects.map((project, index) => (
            <NavItem
              navSize={navSize}
              icon={FiBox}
              title={project.name}
              to={`/${project.path}`}
              key={index}
            />
          ))}
        </Flex>
        <Stack direction="row">
          <Avatar name="Test" src="https://bit.ly/broken-link" />
          {navSize === 'large' && (
            <Stack spacing={0.5} justifyContent="center">
              <Text fontWeight={600}>Test user</Text>
              <Button as={Link} to="/logout" variant="link" colorScheme="teal">
                {/* Выход */}
              </Button>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Flex>
  );
}

export default Sidebar;
