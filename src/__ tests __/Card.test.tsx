import 'whatwg-fetch';
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '../components/card/card';
import React from 'react';
import { setupStore } from '../store/store';
import { Charmander1MockCard } from './__mocks__/Mocks';
import { renderWithProviders } from '../utils/test-utils';
import { MemoryRouter } from 'react-router-dom';

const store = setupStore();

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

const { id, name } = Charmander1MockCard;
const image = Charmander1MockCard.images.large;

describe('Card component', () => {
  it('renders the relevant card data', () => {
    renderWithProviders(
      <MemoryRouter>
        <Card id={id} name={name} image={image} />
      </MemoryRouter>,
      { store }
    );
    expect(screen.queryByText(Charmander1MockCard.name)).toBeInTheDocument();
  });

  it('opens a detailed card component', () => {
    async () => {
      renderWithProviders(
        <MemoryRouter>
          <Card id={id} name={name} image={image} />
        </MemoryRouter>,
        { store }
      );
      const card = screen.getByTestId('card');
      await fireEvent.click(card);
      const detailedCard = screen.getByTestId('detailed-card');
      expect(await detailedCard).toBeInTheDocument();
    };
  });
});
