import React, { Component } from 'react';
import Item from './components/items/items';
import Search from './components/search/search';
import './App.css';

class App extends Component {
  // const [count, setCount] = useState(0);

  public render(): JSX.Element {
    return (
      <div className="App">
        <Search />
        <Item />
      </div>
    );
  }
}

export default App;
