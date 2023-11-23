import React, { useEffect } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { cardsAPI } from '../../services/cardsService';
import { cardFlagValueSlice } from '../../store/reducers/cardFlagValueSlice';
import './styles.css';

const Details: React.FC = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id } = useAppSelector((state) => state.cardIdValueReducer);
  const { data: response, isFetching } = cardsAPI.useGetDetailedCardQuery({
    id,
  });
  const card = response?.data;
  const { setIsFetching } = cardFlagValueSlice.actions;
  useEffect(() => {
    dispatch(setIsFetching(isFetching));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching]);

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
    <div className="card-details">
      <button
        data-testid="close-button"
        className="card-details__button button"
        onClick={onCloseClick}
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
