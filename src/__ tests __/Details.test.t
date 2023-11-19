// import { BrowserRouter } from 'react-router-dom';
// import { fireEvent, render, screen, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import Details from '../components/details/details';
// import { setupStore } from '../store/store';
// import { CharizardMockCard } from './__mocks__/Mocks';
// import { Provider } from 'react-redux';

// const store = setupStore();

// const mockedUsedNavigate = jest.fn();

// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: () => mockedUsedNavigate,
// }));

// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useOutletContext: () => ({
//     id: CharizardMockCard.id,
//   }),
// }));

// describe('Details component', () => {
//   it('displays loading indicator while fetching data', () => {
//     render(
//       <Provider store={store}>
//         <BrowserRouter>
//           <Details />
//         </BrowserRouter>
//       </Provider>
//     );
//     const loader = screen.getByTestId('loader');
//     expect(loader).toBeInTheDocument();
//   });

//   it('correctly displays the detailed card data', () => {
//     render(
//       <Provider store={store}>
//         <BrowserRouter>
//           <Details />
//         </BrowserRouter>
//       </Provider>
//     );
//     expect(screen.queryByText(/Charizard/i)).toBeInTheDocument();
//     expect(screen.queryByText(/150/i)).toBeInTheDocument();
//     expect(screen.queryByText(/12/i)).toBeInTheDocument();
//     expect(screen.queryByText(/fire/i)).toBeInTheDocument();
//     expect(screen.queryByText(/rare/i)).toBeInTheDocument();
//   });

//   it('clicking the close button hides the component', async () => {
//     render(
//       <Provider store={store}>
//         <BrowserRouter>
//           <Details />
//         </BrowserRouter>
//       </Provider>
//     );
//     const closeButton = screen.getByTestId('button');
//     const detailedCard = screen.queryByTestId('card-details');
//     expect(detailedCard).toBeInTheDocument();
//     fireEvent.click(closeButton);
//     await waitFor(() => {
//       expect(detailedCard).toBeNull();
//     });
//   });
// });
