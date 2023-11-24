import '@/styles/globals.css';
import '../components/search/search.css';
import '../components/cards/cards.css';
import '../components/pages/pages.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
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
