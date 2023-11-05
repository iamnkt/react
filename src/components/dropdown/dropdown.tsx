import React, { useState } from 'react';
import { DropdownProps } from '../../types/types';

const Dropdown: React.FC<DropdownProps> = ({
  updateCurrentPage,
  updateCardsPerPage,
  options,
}) => {
  const [selectedOption, setSelectedOption] = useState(
    localStorage.getItem('pageCards') || options[0]
  );

  const updateCards = (number: number) => {
    updateCardsPerPage(number);
  };

  return (
    <select
      className="pager"
      value={selectedOption}
      onChange={(e) => {
        setSelectedOption(Number(e.target.value));
        localStorage.setItem('pageCards', e.target.value);
        localStorage.setItem('pageNumber', '1');
        updateCards(Number(e.target.value));
        updateCurrentPage(1);
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
