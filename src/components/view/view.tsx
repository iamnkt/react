import React from 'react';
import { Data, ViewProps } from '../../types/types';
import { ThreeDots } from 'react-loader-spinner';
import './view.css';
import { Outlet } from 'react-router-dom';

const View: React.FC<ViewProps> = ({ loading, data }) => {
  const render = (): JSX.Element => {
    if (data.length)
      return (
        <>
          <div className="items">
            {data.map((card: Data) => (
              <div className="item" key={card.id}>
                <h4 className="title">{card.name}</h4>
                <img className="image" src={card.image}></img>
              </div>
            ))}
          </div>
          <Outlet />
        </>
      );
    return (
      <div className="nothing">
        <h3 className="nothing-caption">No cards were found</h3>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="spinner">
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
  } else {
    return render();
  }
};

export default View;
