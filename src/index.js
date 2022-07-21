import React from 'react';
// import ReactDOM from 'react-dom/client';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// const queryClient = new QueryClient();

// root.render(
//   <React.StrictMode>
//     <Router>
//       <QueryClientProvider client={queryClient}>
//         <ChakraProvider>
//           <App />
//         </ChakraProvider>
//       </QueryClientProvider>
//     </Router>
//   </React.StrictMode>
// );

const queryClient = new QueryClient();

ReactDOM.render(
  // <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </QueryClientProvider>
    </Router>,
  // </React.StrictMode>,
  document.getElementById('root')
);
