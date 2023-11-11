import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Cards from '../components/cards/cards';
import { DataProvider } from '../App';
import { CharizardMock, CharmanderMock } from '../test/__mocks__/cardsMock';
import { CardDetail, Data } from '../types/types';
import { CharizardCardMock } from '../test/__mocks__/cardMock';

const query = 'char';
const details: CardDetail = CharizardCardMock;
const totalCount = 67;
const page = 2;
const cardsPerPage = 8;
const isLoading = false;

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
    const result = screen.queryAllByText(/char/i);
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
