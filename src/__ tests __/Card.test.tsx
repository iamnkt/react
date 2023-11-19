import 'whatwg-fetch';
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '../components/card/card';
import React from 'react';
import { setupStore } from '../store/store';
import { CharmanderMockCard } from './__mocks__/Mocks';
import { renderWithProviders } from '../utils/test-utils';

const store = setupStore();

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

const { id, name } = CharmanderMockCard;
const image = CharmanderMockCard.images.large;

describe('Card component', () => {
  it('renders the relevant card data', () => {
    renderWithProviders(<Card id={id} name={name} image={image} />, { store });
    expect(screen.queryByText(CharmanderMockCard.name)).toBeInTheDocument();
  });

  it('opens a detailed card component', () => {
    async () => {
      renderWithProviders(<Card id={id} name={name} image={image} />, {
        store,
      });
      const card = screen.getByTestId('card');
      await fireEvent.click(card);
      const detailedCard = screen.getByTestId('detailed-card');
      expect(await detailedCard).toBeInTheDocument();
    };
  });
});
