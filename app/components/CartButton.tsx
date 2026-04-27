"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CartButton() {
  const [count, setCount] = useState(0);
  const [pulse, setPulse] = useState(false);

  const updateCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const total = cart.reduce(
      (sum: number, item: any) => sum + (item.quantidade || 0),
      0
    );
    setCount(total);
setPulse(true);
setTimeout(() => setPulse(false), 500);
  };

  useEffect(() => {
    updateCount();
    window.addEventListener("cartUpdated", updateCount);
    return () => window.removeEventListener("cartUpdated", updateCount);
  }, []);

  return (
  <Link
    href="/encomendas"
    style={{
      ...cartBtn,
      transform: pulse ? "scale(1.06)" : "scale(1)",
      boxShadow: pulse
        ? "0 0 28px rgba(197,169,110,0.45)" : cartBtn.boxShadow,
    }}
  >
      Carrinho
    {count > 0 && (
  <span
    style={{
      ...badge,
      transform: pulse ? "scale(1.2)" : "scale(1)",
    }}
  >
    {count}
  </span>
)}
    </Link>
  );
}

const cartBtn: React.CSSProperties = {
  position: "relative",
  borderRadius: "999px",
  padding: "12px 20px",
  border: "1px solid rgba(214,197,160,0.22)",
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
  color: "#eadfc8",
  textDecoration: "none",
  fontFamily: "Arial, sans-serif",
  fontWeight: 800,
  letterSpacing: "0.03em",
  display: "inline-flex",
  alignItems: "center",
  gap: "10px",
};

const badge: React.CSSProperties = {
  minWidth: "24px",
  height: "24px",
  padding: "0 8px",
  borderRadius: "999px",
  background: "linear-gradient(180deg, #f5e6c8, #c5a96e)",
  color: "#17110a",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "12px",
  fontWeight: 900,
  boxShadow: "0 0 18px rgba(197,169,110,0.45)",
};