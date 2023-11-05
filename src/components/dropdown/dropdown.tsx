import React, { useState } from 'react';
import { DropdownProps } from '../../types/types';

const Dropdown: React.FC<DropdownProps> = ({ updateCardsPerPage, options }) => {
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
        updateCards(Number(e.target.value));
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
