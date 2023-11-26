import 'whatwg-fetch';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Search from '@/components/search/search';
import React from 'react';
import mockRouter from 'next-router-mock';
import userEvent from '@testing-library/user-event';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

describe('Search component', () => {
  it('renders correctly', () => {
    render(
      <RouterContext.Provider value={mockRouter}>
        <Search />
      </RouterContext.Provider>
    );
    const searchButton = screen.getByTestId('search-button');
    const searchInput = screen.getByTestId('search-input');
    const errorButton = screen.getByTestId('error-button');
    expect(searchButton).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(errorButton).toBeInTheDocument();
  });

  it('update query when clicking search button', async () => {
    render(
      <RouterContext.Provider value={mockRouter}>
        <Search />
      </RouterContext.Provider>
    );
    const searchInput = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('search-button');
    await userEvent.type(searchInput, 'gengar');
    await userEvent.click(searchButton);
    await waitFor(() => {
      expect(mockRouter.query).toEqual({
        name: 'gengar',
        page: 1,
        limit: 8,
      });
    });
  });
});
