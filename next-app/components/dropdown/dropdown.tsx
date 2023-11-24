import { DEFAULT_PAGE, PAGE_SIZES } from '@/utils/constants';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { DropdownProps } from '../../types/types';

const Dropdown: React.FC<DropdownProps> = ({ options }) => {
  const router = useRouter();
  const { query } = router;
  const page = Number(query.page) || DEFAULT_PAGE;
  const limit = Number(query.limit) || PAGE_SIZES.default;
  const [selectedOption, setSelectedOption] = useState(limit);

  const updatePage = (newLimit: number) => {
    delete query.page;
    delete query.limit;
    router.push({ query: { ...query, page: DEFAULT_PAGE, limit: newLimit } });
  };

  return (
    <select
      className="dropdown"
      value={selectedOption}
      onChange={(e) => {
        const newLimit = Number(e.target.value);
        updatePage(newLimit);
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
