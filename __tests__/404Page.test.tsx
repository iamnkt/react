import 'whatwg-fetch';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import Custom404 from '@/pages/404';

describe('Error page', () => {
  it('renders correctly', async () => {
    render(<Custom404 />);
    await waitFor(() => {
      expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
    });
  });
});
