import 'whatwg-fetch';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '../components/card/card';
import Details from '../components/details/details';
import { setupStore } from '../store/store';
import { renderWithProviders } from '../utils/test-utils';
import { CharizardMockCard } from './__mocks__/Mocks';

const { id, name } = CharizardMockCard;
const image = CharizardMockCard.images.large;

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
    renderWithProviders(
      <>
        <Card id={id} name={name} image={image} />,
        <Details />
      </>,
      { store }
    );
    const card = screen.getByTestId('card');
    await fireEvent.click(card);
    await waitFor(() => {
      expect(screen.getByText(/charizard/i)).toBeInTheDocument();
    });
  });

  it('clicking the close button hides the component', async () => {
    renderWithProviders(
      <>
        <Card id={id} name={name} image={image} />,
        <Details />
      </>,
      { store }
    );
    const card = screen.getByTestId('card');
    await fireEvent.click(card);
    await waitFor(() => {
      expect(screen.getByTestId('detailed-card')).toBeInTheDocument();
    });
    const closebtn = screen.getByTestId('close-button');
    await fireEvent.click(closebtn);
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
