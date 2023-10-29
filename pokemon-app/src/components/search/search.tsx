import React, { Component } from 'react';
import { Card, Data, SearchProps } from '../../types/types';

class Search extends Component<SearchProps> {
  constructor(props: SearchProps) {
    super(props);
  }

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
        <input className="input" type={'text'}></input>
        <button
          className="button"
          onClick={() =>
            this.searchCards(document.querySelector('input')!.value)
          }
        >
          Search
        </button>
      </div>
    );
  }
}

export default Search;
