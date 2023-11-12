import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Cards from '../components/cards/cards';
import { DataProvider } from '../App';
import { CardDetail, Data } from '../types/types';
import { CharizardCardMock } from './__mocks__/cardMock';
import {
  cardsPerPage,
  isLoading,
  page,
  query,
  totalCount,
} from './__mocks__/contextDataMock';
import { CharmanderMock, CharizardMock } from './__mocks__/cardsMock';

const details: CardDetail = CharizardCardMock;

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
          }}
        >
          <Cards />
        </DataProvider>
      </BrowserRouter>
    );
    const result = screen.queryAllByTestId('card');
    expect(result).toHaveLength(2);
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
          }}
        >
          <Cards />
        </DataProvider>
      </BrowserRouter>
    );
    const result = screen.queryByText(/No cards were found/i);
    expect(result).toBeInTheDocument();
  });
});
