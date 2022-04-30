import React, { createContext, useContext, useReducer } from "react";
import { Action, CartItem, StateType } from "./reducer";

export const StateContext = createContext({});

interface Props {
  reducer: (
    a: StateType,
    b: Action
  ) => {
    cart: CartItem[];
    user: null;
  };
  initialState: StateType;
  children: React.ReactNode;
}

export default function StateProvider({ reducer, initialState, children }: Props) {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
}

export const useStateValue = () => useContext(StateContext);
