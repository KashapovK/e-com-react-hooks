import React, { useState } from "react";
import { CartItem, Product } from "./types/types";
import { StoreContext } from "./store";

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: Product) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
      setCart([...cart]);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const increaseQuantity = (id: string) => {
    const item = cart.find((cartItem) => cartItem.id === id);
    if (item) {
      item.quantity += 1;
      setCart([...cart]);
    }
  };

  const decreaseQuantity = (id: string) => {
    const item = cart.find((cartItem) => cartItem.id === id);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
      setCart([...cart]);
    } else {
      removeFromCart(id);
    }
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        setProducts,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
