import React, { useContext } from 'react';
import { CardsProps } from '../../types/types';
import { ThreeDots } from 'react-loader-spinner';
import './styles.css';
import Card from '../card/card';
import { CardsDataContext } from '../../App';

const Cards: React.FC<CardsProps> = ({ isLoading }) => {
  const { cards } = useContext(CardsDataContext);

  const render = (): JSX.Element => {
    return cards?.length ? (
      <div className="cards__container">
        {cards.map((card) => {
          return (
            <Card
              key={card.id}
              id={card.id}
              name={card.name}
              image={card.image}
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
          wrapperClassName=""
          visible={true}
        />
      </div>
    );
  }

  return render();
};

export default Cards;
