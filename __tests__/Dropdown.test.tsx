import 'whatwg-fetch';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import mockRouter from 'next-router-mock';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import Dropdown from '@/components/dropdown/dropdown';

describe('Dropdown component', () => {
  it('updates URL query parameter when user change cards per page value', async () => {
    render(
      <RouterContext.Provider value={mockRouter}>
        <Dropdown options={[8, 12]} />
      </RouterContext.Provider>
    );
    const select = screen.getByRole('select');
    fireEvent.change(select, { target: { value: '12' } });
    await waitFor(() => {
      expect(mockRouter.query).toEqual({
        page: 1,
        limit: 12,
      });
    });
  });
});
