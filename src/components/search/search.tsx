import React, { Component } from 'react';
import searchCards from '../../api/api';
import { SearchProps } from '../../types/types';
import ErrorButton from '../error-button/errorButton';
import './search.css';

class Search extends Component<SearchProps> {
  constructor(props: SearchProps) {
    super(props);
  }

  public state: { data: string } = {
    data: '',
  };

  private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ data: e.target.value });
  };

  private async search(name: string): Promise<void> {
    this.props.loading(true);

    const cards = await searchCards(name);

    this.props.loading(false);
    this.props.setItems(cards);
  }

  public componentDidMount = () => {
    const request = localStorage.getItem('request');
    this.setState({ data: request || '' });
    this.search(request?.trim() || '');
  };

  public render(): JSX.Element {
    return (
      <div className="search">
        <h2 className="caption">Pokemon cards</h2>
        <div className="search-form">
          <input
            type="text"
            className="input"
            placeholder="Pokemon name"
            value={this.state.data}
            onChange={this.handleChange}
          ></input>
          <button
            className="button button__search"
            onClick={() => {
              const request = this.state.data.trim();
              this.search(request);
              if (localStorage.getItem('request'))
                localStorage.removeItem('request');
              localStorage.setItem('request', this.state.data);
            }}
          >
            Search
          </button>
          <ErrorButton />
        </div>
      </div>
    );
  }
}

export default Search;
