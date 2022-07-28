import { User } from "firebase/auth";
import React, { createContext, Dispatch, useContext, useReducer } from "react";
import { Action, CartItem, StateType } from "./reducer";


type ContextType = [
  { cart: [CartItem, number][]; user: User | null },
  Dispatch<Action>
];

export const StateContext = createContext<ContextType>({} as ContextType);

interface Props {
  reducer: (
    a: StateType,
    b: Action
  ) => {
    cart: [CartItem, number][];
    user: User | null;
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
