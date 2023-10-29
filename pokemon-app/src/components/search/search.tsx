import React, { Component } from 'react';
import { Card, Data, SearchProps } from '../../types/types';

class Search extends Component<SearchProps> {
  constructor(props: SearchProps) {
    super(props);
  }

  state: { data: string } = {
    data: '',
  };

  componentDidMount = () => {
    const request = localStorage.getItem('request');
    document.querySelector('input')!.value = request || '';
    this.setState({ data: request || '' });
    this.searchCards(request || '');
  };

  private searchCards(name: string): Promise<void> {
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
      .then((res) => {
        const pokemons: Data[] = res.data.map((item: Card) => {
          return {
            id: item.id,
            name: item.name,
            description: item.flavorText,
          };
        });
        this.props.setItems(pokemons);
      })
      .catch((error) => console.error(error));
  }

  public render(): JSX.Element {
    return (
      <div className="search">
        <input className="input" type={'search'}></input>
        <button
          className="button"
          onClick={() => {
            const request = document.querySelector('input')!.value.trim();
            this.searchCards(request);
            if (localStorage.getItem('request')) {
              localStorage.removeItem('request');
            }
            localStorage.setItem('request', request);
          }}
        >
          Search
        </button>
      </div>
    );
  }
}

export default Search;
