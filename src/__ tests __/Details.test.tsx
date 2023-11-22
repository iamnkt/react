import 'whatwg-fetch';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '../components/card/card';
import Details from '../components/details/details';
import { setupStore } from '../store/store';
import { renderWithProviders } from '../utils/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { Charizard1MockCard } from './__mocks__/Mocks';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

const { id, name } = Charizard1MockCard;
const image = Charizard1MockCard.images.large;

const server = setupServer(
  http.get(`https://api.pokemontcg.io/v2/cards/${id}`, () => {
    return HttpResponse.json({
      data: {
        id: 'bw25-12',
        name: 'Charizard',
        hp: '150',
        level: '12',
        types: ['fire'],
        rarity: 'rare',
      },
    });
  })
);

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'bypass' });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

const store = setupStore();

describe('Details component', () => {
  beforeEach(() => {
    renderWithProviders(
      <MemoryRouter>
        <Card id={id} name={name} image={image} />,
        <Details />
      </MemoryRouter>,
      { store }
    );
  });

  it('displays loading indicator while fetching data', async () => {
    const card = screen.getByTestId('card');
    await fireEvent.click(card);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('correctly displays the detailed card data', async () => {
    const card = screen.getByTestId('card');
    fireEvent.click(card);
    await waitFor(() => {
      expect(screen.getByText(/fire/i)).toBeInTheDocument();
    });
  });

  it('clicking the close button hides the component', async () => {
    await fireEvent.click(screen.getByTestId('card'));
    waitFor(() => {
      expect(screen.getByTestId('close-button')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByTestId('close-button'));
    await waitFor(() => {
      expect(screen.queryByTestId('detailed-card')).toBeInTheDocument();
    });
  });
});
