import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DataProvider } from '../App';
import { CardDetail, Data } from '../types/types';
import { CharizardCardMock } from './__mocks__/cardMock';
import {
  cardsPerPage,
  isDetailsLoading,
  isLoading,
  page,
  query,
  totalCount,
} from './__mocks__/contextDataMock';
import Search from '../components/search/search';
import React from 'react';
import { CharizardMock, CharmanderMock } from './__mocks__/cardsMock';

const cards: Data[] = [CharmanderMock, CharizardMock];
const details: CardDetail = CharizardCardMock;

const localStorageMock = () => {
  const setItemMock = jest.fn();
  const getItemMock = jest.fn();

  beforeEach(() => {
    Storage.prototype.setItem = setItemMock;
    Storage.prototype.getItem = getItemMock;
  });

  afterEach(() => {
    setItemMock.mockRestore();
    getItemMock.mockRestore();
  });

  return { setItemMock, getItemMock };
};

const { getItemMock, setItemMock } = localStorageMock();

describe('In search component', () => {
  const setQuery = jest.fn();
  const setPage = jest.fn();

  it('clicking the Search button saves the entered value to the local storage', () => {
    render(
      <BrowserRouter>
        <DataProvider
          value={{
            query,
            setQuery,
            setPage,
            cards,
            details,
            totalCount,
            page,
            cardsPerPage,
            isLoading,
            isDetailsLoading,
          }}
        >
          <Search />
        </DataProvider>
      </BrowserRouter>
    );
    const button = screen.getByTestId('search-button');
    fireEvent.click(button);
    expect(setItemMock).toHaveBeenCalledWith('query', 'char');
  });

  it('retrieves the value from the local storage upon mounting', () => {
    render(
      <BrowserRouter>
        <DataProvider
          value={{
            query,
            setQuery,
            setPage,
            cards,
            details,
            totalCount,
            page,
            cardsPerPage,
            isLoading,
            isDetailsLoading,
          }}
        >
          <Search />
        </DataProvider>
      </BrowserRouter>
    );
    const input = screen.getByTestId('search-input');
    expect(getItemMock).toHaveBeenCalled();
    expect(input).toHaveValue('char');
  });
});
