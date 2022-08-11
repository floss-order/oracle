import React, { useState } from 'react';
import { Flex, IconButton } from '@chakra-ui/react';
import { FiMenu, FiHome, FiMinus, FiBox } from 'react-icons/fi';
import NavItem from './NavItem';

function Sidebar({ projects }) {
  const [navSize, changeNavSize] = useState('small');
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
      <Flex
        p="5%"
        flexDir="column"
        // w="100%"
        alignItems={navSize == 'small' ? 'center' : 'flex-start'}
        as="nav"
      >
        <IconButton
          background="none"
          mt={5}
          _hover={{ background: 'none' }}
          icon={<FiMenu />}
          onClick={() => {
            if (navSize == 'small') changeNavSize('large');
            else changeNavSize('small');
          }}
        />
        <NavItem
          navSize={navSize}
          icon={FiHome}
          title="Главная"
          active
          to="/"
        />
        {projects.map((project, index) => (
          <NavItem
            navSize={navSize}
            icon={FiBox}
            title={project.name}
            to={`/${project.slug}`}
            key={index}
          />
        ))}
      </Flex>
    </Flex>
  );
}

export default Sidebar;
