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
import Pages from '../components/pages/pages';
import { useState } from 'react';

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

describe('Pages component', () => {
  it('updates URL query parameter when page changes.', () => {
    const setPage = jest.fn();
    render(
      <BrowserRouter>
        <DataProvider
          value={{
            query,
            cards,
            setPage,
            details,
            totalCount,
            page,
            cardsPerPage,
            isLoading,
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
  });
});
