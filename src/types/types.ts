import { ReactNode } from 'react';

export interface CardsData {
  count: number;
  data: CardData[];
  page: number;
  pageSize: number;
  totalCount: number;
}
export interface CardData {
  id: string;
  name: string;
  images: {
    large: 'string';
  };
}

export interface DetailedCardData {
  data: DetailedCard;
}

export type DetailedCard = {
  name: string;
  hp: string;
  level: string;
  types: string[];
  rarity: string;
};

export type ContextCards = CardData[];

export interface ErrorProps {
  children?: ReactNode;
}

export interface ErrorState {
  hasError: boolean;
}

export type ContextType = {
  id: string;
};

export type CardsProps = {
  cards: CardsData;
};

export type PagesProps = {
  cards: CardsData;
};

export type DropdownProps = {
  options: number[];
};

export type CardProps = {
  id: string;
  name: string;
  image: string;
};
