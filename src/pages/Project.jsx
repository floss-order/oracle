import React, { useState, useEffect } from 'react';
import { Editor, Frame, Element, useNode, useEditor } from "@craftjs/core";
import { Box, Button, Flex, Heading, IconButton, Stack } from "@chakra-ui/react";
import LoadCircle from "../components/LoadCircle";
import InfoCard from "../components/InfoCard";
import Toolbox from "../components/Toolbox";
import SearchBox from '../components/SearchBox';
import ULoadCircle from '../components/user/ULoadCircle';
import UInfoCard from '../components/user/UInfoCard';
import UChart from '../components/user/UChart';


function EditorToggle() {
  const { actions, enabled } = useEditor(
    (state, query) => ({
      enabled: state.options.enabled
    })
  );

  function onToggle() {
    actions.setOptions((options) => (options.enabled = !enabled))
  };

  return (
    <Button
      pos="relative"
      onClick={onToggle}
      top={-2}
      zIndex={1}
      variant="link">
      Изменить
    </Button>
  )
};

function Project({ name, components }) {
  return (
    <>
      <Editor enabled={false} resolver={{ Stack, Heading, Button, SearchBox, LoadCircle, InfoCard, ULoadCircle, Toolbox, Flex, UInfoCard, UChart, EditorToggle }}>
        <Frame>
          <Element is={Stack} direction="row" overflow="hidden">
            <Element is={Flex} flex={2} direction="column">
              <Element is={Stack} direction="row">
                <Heading>{name}</Heading>
                <EditorToggle />
              </Element>
              <Element is={Stack}>
                <SearchBox />
                <Element is="div" style={{ width: "100%", minHeight: "100px", display: "flex", gap: "8px", flexWrap: "wrap" }} canvas>
                </Element>
              </Element>
            </Element>
            <Element is={Stack} flex={1}>
              <Stack pos="fixed">
                <Toolbox />
              </Stack>
            </Element>
          </Element>
        </Frame>
        {/* <Flex direction="row" gap={4} mt={4}>
          <Box flex="2">
            <SearchBox />
            <Box mt={8} display="flex">
              <LoadCircle title="баланс региона" load={40} />
              <InfoCard title="выбросы парниковых газов (ppm)" value="4000" />
            </Box>
          </Box>
          {
              showEditor && (
                <Box flex={1}>
                  <Box pos="fixed">
                    <Toolbox />
                  </Box>
                </Box>
              )
            }
        </Flex> */}
      </Editor>
    </>
  );
}


export default Project


{/* <Editor resolver={{ Component, Button, Toolbox }}>
        <Frame>
          <Element is="div" canvas id="1">
            <h1>Hello CodeSandbox</h1>
            <Component />
            <Toolbox />
          </Element>
        </Frame>
      </Editor> */}