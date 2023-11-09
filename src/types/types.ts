import { ReactNode } from 'react';

export interface Card {
  id: string;
  name: string;
  images: {
    large: 'string';
  };
}

export interface CardDetail {
  image: string;
  name: string;
  hp: string;
  level: string;
  types: string[];
  rarity: string;
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

export type CardsProps = {
  loading: boolean;
  data: Data[];
  updateOverlay: () => void;
};

export type PaginationProps = {
  loading: boolean;
  totalCount: number;
  cardsPerPage: number;
  updateCurrentPage: (number: number) => void;
  updateCardsPerPage: (number: number) => void;
};

export type DropdownProps = {
  updateCurrentPage: (number: number) => void;
  updateCardsPerPage: (number: number) => void;
  options: number[];
};

export type RootProps = {
  updateLoading: (loading: boolean) => void;
  updateCard: (card: string) => void;
  updateCards: (data: Data[]) => void;
  updateTotalCount: (totalCount: number) => void;
  updateCurrentPage: (pageNumber: number) => void;
  updateCardsPerPage: (cardsNumber: number) => void;
  updateOverlay: () => void;
  overlay: boolean;
  name: string;
  currentPage: number;
  cardsPerPage: number;
  loading: boolean;
  cards: Data[];
  totalCount: number;
};

export type DetailsProps = {
  updateOverlay: () => void;
};
