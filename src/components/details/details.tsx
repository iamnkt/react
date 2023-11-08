import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getCardById } from '../../api/api';
import { CardDetail } from '../../types/types';

const Details: React.FC = () => {
  const [card, setCard] = useState<CardDetail | null>(null);
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  useEffect(() => {
    const search = async () => {
      try {
        if (!id) {
          return;
        }
        const card = await getCardById(id);
        setCard(card);
      } finally {
      }
    };

    search().catch(console.error);
  }, [id]);

  return <div className="card-details">{card?.hp}</div>;
};

export default Details;
