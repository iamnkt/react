import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import ErrorPage from '../components/error-page/errorPage';

describe('404 page component', () => {
  it('is displayed when navigating to an invalid route', () => {
    const route = '/test';

    render(
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });
});
