import { DEFAULT_PAGE, PAGE_SIZES } from '@/utils/constants';
import { useRouter } from 'next/router';
import React from 'react';
import { PagesType } from '../../types/types';
import Dropdown from '../dropdown/dropdown';

const Pages = ({ data }: { data: PagesType }) => {
  const router = useRouter();
  const { query } = router;
  const name = query.name;
  const page = Number(query.page) || DEFAULT_PAGE;
  const limit = Number(query.limit) || PAGE_SIZES.default;
  const totalCount = data.totalCount;
  const pagesCount = Math.ceil(totalCount / limit);

  const updatePage = (newPage: number) => {
    router.push({
      query: { name: name || '', page: newPage, limit: limit },
    });
  };

  return (
    <div className="pages__container">
      <div data-testid="page-buttons" className="pages">
        <button
          type="button"
          data-testid="firstpage-button"
          onClick={() => {
            const newPage = DEFAULT_PAGE;
            updatePage(newPage);
          }}
          disabled={page === DEFAULT_PAGE}
        >
          &#60;&#60;
        </button>
        <button
          type="button"
          data-testid="prevpage-button"
          onClick={() => {
            if (page > 1) {
              const newPage = page - 1;
              updatePage(newPage);
            }
          }}
          disabled={page === DEFAULT_PAGE}
        >
          &#60;
        </button>
        <button type="button">{`${page}`}</button>
        <button
          type="button"
          data-testid="nextpage-button"
          onClick={() => {
            if (page < pagesCount) {
              const newPage = page + 1;
              updatePage(newPage);
            }
          }}
          disabled={page === pagesCount}
        >
          &#62;
        </button>
        <button
          type="button"
          data-testid="lastpage-button"
          onClick={() => {
            const newPage = pagesCount;
            updatePage(newPage);
          }}
          disabled={page === pagesCount}
        >
          &#62;&#62;
        </button>
      </div>
      <Dropdown options={[PAGE_SIZES.default, PAGE_SIZES.big]} />
    </div>
  );
};

export default Pages;
