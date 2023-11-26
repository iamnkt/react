import 'whatwg-fetch';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '@/components/card/card';
import React from 'react';
import mockRouter from 'next-router-mock';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { Charmander1MockCard } from './__mocks__/Mocks';
import userEvent from '@testing-library/user-event';

const { id, name } = Charmander1MockCard;
const image = Charmander1MockCard.images.large;

describe('Card component', () => {
  it('renders the relevant card data', () => {
    render(
      <RouterContext.Provider value={mockRouter}>
        <Card id={id} name={name} image={image} />
      </RouterContext.Provider>
    );
    expect(screen.queryByText(Charmander1MockCard.name)).toBeInTheDocument();
  });

  it('update query when clicking on card', async () => {
    render(
      <RouterContext.Provider value={mockRouter}>
        <Card id={id} name={name} image={image} />
      </RouterContext.Provider>
    );
    const card = screen.getByTestId('card');
    await userEvent.click(card);
    await waitFor(() => {
      expect(mockRouter.query).toEqual({
        details: Charmander1MockCard.id,
      });
    });
  });

  it('opens a detailed card component', () => {
    async () => {
      render(
        <RouterContext.Provider value={mockRouter}>
          <Card id={id} name={name} image={image} />
        </RouterContext.Provider>
      );
      const card = screen.getByTestId('card');
      await userEvent.click(card);
      const detailedCard = screen.getByTestId('detailed-card');
      expect(await detailedCard).toBeInTheDocument();
    };
  });
});
