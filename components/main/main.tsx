import { CardsData, DetailedCard } from '@/types/types';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Cards from '../cards/cards';
import Details from '../details/details';
import Pages from '../pages/pages';
import Search from '../search/search';

interface MainComp {
  cardsData: CardsData;
  detailedCardData: {
    data: DetailedCard;
  } | null;
}

const Main: React.FC<MainComp> = ({ cardsData, detailedCardData }) => {
  const router = useRouter();

  useEffect(() => {
    if (!router.query.name && !router.query.page && !router.query.limit) {
      router.query.name = '';
      router.query.page = '1';
      router.query.limit = '8';
      router.push(router);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { query, pathname } = router;

  const handleMainContainerClick = () => {
    if (query.details) {
      delete query.details;
      router.push({
        pathname,
        query,
      });
    }
  };

  return (
    <>
      <div
        className="main__container"
        onClickCapture={handleMainContainerClick}
      >
        <Search />
        <Cards data={cardsData} />
        <Pages data={cardsData} />
      </div>
      {detailedCardData && <Details data={detailedCardData} />}
    </>
  );
};

export default Main;
