"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import DrinkPage from "../components/DrinkPage";
import AddToCartButton from "../components/AddToCartButton";
import CartButton from "../components/CartButton";

export default function Page() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      <DrinkPage
        nome="Tântrico"
        imagem="/tantrico.png"
        descricao1="Tântrico nasceu da procura por uma ligação mais profunda entre presença, energia e memória."
        descricao2="Nesta bebida existe uma homenagem ao mistério e à sensorialidade."
        descricao3="Tântrico é uma experiência que não se apressa."
      />

      <div
        style={{
          position: isMobile ? "static" : "fixed",
          bottom: isMobile ? undefined : "24px",
          right: isMobile ? undefined : "24px",
          zIndex: 100,
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: isMobile ? "24px" : undefined,
          padding: isMobile ? "0 16px 20px" : undefined,
        }}
      >
        <Link href="/" style={backBtn}>
          ← Continuar a comprar
        </Link>

        <CartButton />

        <AddToCartButton
          id="tantrico"
          nome="Tântrico"
          imagem="/tantrico.png"
        />
      </div>
    </>
  );
}

const backBtn: CSSProperties = {
  borderRadius: "999px",
  padding: "14px 22px",
  border: "1px solid rgba(200,171,120,0.18)",
  background: "rgba(20,14,10,0.45)",
  color: "#d4bea0",
  textDecoration: "none",
  fontWeight: 700,
  display: "inline-flex",
  alignItems: "center",
};
