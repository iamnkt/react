import 'whatwg-fetch';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Search from '../components/search/search';
import React from 'react';
import { renderWithProviders } from '../utils/test-utils';

describe('Search component', () => {
  it('renders correctly', () => {
    renderWithProviders(<Search />);
    const searchButton = screen.getByTestId('search-button');
    const searchInput = screen.getByTestId('search-input');
    expect(searchButton).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
  });
});
