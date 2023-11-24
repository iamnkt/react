import { DEFAULT_PAGE, PAGE_SIZES } from '@/utils/constants';
import { useRouter } from 'next/router';
import React from 'react';
import { PagesProps, PagesType } from '../../types/types';
import cards from '../cards/cards';
import Dropdown from '../dropdown/dropdown';

const Pages = ({ cardsData }: { cardsData: PagesType }) => {
  const router = useRouter();
  const { query } = router;
  const page = Number(query.page) || DEFAULT_PAGE;
  const limit = Number(query.limit) || PAGE_SIZES.default;
  const totalCount = cardsData.totalCount;
  const pagesCount = Math.ceil(totalCount / limit);

  const updatePage = (newPage: number) => {
    delete query.page;
    router.push({ query: { ...query, page: `${newPage}` } });
  };

  // if (isLoading) {
  //   return <></>;
  // }

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
