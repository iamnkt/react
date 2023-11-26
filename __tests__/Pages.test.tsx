import 'whatwg-fetch';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import mockRouter from 'next-router-mock';
import { CardsDataMock, CardsDataMock1 } from './__mocks__/Mocks';
import Pages from '@/components/pages/pages';
import { userEvent } from '@testing-library/user-event';

describe('Pages component', () => {
  it('updates URL query parameter when user clicks on next page', async () => {
    render(
      <RouterContext.Provider value={mockRouter}>
        <Pages data={CardsDataMock} />
      </RouterContext.Provider>
    );
    const nextPageButton = screen.getByTestId('nextpage-button');
    await userEvent.click(nextPageButton);
    await waitFor(() => {
      expect(mockRouter.query).toEqual({
        name: '',
        page: 2,
        limit: 8,
      });
    });
  });

  it('updates URL query parameter when user clicks on previous page', async () => {
    render(
      <RouterContext.Provider value={mockRouter}>
        <Pages data={CardsDataMock1} />
      </RouterContext.Provider>
    );
    const prevPageButton = screen.getByTestId('prevpage-button');
    await userEvent.click(prevPageButton);
    await waitFor(() => {
      expect(mockRouter.query).toEqual({
        name: '',
        page: 1,
        limit: 8,
      });
    });
  });

  it('updates URL query parameter when user clicks on last page', async () => {
    render(
      <RouterContext.Provider value={mockRouter}>
        <Pages data={CardsDataMock} />
      </RouterContext.Provider>
    );
    const lastPageButton = screen.getByTestId('lastpage-button');
    await userEvent.click(lastPageButton);
    await waitFor(() => {
      expect(mockRouter.query).toEqual({
        name: '',
        page: 2,
        limit: 8,
      });
    });
  });

  it('updates URL query parameter when user clicks on first page', async () => {
    render(
      <RouterContext.Provider value={mockRouter}>
        <Pages data={CardsDataMock1} />
      </RouterContext.Provider>
    );
    const firstPageButton = screen.getByTestId('firstpage-button');
    await userEvent.click(firstPageButton);
    await waitFor(() => {
      expect(mockRouter.query).toEqual({
        name: '',
        page: 1,
        limit: 8,
      });
    });
  });
});
