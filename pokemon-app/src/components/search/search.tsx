import React, { Component } from 'react';

class Search extends Component {
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
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error(error));
  }

  public render(): JSX.Element {
    return (
      <div className="search">
        <input className="input" type={'text'}></input>
        <button
          className="button"
          onClick={(e) => {
            e.preventDefault();
            this.searchCards(document.querySelector('input')!.value);
          }}
        >
          Search
        </button>
      </div>
    );
  }
}

export default Search;
