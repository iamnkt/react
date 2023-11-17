import React, { useContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DataContext } from '../../context/context';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { limitValueSlice } from '../../store/reducers/limitValueSlice';
import { DropdownProps } from '../../types/types';

const Dropdown: React.FC<DropdownProps> = ({ options }) => {
  const [, setSearchParams] = useSearchParams();
  const { query } = useAppSelector((state) => state.searchValueReducer);
  const { limit } = useAppSelector((state) => state.limitValueReducer);

  const { setLimit } = limitValueSlice.actions;
  const dispatch = useAppDispatch();

  const { setPage } = useContext(DataContext);

  const [selectedOption, setSelectedOption] = useState(limit);

  return (
    <select
      className="dropdown"
      value={selectedOption}
      onChange={(e) => {
        setSelectedOption(Number(e.target.value));
        dispatch(setLimit(Number(e.target.value)));
        setPage!(1);
        setSearchParams({
          q: `name:${query}*`,
          page: '1',
          pageSize: e.target.value,
        });
        localStorage.setItem('limit', e.target.value);
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
