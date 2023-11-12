import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Cards from '../components/cards/cards';
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
import { CharmanderMock, CharizardMock } from './__mocks__/cardsMock';

const details: CardDetail = CharizardCardMock;

const setQuery = jest.fn();
const setCards = jest.fn();
const setDetails = jest.fn();
const setPage = jest.fn();
const setTotalCount = jest.fn();
const setIsDetailsLoading = jest.fn();
const setCardsPerPage = jest.fn();
const setIsLoading = jest.fn();

describe('Cards component', () => {
  it('renders correctly', () => {
    const cards: Data[] = [CharmanderMock, CharizardMock];
    const container = render(
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
          <Cards />
        </DataProvider>
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });

  it('should display the specified number of cards', () => {
    const cards: Data[] = [CharmanderMock, CharizardMock];
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
          <Cards />
        </DataProvider>
      </BrowserRouter>
    );
    expect(screen.queryAllByTestId('card')).toHaveLength(2);
  });

  it('should be displayed component, when there are no cards', () => {
    const cards: Data[] = [];
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
          <Cards />
        </DataProvider>
      </BrowserRouter>
    );
    expect(screen.queryByText(/No cards were found/i)).toBeInTheDocument();
  });
});
