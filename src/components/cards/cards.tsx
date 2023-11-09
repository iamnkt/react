import React from 'react';
import { CardsProps } from '../../types/types';
import { ThreeDots } from 'react-loader-spinner';
import './styles.css';
import { Link, useSearchParams } from 'react-router-dom';

const Cards: React.FC<CardsProps> = ({ isLoading, data }) => {
  const [searchParams] = useSearchParams();

  const render = (): JSX.Element => {
    return data.length ? (
      <div className="cards__container">
        {data.map((card) => {
          searchParams.set('id', card.id);
          return (
            <Link
              className="card"
              key={card.id}
              to={{ pathname: 'details', search: searchParams.toString() }}
              // onClick={updateOverlay}
            >
              <h4 className="card__title">{card.name}</h4>
              <img className="card__image" src={card.image}></img>
            </Link>
          );
        })}
      </div>
    ) : (
      <div className="cards-notfound">
        <h3 className="cards-notfound__title">No cards were found</h3>
      </div>
    );
  };

  if (isLoading) {
    return (
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
    );
  }

  return render();
};

export default Cards;
