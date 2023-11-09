import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getCardById } from '../../api/api';
import { CardDetail, DetailsProps } from '../../types/types';
import { ThreeDots } from 'react-loader-spinner';
import './details.css';

const Details: React.FC<DetailsProps> = ({ updateOverlay }) => {
  const [card, setCard] = useState<CardDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const id = searchParams.get('id');

  useEffect(() => {
    const search = async () => {
      try {
        setLoading(true);
        if (!id) {
          return;
        }
        const card = await getCardById(id);
        setCard(card);
      } finally {
        setLoading(false);
      }
    };

    search().catch(console.error);
  }, [id]);

  const buttonHandler = () => {
    searchParams.delete('id');
    updateOverlay();
    navigate(-1);
  };

  return loading ? (
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
  ) : (
    <div className="card-details">
      <button className="card-details__button button" onClick={buttonHandler}>
        x
      </button>
      <div className="card-details__container">
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
