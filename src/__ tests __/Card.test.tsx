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
    const setDetails = jest.fn();
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
              setDetails,
              totalCount,
              page,
              cardsPerPage,
              isLoading,
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
    const setDetails = jest.fn();
    async () => {
      (getCardById as jest.Mock).mockResolvedValue(details);

      render(
        <BrowserRouter>
          <DataProvider
            value={{
              query,
              cards,
              details,
              setDetails,
              totalCount,
              page,
              cardsPerPage,
              isLoading,
              isDetailsLoading,
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
});
