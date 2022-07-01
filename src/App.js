import Search from "./pages/Search";
import Sidebar from "./components/Sidebar";
import { Box, Flex } from "@chakra-ui/react";
import { Routes, Route, } from "react-router-dom";
import Home from './pages/Home';
import Transaction from "./pages/Transaction";
import Carbon from "./pages/Carbon";

function App() {
  return (
    <Flex bg='gray.100'>
      <Sidebar />
      <Box w='100vw' h='100vh' overflow='hidden'>
        <Box p={8} overflow='scroll' h='100vh'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/transactions/:transaction" element={<Transaction />} />
              <Route path="/carbon" element={<Carbon />} />
            </Routes>
          </Box>
      </Box>
    </Flex>
  );
}

export default App;
