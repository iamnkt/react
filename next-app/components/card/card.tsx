import React from 'react';
import { CardProps } from '../../types/types';

const Card: React.FC<CardProps> = ({ id, name, image }) => {
  return (
    <div data-testid={'card'} className="card" id={id}>
      <h4 data-testid={'card-title'} className="card__title">
        {name}
      </h4>
      <img data-testid={'card-image'} className="card__image" src={image}></img>
    </div>
  );
};

export default Card;
