import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types';
import { wrapper } from '@/store/store';
import {
  getCards,
  getDetailedCard,
  getRunningQueriesThunk,
} from '@/services/cardsService';
import Main from '@/components/main/main';
import { CardsData, DetailedCardData } from '@/types/types';

export const getServerSideProps: GetServerSideProps<{
  cardsData: CardsData;
  detailedCardData: DetailedCardData | null;
}> = wrapper.getServerSideProps((store) => async (context) => {
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
  console.log(cardsData);

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
    <div className="app">
      <Main
        cardsData={props.cardsData}
        detailedCardData={props.detailedCardData}
      />
    </div>
  );
}
