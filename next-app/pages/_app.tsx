import '@/styles/globals.css';
import '@/styles/app.css';
import '../components/search/search.css';
import '../components/cards/cards.css';
import '../components/pages/pages.css';
import '../components/details/details.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { wrapper } from '@/store/store';

export function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <title>Pokemon-app</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(App);
