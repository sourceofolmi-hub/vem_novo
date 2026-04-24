"use client";

import { useEffect, useState } from "react";
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
        nome="Desejo"
        imagem="/desejo.png"
        descricao1="Desejo nasceu da emoção mais subtil e mais poderosa: aquela que atrai sem pedir, que envolve sem pressa e que permanece no silêncio da memória. É uma criação feita para representar a delicadeza da sedução, a beleza da presença e a intensidade do que se sente antes de se explicar."
        descricao2="Cada detalhe desta bebida foi pensado com sensibilidade, como uma homenagem ao fascínio, à elegância e à força do que toca de forma íntima. A sua luz, a sua imagem e a sua atmosfera convidam a uma experiência de requinte, proximidade e emoção."
        descricao3="Desejo é uma presença que não se impõe — conquista. E é precisamente nessa delicadeza que encontra a sua forma mais profunda de eternidade."
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
        <a href="/" style={backBtn}>
          ← Continuar a comprar
        </a>

        <CartButton />

        <AddToCartButton id="desejo" nome="Desejo" imagem="/desejo.png" />
      </div>
    </>
  );
}

const backBtn: React.CSSProperties = {
  borderRadius: "999px",
  padding: "14px 22px",
  border: "1px solid rgba(200,171,120,0.18)",
  background: "rgba(20,14,10,0.45)",
  color: "#d4bea0",
  textDecoration: "none",
  fontFamily: "Arial, sans-serif",
  fontWeight: 700,
  display: "inline-flex",
  alignItems: "center",
};