import React, { useContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DataContext } from '../../context/context';
import { DropdownProps } from '../../types/types';

const Dropdown: React.FC<DropdownProps> = ({ options }) => {
  const [, setSearchParams] = useSearchParams();
  const { cardsPerPage, setCardsPerPage, setPage, query } =
    useContext(DataContext);
  const [selectedOption, setSelectedOption] = useState(cardsPerPage);

  return (
    <select
      className="dropdown"
      value={selectedOption}
      onChange={(e) => {
        setSelectedOption(Number(e.target.value));
        setCardsPerPage!(Number(e.target.value));
        setPage!(1);
        setSearchParams({
          q: `name:${query}*`,
          page: '1',
          pageSize: e.target.value,
        });
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
