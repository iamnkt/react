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
  updateQuery: (query: string) => void;
  query: string;
};

export type CardsProps = {
  isLoading: boolean;
  data: Data[];
  // updateOverlay: () => void;
};

export type PagesProps = {
  isLoading: boolean;
  totalCount: number;
  page: number;
  updatePage: (number: number) => void;
  updateCardsPerPage: (number: number) => void;
  cardsPerPage: number;
};

export type DropdownProps = {
  updatePage: (number: number) => void;
  updateCardsPerPage: (number: number) => void;
  options: number[];
  cardsPerPage: number;
};

export type DetailsProps = {
  updateOverlay: () => void;
};
