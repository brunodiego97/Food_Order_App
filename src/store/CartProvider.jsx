import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_CART_ITEM": {
      const updateTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;

      const existingCartItemIndex = state.items.findIndex((item) => {
        return item.id === action.item.id;
      });
      const existingCartItem = state.items[existingCartItemIndex];
      let updateItems = [];

      if (existingCartItem) {
        let updateItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount,
        };
        updateItems = [...state.items];
        updateItems[existingCartItemIndex] = updateItem;
      } else {
        updateItems = state.items.concat(action.item);
      }
      return {
        items: updateItems,
        totalAmount: updateTotalAmount,
      };
    }
    case "DELETE_CART_ITEM": {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );
      const existingItem = state.items[existingCartItemIndex];
      const updatedTotalAmount = state.totalAmount - existingItem.price;
      let updatedItems;
      if (existingItem.amount === 1) {
        updatedItems = state.items.filter((item) => item.id != action.id);
      } else {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }
    default:
      return defaultCartState;
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCartState] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemHandler = (item) => {
    dispatchCartState({ type: "ADD_CART_ITEM", item: item });
  };
  const removeItemHandler = (id) => {
    dispatchCartState({ type: "DELETE_CART_ITEM", id: id });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItems: addItemHandler,
    removeItems: removeItemHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
