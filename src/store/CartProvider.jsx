import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (prevState, action) => {
  switch (action.type) {
    case "ADD_CART_ITEM":
      const updateItems = prevState.items.concat(action.item);
      const updateTotalAmount =
        prevState.totalAmount + action.item.price * action.item.amount;
      return {
        items: updateItems,
        totalAmount: updateTotalAmount,
      };
    case "DELETE_CART_ITEM":
      break;
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
