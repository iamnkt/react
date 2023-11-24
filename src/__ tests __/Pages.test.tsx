import 'whatwg-fetch';
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pages from '../components/pages/pages';
import { useState } from 'react';
import { setupStore } from '../store/store';
import { CardsDataMock } from './__mocks__/Mocks';
import { renderWithProviders } from '../utils/test-utils';
import { setIsLoading } from '../store/reducers/cardsFlagValueSlice';
import { MemoryRouter } from 'react-router-dom';
const store = setupStore();

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
  it('updates URL query parameter when page changes', async () => {
    renderWithProviders(
      <MemoryRouter>
        <Pages cards={CardsDataMock} />
      </MemoryRouter>,
      { store }
    );
    const nextPageButton = screen.getByTestId('nextpage-button');
    fireEvent.click(nextPageButton);
    const queryString = new URLSearchParams(mockSearchParam).toString();
    expect(queryString).toContain('page=2');
  });

  it('should not be showed buttons while loading cards', () => {
    store.dispatch(setIsLoading(true));
    renderWithProviders(
      <MemoryRouter>
        <Pages cards={CardsDataMock} />
      </MemoryRouter>,
      { store }
    );
    expect(screen.queryByTestId('page-buttons')).not.toBeInTheDocument();
  });
});
