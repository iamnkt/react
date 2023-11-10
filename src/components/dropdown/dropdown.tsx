import React, { useContext, useState } from 'react';
import { CardsDataContext } from '../../App';
import { DropdownProps } from '../../types/types';

const Dropdown: React.FC<DropdownProps> = ({ options }) => {
  const { cardsPerPage, setCardsPerPage, setPage } =
    useContext(CardsDataContext);
  const [selectedOption, setSelectedOption] = useState(cardsPerPage);

  return (
    <select
      className="dropdown"
      value={selectedOption}
      onChange={(e) => {
        console.log(e.target.value);
        setSelectedOption(Number(e.target.value));
        setCardsPerPage(Number(e.target.value));
        setPage(1);
        localStorage.setItem('cardsPerPage', e.target.value);
        localStorage.setItem('pageNumber', '1');
      }}
    >
      {options.map((value: number) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
