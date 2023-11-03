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
  updateCards: (data: Data[]) => void;
};

export type ViewProps = {
  loading: boolean;
  data: Data[];
};
