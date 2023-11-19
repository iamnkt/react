import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hooks';
import { cardIdValueSlice } from '../../store/reducers/cardIdValueSlice';
import { CardProps } from '../../types/types';

const Card: React.FC<CardProps> = ({ id, name, image }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setCardId } = cardIdValueSlice.actions;
  const dispatch = useAppDispatch();

  const cardHandler = () => {
    dispatch(setCardId(id));
    navigate(`/details/${id}?${searchParams}`);
  };

  return (
    <div data-testid={'card'} className="card" id={id} onClick={cardHandler}>
      <h4 data-testid={'card-title'} className="card__title">
        {name}
      </h4>
      <img data-testid={'card-image'} className="card__image" src={image}></img>
    </div>
  );
};

export default Card;
