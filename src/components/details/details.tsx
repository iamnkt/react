import React, { useContext } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import {
  useNavigate,
  useOutletContext,
  useSearchParams,
} from 'react-router-dom';
import { DataContext } from '../../context/context';
import { ContextType } from '../../types/types';
import './styles.css';

const Details: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { isDetailsLoading } = useContext(DataContext);
  const { details, setDetails } = useOutletContext<ContextType>();
  const navigate = useNavigate();

  const onCloseClick = () => {
    setDetails(null);
    localStorage.removeItem('details');
    navigate(`/?${searchParams}`);
  };

  return isDetailsLoading ? (
    <div data-testid="loader" className="loading">
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
  ) : (
    <div data-testid="card-details" className="card-details">
      <button
        data-testid="button"
        className="card-details__button button"
        onClick={onCloseClick}
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
