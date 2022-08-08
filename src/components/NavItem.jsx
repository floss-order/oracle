import React from 'react';
import { Flex, Text, Icon, Link, Menu, MenuButton } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

function NavItem({ icon, title, active, navSize, to }) {
  return (
    <Flex
      mt={25}
      flexDir="column"
      w="100%"
      alignItems={navSize === 'small' ? 'center' : 'flex-start'}
    >
      <Menu placement="right">
        <Link
          backgroundColor={active && '#AEC8CA'}
          p={3}
          borderRadius={8}
          _hover={{ textDecor: 'none', backgroundColor: '#AEC8CA' }}
          w={navSize === 'large' && '100%'}
          as={RouterLink}
          to={to}
        >
          <MenuButton w="100%">
            <Flex>
              <Icon
                as={icon}
                fontSize="xl"
                color={active ? '#82AAAD' : 'gray.500'}
              />
              <Text
                ml={5}
                display={navSize === 'small' ? 'none' : 'flex'}
                style={{ textAlign: 'left' }}
              >
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
}

export default NavItem;
