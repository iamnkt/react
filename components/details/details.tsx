import { DetailedCard } from '@/types/types';
import React from 'react';
import { useRouter } from 'next/router';

export type PropsData = {
  data: {
    data: DetailedCard;
  };
};

const Details = ({ data }: PropsData) => {
  const card = data.data;
  const router = useRouter();
  const { query, pathname } = router;

  const handleButtonClick = () => {
    delete query.details;
    router.push({
      pathname,
      query,
    });
  };

  return (
    <div className="card-details">
      <button
        data-testid="close-button"
        className="card-details__button button"
        onClick={handleButtonClick}
      >
        x
      </button>
      <div className="card-details__container" data-testid="detailed-card">
        <p className="card-details__name">Name: {card?.name}</p>
        <p className="card-details__hp">HP: {card?.hp}</p>
        <p className="card-details__level">Level: {card?.level}</p>
        <p className="card-details__type">Type: {card?.types[0]}</p>
        <p className="card-details__rarity">Rarity: {card?.rarity}</p>
      </div>
    </div>
  );
};

export default Details;
