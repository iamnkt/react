import 'whatwg-fetch';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Cards from '@/components/cards/cards';
import React from 'react';
import mockRouter from 'next-router-mock';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { CardsDataMock, CardsEmptyDataMock } from './__mocks__/Mocks';

describe('Cards component', () => {
  it('renders correctly and should display the specified number of cards', () => {
    render(
      <RouterContext.Provider value={mockRouter}>
        <Cards data={CardsDataMock} />
      </RouterContext.Provider>
    );
    expect(screen.queryAllByTestId('card')).toHaveLength(10);
  });

  it('should be displayed component, when there are no cards', () => {
    render(
      <RouterContext.Provider value={mockRouter}>
        <Cards data={CardsEmptyDataMock} />
      </RouterContext.Provider>
    );
    expect(screen.queryByText(/No cards were found/i)).toBeInTheDocument();
  });
});
