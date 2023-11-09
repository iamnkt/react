import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { ContextType } from '../../types/types';
import './styles.css';

const Details: React.FC = () => {
  const { details, setDetails } = useOutletContext<ContextType>();
  const navigate = useNavigate();

  return (
    <div className="card-details">
      <button
        className="card-details__button button"
        onClick={() => {
          setDetails(null);
          localStorage.removeItem('details');
          navigate('/');
        }}
      >
        x
      </button>
      <div className="card-details__container">
        <p className="card-details__name">Name: {details?.name}</p>
        <p className="card-details__hp">HP: {details?.hp}</p>
        <p className="card-details__level">Level: {details?.level}</p>
        <p className="card-details__type">Type: {details?.types[0]}</p>
        <p className="card-details__rarity">Rarity: {details?.rarity}</p>
      </div>
    </div>
  );
};

export default Details;
