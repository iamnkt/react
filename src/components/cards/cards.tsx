import React from 'react';
import './styles.css';
import { CardData, CardsProps } from '../../types/types';
import Card from '../card/card';
import { useSearchParams } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import { useAppSelector } from '../../hooks/hooks';

const Cards: React.FC<CardsProps> = ({ cards }) => {
  const [searchParams] = useSearchParams();
  const { isLoading } = useAppSelector((state) => state.cardsFlagValueReducer);

  const render = (): JSX.Element => {
    const data = cards.data;
    return data.length ? (
      <div className="cards__container">
        {data.map((card: CardData) => {
          searchParams.set('id', card.id);
          return (
            <Card
              key={card.id}
              id={card.id}
              name={card.name}
              image={card.images.large}
            />
          );
        })}
      </div>
    ) : (
      <div className="cards-notfound">
        <h3 className="cards-notfound__title">No cards were found</h3>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="loading">
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#FFC759"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          visible={true}
        />
      </div>
    );
  }

  return render();
};

export default Cards;
