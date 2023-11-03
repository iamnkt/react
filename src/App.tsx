import React, { useState } from 'react';
import Search from './components/search/search';
import View from './components/view/view';
import { Data } from './types/types';
import './App.css';

export const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Data[]>([]);

  const updateCards = (items: Data[]) => {
    setData(items);
  };

  const updateLoading = (state: boolean) => {
    setLoading(state);
  };

  return (
    <div className="App">
      <Search loading={updateLoading} setItems={updateCards}></Search>
      <View loading={loading} data={data}></View>
    </div>
  );
};

export default App;
