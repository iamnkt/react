import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DEFAULT_PAGE } from '../../constants/constants';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { limitValueSlice } from '../../store/reducers/limitValueSlice';
import { pageValueSlice } from '../../store/reducers/pageValueSlice';
import { DropdownProps } from '../../types/types';

const Dropdown: React.FC<DropdownProps> = ({ options }) => {
  const [, setSearchParams] = useSearchParams();
  const { query } = useAppSelector((state) => state.searchValueReducer);
  const { limit } = useAppSelector((state) => state.limitValueReducer);
  const { setLimit } = limitValueSlice.actions;
  const { setPage } = pageValueSlice.actions;
  const dispatch = useAppDispatch();

  const [selectedOption, setSelectedOption] = useState(limit);

  return (
    <select
      className="dropdown"
      value={selectedOption}
      onChange={(e) => {
        setSelectedOption(Number(e.target.value));
        dispatch(setLimit(Number(e.target.value)));
        dispatch(setPage(DEFAULT_PAGE));
        setSearchParams({
          q: `name:${query}*`,
          page: DEFAULT_PAGE.toString(),
          pageSize: e.target.value,
        });
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
