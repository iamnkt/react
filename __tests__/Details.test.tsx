import 'whatwg-fetch';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Details from '@/components/details/details';
import React from 'react';
import mockRouter from 'next-router-mock';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { Charmander1DetailedMockCard } from './__mocks__/Mocks';
import userEvent from '@testing-library/user-event';
import Card from '@/components/card/card';

describe('Details component', () => {
  it('correctly displays the detailed card data', async () => {
    render(
      <RouterContext.Provider value={mockRouter}>
        <Card
          id={Charmander1DetailedMockCard.id}
          name={Charmander1DetailedMockCard.name}
          image={Charmander1DetailedMockCard.image}
        />
        <Details data={{ data: Charmander1DetailedMockCard }} />
      </RouterContext.Provider>
    );
    const card = screen.getByTestId('card');
    userEvent.click(card);
    await waitFor(() => {
      expect(screen.getByText(/fire/i)).toBeInTheDocument();
      expect(screen.getByText(/rare/i)).toBeInTheDocument();
      expect(screen.getByText(/150/i)).toBeInTheDocument();
    });
  });

  it('clicking the close button hides the component', async () => {
    render(
      <RouterContext.Provider value={mockRouter}>
        <Card
          id={Charmander1DetailedMockCard.id}
          name={Charmander1DetailedMockCard.name}
          image={Charmander1DetailedMockCard.image}
        />
        <Details data={{ data: Charmander1DetailedMockCard }} />
      </RouterContext.Provider>
    );
    await userEvent.click(screen.getByTestId('card'));
    waitFor(() => {
      expect(screen.getByTestId('close-button')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(mockRouter.query).toEqual({
        details: 'bw15-12',
      });
    });
    await userEvent.click(screen.getByTestId('close-button'));
    await waitFor(() => {
      expect(mockRouter.query).not.toEqual({
        details: 'bw15-12',
      });
    });
  });
});
