import 'whatwg-fetch';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Cards from '../components/cards/cards';
import { CardsDataMock, CardsEmptyDataMock } from './__mocks__/Mocks';
import { renderWithProviders } from '../utils/test-utils';
import { setupStore } from '../store/store';
import { setIsLoading } from '../store/reducers/cardsFlagValueSlice';

const store = setupStore();

describe('Cards component', () => {
  it('renders correctly and should display the specified number of cards', () => {
    renderWithProviders(<Cards cards={CardsDataMock} />, { store });
    expect(screen.queryAllByTestId('card')).toHaveLength(2);
  });

  it('should be displayed component, when there are no cards', () => {
    renderWithProviders(<Cards cards={CardsEmptyDataMock} />, { store });
    expect(screen.queryByText(/No cards were found/i)).toBeInTheDocument();
  });

  it('should be displayed loader while loading the cards', () => {
    store.dispatch(setIsLoading(true));
    renderWithProviders(<Cards cards={CardsDataMock} />, { store });
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
