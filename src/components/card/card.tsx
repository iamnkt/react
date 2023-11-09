import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getCardById } from '../../api/getDetailedCard';
import { CardProps } from '../../types/types';

const Card: React.FC<CardProps> = ({ id, name, image, setDetails }) => {
  const navigate = useNavigate();

  const cardHandler = async () => {
    const response = await getCardById(id);
    setDetails(response);
    localStorage.setItem('details', JSON.stringify(response));
    navigate(`/details/${id}`);
  };

  return (
    <div className="card" id={id} onClick={cardHandler}>
      <h4 className="card__title">{name}</h4>
      <img className="card__image" src={image}></img>
    </div>
  );
};

export default Card;
