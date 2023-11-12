import { createContext } from 'react';
import { TDataContext } from '../types/types';

export const DataContext = createContext<TDataContext>(null!);
