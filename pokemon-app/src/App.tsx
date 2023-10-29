import React, { Component } from 'react';
import Search from './components/search/search';
import View from './components/view/view';
import './App.css';
import { Data } from './types/types';

class App extends Component {
  state: { data: Data[] } = {
    data: [],
  };

  updateState = (items: Data[]) => {
    this.setState({
      data: items,
    });
  };

  public render(): JSX.Element {
    return (
      <div className="App">
        <Search setItems={this.updateState}></Search>
        <View data={this.state.data}></View>
      </div>
    );
  }
}

export default App;
