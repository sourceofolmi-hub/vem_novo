"use client";

import { useCart } from "./CartContext";

export default function CartButton() {
  const { totalItems } = useCart();

  return (
    <a
      href="/carrinho"
      style={{
        position: "relative",
        borderRadius: "999px",
        padding: "12px 18px",
        border: "1px solid rgba(200,171,120,0.18)",
        background: "rgba(20,14,10,0.45)",
        color: "#d4bea0",
        textDecoration: "none",
        fontFamily: "Arial, sans-serif",
        fontWeight: 700,
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      Carrinho

      {totalItems > 0 && (
        <span
          style={{
            minWidth: "22px",
            height: "22px",
            borderRadius: "999px",
            background: "linear-gradient(180deg, #dbc39a, #b48f54)",
            color: "#120d08",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            fontWeight: 700,
            padding: "0 6px",
          }}
        >
          {totalItems}
        </span>
      )}
    </a>
  );
}