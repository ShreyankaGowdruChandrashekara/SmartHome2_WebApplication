// CartContext.js
import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children , initialItems}) => {
    const [items, setItems] = useState(initialItems || []);
    const [count, setCount] = useState(initialItems ? initialItems.length : 0);

  const updateCount = (newCount) => {
    setCount(newCount);
  };

  return (
    <CartContext.Provider value={{ items, count, updateCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
