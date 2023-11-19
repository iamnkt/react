import 'whatwg-fetch';
import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pages from '../components/pages/pages';
import { useState } from 'react';
import { setupStore } from '../store/store';
import { Provider } from 'react-redux';
import { CardsDataMock } from './__mocks__/Mocks';

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
  it('updates URL query parameter when page changes', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Pages cards={CardsDataMock} />
        </BrowserRouter>
      </Provider>
    );
    const nextPageButton = screen.getByTestId('nextpage-button');
    fireEvent.click(nextPageButton);
    console.log(URLSearchParams.length);
    const queryString = new URLSearchParams(mockSearchParam).toString();
    expect(queryString).toContain('page=4');
    const prevPageButton = screen.getByTestId('prevpage-button');
    fireEvent.click(prevPageButton);
    const queryString2 = new URLSearchParams(mockSearchParam).toString();
    expect(queryString2).toContain('page=3');
    const firstPageButton = screen.getByTestId('prevpage-button');
    fireEvent.click(firstPageButton);
    const queryString3 = new URLSearchParams(mockSearchParam).toString();
    expect(queryString3).toContain('page=1');
    const lastPageButton = screen.getByTestId('lastpage-button');
    fireEvent.click(lastPageButton);
    const queryString4 = new URLSearchParams(mockSearchParam).toString();
    expect(queryString4).toContain('page=9');
  });
});
