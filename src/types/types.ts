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

export type ContextCards = Data[];

export interface ErrorProps {
  children?: ReactNode;
}

export interface ErrorState {
  hasError: boolean;
}

export type PagesProps = {
  isLoading: boolean;
};

export type DropdownProps = {
  options: number[];
};

export type ContextType = {
  details: CardDetail | null;
  setDetails: React.Dispatch<React.SetStateAction<CardDetail | null>>;
};

export type CardsProps = {
  isLoading: boolean;
};

export type CardProps = {
  id: string;
  name: string;
  image: string;
};

export type TSearchDataContext = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

export type TCardsDataContext = {
  cards: Data[];
  setCards: React.Dispatch<React.SetStateAction<Data[]>>;
  details: CardDetail | null;
  setDetails: React.Dispatch<React.SetStateAction<CardDetail | null>>;
  totalCount: number;
  page: number;
  cardsPerPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setCardsPerPage: React.Dispatch<React.SetStateAction<number>>;
};
