import React, { Component } from 'react';
import { Card, Data, SearchProps } from '../../types/types';
import ErrorButton from '../error-button/errorButton';
import './search.css';

class Search extends Component<SearchProps> {
  constructor(props: SearchProps) {
    super(props);
  }

  public state: { loading: boolean; data: string } = {
    loading: true,
    data: '',
  };

  private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ data: e.target.value });
  };

  private searchCards(name: string): Promise<void> {
    this.props.loading(true);

    const params = new URLSearchParams({
      page: '1',
      pageSize: '8',
    });

    return fetch(
      `https://api.pokemontcg.io/v2/cards/?q=name:${name}*&${params}`,
      {
        method: 'GET',
      }
    )
      .then((response) => response.json())
      .then((json) => {
        const pokemons: Data[] = json.data.map((item: Card) => {
          return {
            id: item.id,
            name: item.name,
            image: item.images.large,
          };
        });
        this.setState({
          loading: false,
        });
        this.props.loading(false);
        this.props.setItems(pokemons);
      })
      .catch((error) => console.error(error));
  }

  public componentDidMount = () => {
    const request = localStorage.getItem('request');
    this.setState({ data: request || '' });
    this.searchCards(request?.trim() || '');
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
              this.searchCards(request);
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
