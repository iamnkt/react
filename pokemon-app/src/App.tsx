import { Component } from 'react';
import Search from './components/search/search';
import View from './components/view/view';
import './App.css';
import { Data } from './types/types';

class App extends Component {
  public state: { loading: boolean; data: Data[] } = {
    loading: true,
    data: [],
  };

  public updateItems = (items: Data[]) => {
    this.setState({
      data: items,
    });
  };

  public updateLoading = (loading: boolean) => {
    this.setState({
      loading,
    });
  };

  public render(): JSX.Element {
    return (
      <div className="App">
        <Search
          loading={this.updateLoading}
          setItems={this.updateItems}
        ></Search>
        <View loading={this.state.loading} data={this.state.data}></View>
      </div>
    );
  }
}

export default App;
