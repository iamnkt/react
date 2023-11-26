import { CardsData, DetailedCard } from '@/types/types';
import { useRouter } from 'next/router';
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
