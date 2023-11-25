import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types';
import { wrapper } from '@/store/store';
import {
  getCards,
  getDetailedCard,
  getRunningQueriesThunk,
} from '@/services/cardsService';
import Main from '@/components/main/main';

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const { name, page, limit, details } = context.query;

    if (!name) {
      const detailsQueryString = details ? `&details=${details} ` : '';
      return {
        redirect: {
          destination: `/?name=${name || ''}&page=${page || 1}&limit=${
            limit || 8
          }${detailsQueryString}`,
          permanent: false,
        },
      };
    }

    store.dispatch(
      getCards.initiate({
        name: name?.toString() || '',
        limit: Number(limit) || 8,
        page: Number(page) || 1,
      })
    );

    if (details) {
      store.dispatch(getDetailedCard.initiate({ id: details.toString() }));
    }

    const [cardsData, detailedCardData] = await Promise.all(
      store.dispatch(getRunningQueriesThunk())
    );

    return details
      ? {
          props: {
            cardsData: cardsData.data,
            detailedCardData: detailedCardData.data,
          },
        }
      : {
          props: {
            cardsData: cardsData.data,
          },
        };
  });

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return (
    <div className="app">
      <Main
        cardsData={props.cardsData}
        detailedCardData={props.detailedCardData}
      />
    </div>
  );
}
