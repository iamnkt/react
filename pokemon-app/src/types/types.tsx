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
  setItems: (items: Data[]) => void;
};

export type ViewProps = {
  data: Data[];
};
