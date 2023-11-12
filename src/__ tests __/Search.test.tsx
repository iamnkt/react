import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { DataProvider } from '../App';
import { CharizardMock, CharmanderMock } from '../test/__mocks__/cardsMock';
import { CardDetail, Data } from '../types/types';
import { CharizardCardMock } from '../test/__mocks__/cardMock';
import {
  cardsPerPage,
  isLoading,
  page,
  query,
  totalCount,
} from '../test/__mocks__/contextDataMock';
import Search from '../components/search/search';
import React from 'react';

const cards: Data[] = [CharmanderMock, CharizardMock];
const details: CardDetail = CharizardCardMock;

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  removeItem: jest.fn(),
  key: jest.fn(),
  length: 1,
};
global.localStorage = localStorageMock;

describe('In search component', () => {
  const setQuery = jest.fn();
  it('clicking the Search button saves the entered value to the local storage', () => {
    render(
      <BrowserRouter>
        <DataProvider
          value={{
            query,
            setQuery,
            cards,
            details,
            totalCount,
            page,
            cardsPerPage,
            isLoading,
          }}
        >
          <Search />
        </DataProvider>
      </BrowserRouter>
    );
    const button = screen.getByTestId('search-button');
    fireEvent.click(button);
    expect(localStorage.getItem('query')).toEqual('char');
  });

  it('retrieves the value from the local storage upon mounting', () => {
    render(
      <BrowserRouter>
        <DataProvider
          value={{
            query,
            setQuery,
            cards,
            details,
            totalCount,
            page,
            cardsPerPage,
            isLoading,
          }}
        >
          <Search />
        </DataProvider>
      </BrowserRouter>
    );
    const input: HTMLInputElement = screen.getByTestId('search-input');
    expect(input.value).toEqual(localStorage.getItem('query'));
  });
});
