"use client";

import { useState } from "react";

type Props = {
  id: string;
  nome: string;
  imagem: string;
};

export default function AddToCartButton({ id, nome, imagem }: Props) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((item: any) => item.id === id);

    if (existing) {
      existing.quantidade += qty;
    } else {
      cart.push({
        id,
        nome,
        imagem,
        quantidade: qty,
        preco: 15,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
window.dispatchEvent(new Event("cartUpdated"));
window.dispatchEvent(new Event("productAdded"));

    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div style={wrapper}>
      {/* QUANTIDADE */}
      <div style={qtyBox}>
        <button onClick={() => setQty(qty > 1 ? qty - 1 : 1)} style={qtyBtn}>
          −
        </button>

        <span style={qtyText}>{qty}</span>

        <button onClick={() => setQty(qty + 1)} style={qtyBtn}>
          +
        </button>
      </div>

      {/* BOTÃO */}
      <button onClick={addToCart} style={button(added)}>
        {added ? "Adicionado ✓" : "Adicionar"}
      </button>
    </div>
  );
}

/* ---------- STYLES ---------- */

const wrapper: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "14px",
};

const qtyBox: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  borderRadius: "999px",
  border: "1px solid rgba(214,197,160,0.22)",
  background: "rgba(255,255,255,0.03)",
  padding: "6px 10px",
  gap: "12px",
};

const qtyBtn: React.CSSProperties = {
  background: "transparent",
  border: "none",
  color: "#eadfc8",
  fontSize: "18px",
  cursor: "pointer",
};

const qtyText: React.CSSProperties = {
  minWidth: "20px",
  textAlign: "center",
  fontWeight: 700,
  color: "#eadfc8",
};

const button = (added: boolean): React.CSSProperties => ({
  borderRadius: "999px",
  padding: "14px 22px",
  border: "1px solid rgba(214,197,160,0.28)",
  background: added
    ? "linear-gradient(180deg, #d9f2c7, #9fca7a)"
    : "linear-gradient(180deg, #f5e6c8, #c5a96e)",
  color: "#17110a",
  fontFamily: "Arial, sans-serif",
  fontWeight: 900,
  fontSize: "14px",
  cursor: "pointer",
  boxShadow: added
    ? "0 0 34px rgba(159,202,122,0.45)"
    : "0 14px 34px rgba(197,169,110,0.28)",
  transform: added ? "scale(1.05)" : "scale(1)",
});