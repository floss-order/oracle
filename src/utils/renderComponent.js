import React, { createElement } from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';
import InfoCard from '../components/InfoCard';
import LoadCircle from '../components/LoadCircle';
import SearchBox from '../components/SearchBox';
import Toggle from '../components/Toggle';

const keysToComponentMap = {
  Box,
  Flex,
  Fragment: React.Fragment,
  Heading,
  InfoCard,
  LoadCircle,
  SearchBox,
  Toggle,
};

export function renderComponent(config) {
  if (typeof keysToComponentMap[config.type] !== 'undefined') {
    return createElement(
      keysToComponentMap[config.type],
      { ...config.props },
      config.children &&
        (typeof config.children === 'string'
          ? config.children
          : config.children.map(c => renderComponent(c)))
    );
  }
}
