import { ReactNode } from 'react';

export interface Card {
  id: string;
  name: string;
  images: {
    large: 'string';
  };
}

export interface Data {
  id: string;
  name: string;
  image: string;
}

export interface ErrorProps {
  children?: ReactNode;
}

export interface ErrorState {
  hasError: boolean;
}

export type SearchProps = {
  updateLoading: (loading: boolean) => void;
  updateCard: (card: string) => void;
  updateCards: (data: Data[]) => void;
  updateTotalCount: (totalCount: number) => void;
  updateCurrentPage: (pageNumber: number) => void;
  updateCardsPerPage: (cardsNumber: number) => void;
  name: string;
  currentPage: number;
  cardsPerPage: number;
};

export type ViewProps = {
  loading: boolean;
  data: Data[];
};

export type PaginationProps = {
  loading: boolean;
  totalCount: number;
  cardsPerPage: number;
  updateCurrentPage: (number: number) => void;
  updateCardsPerPage: (number: number) => void;
};

export type DropdownProps = {
  updateCardsPerPage: (number: number) => void;
  options: number[];
};
