import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("chronos-cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // ✅ Save to localStorage on every cart change
  useEffect(() => {
    localStorage.setItem("chronos-cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(watch) {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === watch.id);
      if (exists) {
        return prev.map((item) =>
          item.id === watch.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...watch, qty: 1 }];
    });
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  function updateQty(id, qty) {
    if (qty < 1) return removeFromCart(id);
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty } : item))
    );
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, total }}>
      {children}
    </CartContext.Provider>
  );
};