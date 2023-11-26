import 'whatwg-fetch';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import Home, { getServerSideProps, HomePageProps } from '@/pages';
import mockRouter from 'next-router-mock';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { ParsedUrlQuery } from 'querystring';
import { GetServerSidePropsContext } from 'next';

describe('Home page', () => {
  it('matches DOM Snapshot', async () => {
    const context = {
      query: { name: 'Charmander', page: '1', limit: '8' } as ParsedUrlQuery,
    };

    const { props } = (await getServerSideProps(
      context as GetServerSidePropsContext
    )) as { props: HomePageProps };
    const { container } = render(
      <RouterContext.Provider value={mockRouter}>
        {Home(props)}
      </RouterContext.Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
