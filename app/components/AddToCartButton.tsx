"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "./CartContext";

type Props = {
  id: string;
  nome: string;
  imagem: string;
};

export default function AddToCartButton({ id, nome, imagem }: Props) {
  const { addItem } = useCart();
  const [quantidade, setQuantidade] = useState(1);
  const [added, setAdded] = useState(false);

  const diminuir = () => setQuantidade((q) => Math.max(1, q - 1));
  const aumentar = () => setQuantidade((q) => q + 1);

  const adicionarAoCarrinho = () => {
    for (let i = 0; i < quantidade; i++) {
      addItem({ id, nome, imagem });
    }

    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div
      style={{
        display: "grid",
        gap: "10px",
        justifyItems: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          flexWrap: "wrap",
          justifyContent: "center",
          background: "rgba(10,10,10,0.78)",
          padding: "12px 14px",
          borderRadius: "999px",
          border: "1px solid rgba(200,171,120,0.22)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 0 18px rgba(0,0,0,0.30)",
        }}
      >
        <button onClick={diminuir} style={qtyBtnStyle}>
          -
        </button>

        <span
          style={{
            minWidth: "32px",
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

      {added && (
        <div
          style={{
            color: "#8fd19e",
            fontFamily: "Arial, sans-serif",
            fontSize: "13px",
            fontWeight: 700,
          }}
        >
          Adicionado ao carrinho
        </div>
      )}

      <Link href="/encomendas" style={checkoutBtnStyle}>
        Finalizar encomenda
      </Link>
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
};

const checkoutBtnStyle: React.CSSProperties = {
  borderRadius: "999px",
  padding: "11px 18px",
  border: "1px solid rgba(214,197,160,0.18)",
  background: "rgba(14,14,14,0.68)",
  color: "#d9c7a5",
  textDecoration: "none",
  fontFamily: "Arial, sans-serif",
  fontWeight: 700,
  fontSize: "13px",
};