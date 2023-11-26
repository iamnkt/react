import React from 'react';
import { CardData, CardsData } from '../../types/types';
import Card from '../card/card';

const Cards = ({ data }: { data: CardsData }) => {
  const render = (): JSX.Element => {
    const cards = data.data;

    return cards.length ? (
      <div data-testid="cards-container" className="cards__container">
        {cards.map((card: CardData) => {
          return (
            <Card
              data-testid="card"
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

  return render();
};

export default Cards;
