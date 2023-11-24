import React from 'react';
import { CardData, CardsData, CardsProps } from '../../types/types';
import Card from '../card/card';
import { ThreeDots } from 'react-loader-spinner';
import { useRouter } from 'next/router';

const Cards = ({ cardsData }: { cardsData: CardsData }) => {
  const router = useRouter();
  const { query, pathname } = router;
  console.log(query);

  const render = (): JSX.Element => {
    const data = cardsData.data;
    return data.length ? (
      <div className="cards__container">
        {data.map((card: CardData) => {
          return (
            <Card
              data-testid="card"
              key={card.id}
              id={card.id}
              name={card.name}
              image={card.images.large}
            />
          );
        })}
      </div>
    ) : (
      <div className="cards-notfound">
        <h3 className="cards-notfound__title">No cards were found</h3>
      </div>
    );
  };

  // if (isLoading) {
  //   return (
  //     <div data-testid="loader" className="loader">
  //       <ThreeDots
  //         height="80"
  //         width="80"
  //         radius="9"
  //         color="#FFC759"
  //         ariaLabel="three-dots-loading"
  //         wrapperStyle={{}}
  //         visible={true}
  //       />
  //     </div>
  //   );
  // }

  return render();
};

export default Cards;
