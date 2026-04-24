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
        nome="Clímax"
        imagem="/climax.png"
        descricao1="Clímax nasceu da vontade de traduzir o momento em que tudo se eleva: a emoção, a presença, a intensidade e a memória. É uma criação feita para representar o auge, o ponto em que o instante deixa de ser passageiro e se torna inesquecível."
        descricao2="Cada detalhe desta bebida foi construído como uma homenagem à força do sentir. A sua imagem intensa, a sua presença vibrante e a sua assinatura visual carregam a intenção de provocar impacto e de despertar uma ligação imediata com quem a contempla."
        descricao3="Clímax é a expressão da intensidade vivida por inteiro — uma criação para quem sabe reconhecer a beleza dos momentos que ficam gravados para sempre."
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

        <AddToCartButton id="climax" nome="Clímax" imagem="/climax.png" />
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