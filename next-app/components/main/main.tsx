import { CardsData, DetailedCard } from '@/types/types';
import Cards from '../cards/cards';
import Details from '../details/details';
import Pages from '../pages/pages';
import Search from '../search/search';
import { useRouter } from 'next/router';

interface MainComp {
  cardsData: CardsData;
  detailedCardData: DetailedCard;
}

const Main: React.FC<MainComp> = ({ cardsData, detailedCardData }) => {
  const router = useRouter();
  const { query } = router;
  const { details } = query;

  return (
    <>
      <div className="main__container">
        <Search />
        <Cards data={cardsData} />
        <Pages data={cardsData} />
      </div>
      {details && <Details data={detailedCardData} />}
    </>
  );
};

export default Main;
