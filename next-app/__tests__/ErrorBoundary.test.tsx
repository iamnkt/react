import 'whatwg-fetch';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import Home from '@/pages';
import { CardsDataMock } from './__mocks__/Mocks';

console.log = jest.fn();
console.error = jest.fn();
console.warn = jest.fn();

describe('Error boundary', () => {
  it('renders fallback UI when clicking error button', async () => {
    render(
      <RouterContext.Provider value={mockRouter}>
        <Home cardsData={CardsDataMock} detailedCardData={null} />
      </RouterContext.Provider>
    );
    const errorButton = screen.getByTestId('error-button');
    await userEvent.click(errorButton);
    await waitFor(() => {
      expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    });
  });
});
