import React from 'react';
import { CardProps } from '../../types/types';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Card = ({ id, name, image }: CardProps) => {
  const router = useRouter();
  const { query, pathname } = router;

  const handleCardClick = () => {
    router.push({
      pathname,
      query: { ...query, details: id },
    });
  };

  return (
    <div
      data-testid={'card'}
      className="card"
      id={id}
      onClick={handleCardClick}
    >
      <h4 data-testid={'card-title'} className="card__title">
        {name}
      </h4>
      <div className="card__image">
        <Image
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 50vw"
          src={image}
          alt="pokemon-card"
        />
      </div>
    </div>
  );
};

export default Card;
