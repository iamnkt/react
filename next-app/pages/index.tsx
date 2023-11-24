import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types';
import Search from '@/components/search/search';
import { wrapper } from '@/store/store';
import { CardsData } from '@/types/types';
import {
  cardsAPI,
  getCards,
  getRunningQueriesThunk,
  useGetCardsQuery,
} from '@/services/cardsService';
import Cards from '@/components/cards/cards';
import Pages from '@/components/pages/pages';

export const getServerSideProps: GetServerSideProps<{ cardsData: CardsData }> =
  wrapper.getServerSideProps((store) => async (context) => {
    const { name, page, limit } = context.query;

    // if (!page) {
    //   const detailsQueryString = details ? `&details=${details} ` : '';
    //   return {
    //     redirect: {
    //       destination: `/?page=1&searchValue=${searchValue || ''}&limit=${
    //         limit || 1
    //       }${detailsQueryString}`,
    //       permanent: false,
    //     },
    //   };
    // }

    store.dispatch(
      getCards.initiate({
        name: name?.toString() || '',
        limit: Number(limit) || 8,
        page: Number(page) || 1,
      })
    );
    // if (details) {
    //   store.dispatch(getDetails.initiate(details.toString()));
    // }

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {
        cardsData: store.getState().cardsReducer.cardsData,
      },
    };
  });

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  if (!props?.cardsData) {
    return <></>;
  }
  const { cardsData } = props;
  return (
    <>
      <Search />
      <Cards cardsData={cardsData} />
      <Pages cardsData={cardsData} />
    </>
  );
}
