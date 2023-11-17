import React, { useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getCardById } from '../../services/getDetailedCard';
import { DataContext } from '../../context/context';
import { CardProps } from '../../types/types';

const Card: React.FC<CardProps> = ({ id, name, image }) => {
  const { setDetails, setIsDetailsLoading } = useContext(DataContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const cardHandler = async () => {
    setIsDetailsLoading!(true);
    const response = await getCardById(id);
    setDetails!(response);
    localStorage.setItem('details', JSON.stringify(response));
    navigate(`/details/${id}?${searchParams}`);
    setIsDetailsLoading!(false);
  };

  return (
    <div data-testid={'card'} className="card" id={id} onClick={cardHandler}>
      <h4 data-testid={'card-title'} className="card__title">
        {name}
      </h4>
      <img data-testif={'card-image'} className="card__image" src={image}></img>
    </div>
  );
};

export default Card;
