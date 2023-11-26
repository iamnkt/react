import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types';
import { wrapper } from '@/store/store';
import {
  getCards,
  getDetailedCard,
  getRunningQueriesThunk,
} from '@/services/cardsService';
import Main from '@/components/main/main';
import { CardsData, DetailedCardData } from '@/types/types';
import ErrorBoundary from '@/components/error-boundary/errorBoundary';

export type HomePageProps = {
  cardsData: CardsData;
  detailedCardData: DetailedCardData | null;
};

export const getServerSideProps: GetServerSideProps<HomePageProps> =
  wrapper.getServerSideProps((store) => async (context) => {
    const { name, page, limit, details } = context.query;

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

    return {
      props: {
        cardsData: cardsData.data as CardsData,
        detailedCardData: details
          ? (detailedCardData.data as DetailedCardData)
          : null,
      },
    };
  });

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  if (!props.cardsData) {
    return <></>;
  }

  return (
    <ErrorBoundary>
      <div className="app">
        <Main
          cardsData={props.cardsData}
          detailedCardData={props.detailedCardData}
        />
      </div>
    </ErrorBoundary>
  );
}
