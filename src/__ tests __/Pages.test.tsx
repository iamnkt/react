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
import Pages from '../components/pages/pages';
import { useState } from 'react';
import { CharizardMock, CharmanderMock } from './__mocks__/cardsMock';

const cards: Data[] = [CharmanderMock, CharizardMock];
const details: CardDetail = CharizardCardMock;

let mockSearchParam = '';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: () => {
    const [params, setParams] = useState(new URLSearchParams(mockSearchParam));
    return [
      params,
      (newParams: string) => {
        mockSearchParam = newParams;
        setParams(new URLSearchParams(newParams));
      },
    ];
  },
}));

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

const { setItemMock } = localStorageMock();

const setQuery = jest.fn();
const setCards = jest.fn();
const setDetails = jest.fn();
const setPage = jest.fn();
const setTotalCount = jest.fn();
const setIsDetailsLoading = jest.fn();
const setCardsPerPage = jest.fn();
const setIsLoading = jest.fn();

describe('Pages component', () => {
  it('updates URL query parameter when page changes and sets page number value to local storage', () => {
    render(
      <BrowserRouter>
        <DataProvider
          value={{
            query,
            cards,
            details,
            totalCount,
            page,
            cardsPerPage,
            isLoading,
            isDetailsLoading,
            setQuery,
            setCards,
            setDetails,
            setPage,
            setTotalCount,
            setIsDetailsLoading,
            setCardsPerPage,
            setIsLoading,
          }}
        >
          <Pages />
        </DataProvider>
      </BrowserRouter>
    );
    const nextPageButton = screen.getByTestId('nextpage-button');
    fireEvent.click(nextPageButton);
    const queryString = new URLSearchParams(mockSearchParam).toString();
    expect(queryString).toContain('page=3');
    expect(setItemMock).toHaveBeenCalledWith('pageNumber', '3');
    const prevPageButton = screen.getByTestId('prevpage-button');
    fireEvent.click(prevPageButton);
    const queryString2 = new URLSearchParams(mockSearchParam).toString();
    expect(queryString2).toContain('page=1');
    expect(setItemMock).toHaveBeenCalledWith('pageNumber', '1');
    const firstPageButton = screen.getByTestId('prevpage-button');
    fireEvent.click(firstPageButton);
    const queryString3 = new URLSearchParams(mockSearchParam).toString();
    expect(queryString3).toContain('page=1');
    expect(setItemMock).toHaveBeenCalledWith('pageNumber', '1');
    const lastPageButton = screen.getByTestId('lastpage-button');
    fireEvent.click(lastPageButton);
    const queryString4 = new URLSearchParams(mockSearchParam).toString();
    expect(queryString4).toContain('page=9');
    expect(setItemMock).toHaveBeenCalledWith('pageNumber', '9');
  });
});
