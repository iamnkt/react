import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import {
  useNavigate,
  useOutletContext,
  useSearchParams,
} from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hooks';
import { cardsAPI } from '../../services/cardsService';
import { cardFlagValueSlice } from '../../store/reducers/cardFlagValueSlice';
import { ContextType } from '../../types/types';
import './styles.css';

const Details: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { id } = useOutletContext<ContextType>();
  const { data: card, isFetching } = cardsAPI.useGetDetailedCardQuery({ id });
  const { setIsFetching } = cardFlagValueSlice.actions;
  const dispatch = useAppDispatch();
  dispatch(setIsFetching(isFetching));

  const onCloseClick = () => {
    navigate(`/?${searchParams}`);
  };

  return isFetching ? (
    <div className="loader-container">
      <div data-testid="loader" className="loader">
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#FFC759"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          visible={true}
        />
      </div>
    </div>
  ) : (
    <div data-testid="detailed-card" className="card-details">
      <button
        data-testid="button"
        className="card-details__button button"
        onClick={onCloseClick}
      >
        x
      </button>
      <div className="card-details__container">
        <p className="card-details__name">Name: {card?.data.name}</p>
        <p className="card-details__hp">HP: {card?.data.hp}</p>
        <p className="card-details__level">Level: {card?.data.level}</p>
        <p className="card-details__type">Type: {card?.data.types[0]}</p>
        <p className="card-details__rarity">Rarity: {card?.data.rarity}</p>
      </div>
    </div>
  );
};

export default Details;
