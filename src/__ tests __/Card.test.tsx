import { BrowserRouter } from 'react-router-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Card from '../components/card/card';
import { DataProvider } from '../App';
import { CharizardMock, CharmanderMock } from '../test/__mocks__/cardsMock';
import { CardDetail } from '../types/types';
import { CharizardCardMock } from '../test/__mocks__/cardMock';
import {
  cardsPerPage,
  isLoading,
  page,
  query,
  totalCount,
} from '../test/__mocks__/contextDataMock';
import React from 'react';

const cards = [CharizardMock, CharmanderMock];
const details: CardDetail = CharizardCardMock;
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Card component', () => {
  it('renders the relevant card data', () => {
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
          <Card
            id={CharizardMock.id}
            name={CharizardMock.name}
            image={CharizardMock.image}
          />
        </DataProvider>
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });

  it('opens a detailed card component', () => {
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
          }}
        >
          <Card
            id={CharizardMock.id}
            name={CharizardMock.name}
            image={CharizardMock.image}
          />
        </DataProvider>
      </BrowserRouter>
    );
    const card = screen.getByTestId('card');
    act(() => fireEvent.click(card));
    expect(document.getElementById('card-details')).toBeInTheDocument();
  });

  // it('should be displayed component, when there are no cards', () => {
  //   const cards: Data[] = [];
  //   render(
  //     <BrowserRouter>
  //       <DataProvider
  //         value={{
  //           query,
  //           cards,
  //           details,
  //           totalCount,
  //           page,
  //           cardsPerPage,
  //           isLoading,
  //         }}
  //       >
  //         <Card />
  //       </DataProvider>
  //     </BrowserRouter>
  //   );
  //   const result = screen.queryByText(/No cards were found/i);
  //   expect(result).toBeInTheDocument();
  // });
});
