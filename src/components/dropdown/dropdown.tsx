import React, { useState } from 'react';
import { DropdownProps } from '../../types/types';

const Dropdown: React.FC<DropdownProps> = ({
  updatePage,
  updateCardsPerPage,
  options,
  cardsPerPage,
}) => {
  const [selectedOption, setSelectedOption] = useState(cardsPerPage);

  return (
    <select
      className="dropdown"
      value={selectedOption}
      onChange={(e) => {
        console.log(e.target.value);
        setSelectedOption(Number(e.target.value));
        updateCardsPerPage(Number(e.target.value));
        updatePage(1);
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
