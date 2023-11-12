import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '../components/card/card';
import { DataProvider } from '../App';
import { CardDetail } from '../types/types';
import { CharizardCardMock } from './__mocks__/cardMock';
import {
  cardsPerPage,
  isDetailsLoading,
  isLoading,
  page,
  query,
  totalCount,
} from './__mocks__/contextDataMock';
import React from 'react';
import { getCardById } from '../api/getDetailedCard';
import { CharizardMock, CharmanderMock } from './__mocks__/cardsMock';

const cards = [CharizardMock, CharmanderMock];
const details: CardDetail = CharizardCardMock;
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(details),
  })
) as jest.Mock;

jest.mock('../api/getDetailedCard');

const localStorageMock = () => {
  const setItemMock = jest.fn();

  beforeEach(() => {
    Storage.prototype.setItem = setItemMock;
  });

  afterEach(() => {
    setItemMock.mockRestore();
  });

  return { setItemMock };
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

describe('Card component', () => {
  it('renders the relevant card data', () => {
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
          <Card
            id={CharizardMock.id}
            name={CharizardMock.name}
            image={CharizardMock.image}
          />
        </DataProvider>
      </BrowserRouter>
    );
    expect(screen.queryByText(CharizardMock.name)).toBeInTheDocument();
  });

  it('opens a detailed card component', () => {
    async () => {
      (getCardById as jest.Mock).mockResolvedValue(details);
      render(
        <BrowserRouter>
          <DataProvider
            value={{
              query,
              cards,
              details,
              isDetailsLoading,
              totalCount,
              page,
              cardsPerPage,
              isLoading,
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
            <Card
              id={CharizardMock.id}
              name={CharizardMock.name}
              image={CharizardMock.image}
            />
          </DataProvider>
        </BrowserRouter>
      );
      const card = screen.getByTestId('card');
      const detailedCard = screen.getByTestId('card-details');
      await fireEvent.click(card);
      expect(await detailedCard).toBeInTheDocument();
    };
  });

  it('triggers on clicking an additional API call to fetch detailed information', () => {
    async () => {
      (getCardById as jest.Mock).mockResolvedValue(details);
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
            <Card
              id={CharizardMock.id}
              name={CharizardMock.name}
              image={CharizardMock.image}
            />
          </DataProvider>
        </BrowserRouter>
      );
      const card = screen.getByTestId('card');
      await fireEvent.click(card);
      expect(getCardById).toHaveBeenCalled();
    };
  });

  it('sets card details to local storage', () => {
    async () => {
      (getCardById as jest.Mock).mockResolvedValue(details);

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
            <Card
              id={CharizardMock.id}
              name={CharizardMock.name}
              image={CharizardMock.image}
            />
          </DataProvider>
        </BrowserRouter>
      );
      const card = screen.getByTestId('card');
      await fireEvent.click(card);
      expect(setItemMock).toHaveBeenCalledWith('details', details);
    };
  });
});
