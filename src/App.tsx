import React from 'react';
import logo from './logo.svg';
import './App.css';
import Images from './Images';
import {QueryClient, QueryClientProvider} from 'react-query';

const  App:React.FC = () => {
  const queryClient = new QueryClient();
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
      <Images/>
      </QueryClientProvider>
    </div>
  );
}

export default App;
