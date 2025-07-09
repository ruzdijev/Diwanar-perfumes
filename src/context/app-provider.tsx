"use client";

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import type { Perfume } from '@/lib/perfumes';

type Currency = 'GBP' | 'EUR';

type CartItem = {
  perfume: Perfume;
  quantity: number;
};

type AppState = {
  cart: CartItem[];
  currency: Currency;
};

type AppAction =
  | { type: 'ADD_TO_CART'; payload: { perfume: Perfume; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: { perfumeId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { perfumeId: string; quantity: number } }
  | { type: 'SET_CURRENCY'; payload: { currency: Currency } }
  | { type: 'CLEAR_CART' };


const initialState: AppState = {
  cart: [],
  currency: 'GBP',
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { perfume, quantity } = action.payload;
      const existingItem = state.cart.find(item => item.perfume.id === perfume.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.perfume.id === perfume.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { perfume, quantity }],
      };
    }
    case 'REMOVE_FROM_CART': {
      return {
        ...state,
        cart: state.cart.filter(item => item.perfume.id !== action.payload.perfumeId),
      };
    }
    case 'UPDATE_QUANTITY': {
        if (action.payload.quantity <= 0) {
            return {
                ...state,
                cart: state.cart.filter(item => item.perfume.id !== action.payload.perfumeId),
            };
        }
      return {
        ...state,
        cart: state.cart.map(item =>
          item.perfume.id === action.payload.perfumeId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    }
    case 'SET_CURRENCY': {
      return {
        ...state,
        currency: action.payload.currency,
      };
    }
    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};

type AppContextType = {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
