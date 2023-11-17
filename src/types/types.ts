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

export type TDataContext = {
  cards: Data[];
  setCards: React.Dispatch<React.SetStateAction<Data[]>>;
  details: CardDetail | null;
  setDetails: React.Dispatch<React.SetStateAction<CardDetail | null>>;
  totalCount: number;
  setTotalCount?: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  cardsPerPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setCardsPerPage: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isDetailsLoading: boolean;
  setIsDetailsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface ContextValue {
  value: TDataContext;
}
