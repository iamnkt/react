import 'whatwg-fetch';
import { rest } from 'msw';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Details from '../components/details/details';
import { setupStore } from '../store/store';
import { renderWithProviders } from '../utils/test-utils';
import { server } from './__mocks__/api/server';

const apiData = {
  data: {
    name: 'Charizard',
    hp: '150',
    level: '12',
    types: ['fire'],
    rarity: 'rare',
  },
};

const store = setupStore();

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useOutletContext: () => ({
    id: 'bw15-12',
  }),
}));

describe('Details component', () => {
  it('correctly displays the detailed card data', async () => {
    server.use(
      rest.get(
        `https://api.pokemontcg.io/v2/cards/bw15-12`,
        (req, res, ctx) => {
          return res(ctx.json(apiData));
        }
      )
    );
    renderWithProviders(<Details />, { store });
    await waitFor(() => {
      expect(screen.getByText(/name/i)).toBeInTheDocument();
      expect(screen.queryByText(/level/i)).toBeInTheDocument();
      expect(screen.queryByText(/hp/i)).toBeInTheDocument();
      expect(screen.queryByText(/type/i)).toBeInTheDocument();
      expect(screen.queryByText(/rarity/i)).toBeInTheDocument();
    });
  });

  it('clicking the close button hides the component', async () => {
    server.use(
      rest.get(
        `https://api.pokemontcg.io/v2/cards/bw15-12`,
        (req, res, ctx) => {
          return res(ctx.json(apiData));
        }
      )
    );

    renderWithProviders(<Details />, { store });
    await waitFor(() => {
      expect(screen.getByTestId('detailed-card')).toBeInTheDocument();
    });
    await waitFor(() => {
      fireEvent.click(screen.getByTestId('button'));
    });
    await waitFor(() => {
      expect(screen.queryByTestId('detailed-card')).not.toBeNull();
    });
  });

  it('displays loading indicator while fetching data', () => {
    renderWithProviders(<Details />, { store });
    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });
});
