import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
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
import { CharizardMock, CharmanderMock } from './__mocks__/cardsMock';
import Details from '../components/details/details';
import Card from '../components/card/card';

const details: CardDetail = CharizardCardMock;
const cards: Data[] = [CharmanderMock, CharizardMock];
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useOutletContext: () => ({
    details: details,
    setDetails: jest.fn(),
  }),
}));

describe('Details component', () => {
  it('displays loading indicator while fetching data', () => {
    const isDetailsLoading = true;
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
            isDetailsLoading,
          }}
        >
          <Details />
        </DataProvider>
      </BrowserRouter>
    );
    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });

  it('correctly displays the detailed card data', () => {
    const isDetailsLoading = false;
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
            isDetailsLoading,
          }}
        >
          <Details />
        </DataProvider>
      </BrowserRouter>
    );
    expect(screen.queryByText(/Charizard/i)).toBeInTheDocument();
    expect(screen.queryByText(/150/i)).toBeInTheDocument();
    expect(screen.queryByText(/12/i)).toBeInTheDocument();
    expect(screen.queryByText(/fire/i)).toBeInTheDocument();
    expect(screen.queryByText(/rare/i)).toBeInTheDocument();
  });

  it('clicking the close button hides the component', async () => {
    const isDetailsLoading = false;
    const setDetails = jest.fn();
    render(
      <BrowserRouter>
        <DataProvider
          value={{
            query,
            cards,
            details,
            setDetails,
            totalCount,
            page,
            cardsPerPage,
            isLoading,
            isDetailsLoading,
          }}
        >
          <Card
            id={CharizardMock.id}
            name={CharizardMock.name}
            image={CharizardMock.image}
          />
          <Details />
        </DataProvider>
      </BrowserRouter>
    );
    const closeButton = screen.getByTestId('button');
    const detailedCard = screen.queryByTestId('card-details');
    expect(detailedCard).toBeInTheDocument();
    fireEvent.click(closeButton);
    await waitFor(() => {
      expect(detailedCard).not.toBeNull();
    });
  });
});
