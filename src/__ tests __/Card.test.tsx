import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Card from '../components/card/card';
import { DataProvider } from '../App';
import { CharizardMock, CharmanderMock } from './__mocks__/cardsMock';
import { CardDetail } from '../types/types';
import { CharizardCardMock } from './__mocks__/cardMock';
import {
  cardsPerPage,
  isLoading,
  page,
  query,
  totalCount,
} from './__mocks__/contextDataMock';
import React from 'react';
import { getCardById } from '../api/getDetailedCard';

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
      await fireEvent.click(screen.getByTestId('card'));
      expect(await screen.findByTestId('card-details')).toBeInTheDocument();
    };
  });

  it('triggers on clicking an additional API call to fetch detailed information.', () => {
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
      await fireEvent.click(screen.getByTestId('card'));
      expect(getCardById).toHaveBeenCalled();
    };
  });
});
