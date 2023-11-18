import { ReactNode } from 'react';

export interface CardData {
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

export interface CardsData {
  count: number;
  data: CardData[];
  page: number;
  pageSize: number;
  totalCount: number;
}
export type ContextCards = CardData[];

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
  cards: CardsData;
};

export type CardProps = {
  id: string;
  name: string;
  image: string;
};

export type TDataContext = {
  details: CardDetail | null;
  setDetails: React.Dispatch<React.SetStateAction<CardDetail | null>>;
  totalCount: number;
  setTotalCount?: React.Dispatch<React.SetStateAction<number>>;
  isDetailsLoading: boolean;
  setIsDetailsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface ContextValue {
  value: TDataContext;
}
