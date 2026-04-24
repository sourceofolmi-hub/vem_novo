"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type CartItem = {
  id: string;
  nome: string;
  imagem: string;
  quantidade: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantidade">) => void;
  removeItem: (id: string) => void;
  increaseItem: (id: string) => void;
  decreaseItem: (id: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  totalSavings: number;
};

const CartContext = createContext<CartContextType | null>(null);

function calcularPreco(total: number) {
  const packs = Math.floor(total / 3);
  const resto = total % 3;
  return packs * 40 + resto * 15;
}

function calcularDesconto(total: number) {
  const precoNormal = total * 15;
  const precoFinal = calcularPreco(total);
  return precoNormal - precoFinal;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("vemtaki-cart");
    if (saved) {
      setItems(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("vemtaki-cart", JSON.stringify(items));
  }, [items]);

  const addItem = (item: Omit<CartItem, "quantidade">) => {
    setItems((prev) => {
      const existing = prev.find((x) => x.id === item.id);

      if (existing) {
        return prev.map((x) =>
          x.id === item.id ? { ...x, quantidade: x.quantidade + 1 } : x
        );
      }

      return [...prev, { ...item, quantidade: 1 }];
    });
  };

  const increaseItem = (id: string) => {
    setItems((prev) =>
      prev.map((x) =>
        x.id === id ? { ...x, quantidade: x.quantidade + 1 } : x
      )
    );
  };

  const decreaseItem = (id: string) => {
    setItems((prev) =>
      prev
        .map((x) => (x.id === id ? { ...x, quantidade: x.quantidade - 1 } : x))
        .filter((x) => x.quantidade > 0)
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
  };

  const clearCart = () => setItems([]);

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantidade, 0),
    [items]
  );

  const totalPrice = useMemo(() => calcularPreco(totalItems), [totalItems]);
  const totalSavings = useMemo(
    () => calcularDesconto(totalItems),
    [totalItems]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        increaseItem,
        decreaseItem,
        clearCart,
        totalItems,
        totalPrice,
        totalSavings,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return ctx;
}
