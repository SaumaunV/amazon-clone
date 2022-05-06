import { User } from "firebase/auth";

export type CartItem = {
  title: string;
  price: number;
  image: string;
  rating: number;
};

export type StateType = {
  cart: CartItem[];
  user: User | null;
};

export type Action =
  | { type: "ADD_TO_CART"; item: CartItem }
  | { type: "REMOVE_FROM_CART"; title: string }
  | { type: "SET_USER"; user: User | null};

export const initialState: StateType = {
  cart: [],
  user: null,
};

export const getCartTotal = (cart: CartItem[]) =>
  cart?.reduce((amount, item: CartItem) => item.price + amount, 0);

const reducer = (state: StateType, action: Action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.item],
      };
    case "REMOVE_FROM_CART":
      const index = state.cart.findIndex(
        (cartItem) => cartItem.title === action.title
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
