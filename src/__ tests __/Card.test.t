// import 'whatwg-fetch';
// import { BrowserRouter } from 'react-router-dom';
// import { fireEvent, render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import Card from '../components/card/card';
// import React from 'react';
// import { setupStore } from '../store/store';
// import { Provider } from 'react-redux';
// import { CharmanderMockCard } from './__mocks__/Mocks';

// const store = setupStore();

// const mockedUsedNavigate = jest.fn();

// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: () => mockedUsedNavigate,
// }));

// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     json: () => Promise.resolve(CharizardDetailedMockCard),
//   })
// ) as jest.Mock;

// jest.mock('../api/getDetailedCard');

// const { id, name } = CharmanderMockCard;
// const image = CharmanderMockCard.images.large;

// describe('Card component', () => {
//   it('renders the relevant card data', () => {
//     render(
//       <Provider store={store}>
//         <BrowserRouter>
//           <Card id={id} name={name} image={image} />
//         </BrowserRouter>
//       </Provider>
//     );
//     expect(screen.queryByText(CharmanderMockCard.name)).toBeInTheDocument();
//   });

//   it('opens a detailed card component', () => {
//     async () => {
//       render(
//         <Provider store={store}>
//           <BrowserRouter>
//             <Card id={id} name={name} image={image} />
//           </BrowserRouter>
//         </Provider>
//       );
//       const card = screen.getByTestId('card');
//       const detailedCard = screen.getByTestId('detailed-card');
//       await fireEvent.click(card);
//       expect(await detailedCard).toBeInTheDocument();
//     };
//   });
// });
