import { DEFAULT_PAGE, PAGE_SIZES } from '@/utils/constants';
import { useRouter } from 'next/router';
import React from 'react';
import { DropdownProps } from '../../types/types';

const Dropdown = ({ options }: DropdownProps) => {
  const router = useRouter();
  const { query } = router;
  const limit = Number(query.limit) || PAGE_SIZES.default;

  const updatePage = (newLimit: number) => {
    delete query.page;
    delete query.limit;
    router.push({ query: { ...query, page: DEFAULT_PAGE, limit: newLimit } });
  };

  return (
    <select
      role="select"
      className="dropdown"
      value={limit}
      onChange={(e) => {
        const newLimit = Number(e.target.value);
        updatePage(newLimit);
      }}
    >
      {options.map((value: number) => (
        <option role="option" key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
