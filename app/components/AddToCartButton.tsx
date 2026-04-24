"use client";

import { useState } from "react";
import { useCart } from "./CartContext";

type Props = {
  id: string;
  nome: string;
  imagem: string;
};

export default function AddToCartButton({ id, nome, imagem }: Props) {
  const { addItem } = useCart();
  const [quantidade, setQuantidade] = useState(1);

  const aumentar = () => setQuantidade((q) => q + 1);
  const diminuir = () => setQuantidade((q) => (q > 1 ? q - 1 : 1));

  const adicionarAoCarrinho = () => {
    for (let i = 0; i < quantidade; i++) {
      addItem({ id, nome, imagem });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        flexWrap: "wrap",
        background: "rgba(10,10,10,0.72)",
        padding: "12px 14px",
        borderRadius: "999px",
        border: "1px solid rgba(200,171,120,0.18)",
        backdropFilter: "blur(8px)",
        boxShadow: "0 0 18px rgba(0,0,0,0.25)",
      }}
    >
      <button onClick={diminuir} style={qtyBtnStyle}>
        -
      </button>

      <span
        style={{
          minWidth: "28px",
          textAlign: "center",
          color: "#f2ede5",
          fontFamily: "Arial, sans-serif",
          fontWeight: 700,
        }}
      >
        {quantidade}
      </span>

      <button onClick={aumentar} style={qtyBtnStyle}>
        +
      </button>

      <button onClick={adicionarAoCarrinho} style={addBtnStyle}>
        Adicionar ao carrinho
      </button>
    </div>
  );
}

const qtyBtnStyle: React.CSSProperties = {
  width: "34px",
  height: "34px",
  borderRadius: "999px",
  border: "1px solid rgba(200,171,120,0.18)",
  background: "rgba(20,14,10,0.45)",
  color: "#d4bea0",
  fontWeight: 700,
  cursor: "pointer",
};

const addBtnStyle: React.CSSProperties = {
  borderRadius: "999px",
  padding: "12px 18px",
  border: "1px solid rgba(200,171,120,0.18)",
  background: "linear-gradient(180deg, #dbc39a, #b48f54)",
  color: "#120d08",
  fontFamily: "Arial, sans-serif",
  fontWeight: 700,
  fontSize: "14px",
  cursor: "pointer",
  transition: "all 0.25s ease",
};
