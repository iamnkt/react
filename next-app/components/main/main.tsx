import { CardsData, DetailedCard } from '@/types/types';
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
  return (
    <>
      <div className="main__container">
        <Search />
        <Cards data={cardsData} />
        <Pages data={cardsData} />
      </div>
      {detailedCardData && <Details data={detailedCardData} />}
    </>
  );
};

export default Main;
