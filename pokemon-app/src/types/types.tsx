export interface Card {
  id: string;
  name: string;
  flavorText?: string;
}

export interface Data {
  id: string;
  name: string;
  description: string;
}

export type SearchProps = {
  setItems: (items: Data[]) => void;
};

export type ViewProps = {
  data: Data[];
};
