import { User } from "firebase/auth";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  image: string;
  rating: number;
};

export type StateType = {
  cart: [CartItem, number][];
  user: User | null;
};

export type Action =
  | { type: "ADD_TO_CART"; item: [CartItem, number], index: number}
  | { type: "REMOVE_FROM_CART"; id: string }
  | { type: "SET_USER"; user: User | null}
  | { type: "EMPTY_CART"};

export const initialState: StateType = {
  cart: [],
  user: null,
};

export const getCartTotal = (cart: [CartItem, number][]) =>
  cart?.reduce((amount, item: [CartItem, number]) => (item[0].price * item[1]) + amount, 0);

export const getQuantityTotal = (cart: [CartItem, number][]) =>
  cart?.reduce((amount, item: [CartItem, number]) => item[1] + amount, 0);

const reducer = (state: StateType, action: Action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      if(action.index >= 0){
        state.cart[action.index][1] = action.item[1]; 
        return {...state};
      }
      else{
      return {
        ...state,
        cart: [...state.cart, action.item],
      };
    }
    case "REMOVE_FROM_CART":
      const index = state.cart.findIndex(
        (cartItem) => cartItem[0].id === action.id
      );
      let newCart = [...state.cart];
      if (index >= 0) {
        newCart.splice(index, 1);
      } else {
        console.warn("Cant remove product");
      }
      return {
          ...state,
          cart: newCart
      }
    case "EMPTY_CART":
      return {
        ...state,
        cart: []
      }
    case "SET_USER":
      return {
        ...state,
        user: action.user
      }
    default:
        return state;
  }
};

export default reducer;
