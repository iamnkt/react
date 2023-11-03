import React, { useState } from 'react';
import Search from './components/search/search';
import View from './components/view/view';
import { Data } from './types/types';
import './App.css';

export const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [cards, setCards] = useState<Data[]>([]);

  const updateCards = (data: Data[]) => {
    setCards(data);
  };

  const updateLoading = (state: boolean) => {
    setLoading(state);
  };

  return (
    <div className="App">
      <Search updateLoading={updateLoading} updateCards={updateCards}></Search>
      <View loading={loading} data={cards}></View>
    </div>
  );
};

export default App;
