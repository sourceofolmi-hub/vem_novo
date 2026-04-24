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
        nome="Orgasmo"
        imagem="/orgasmo.png"
        descricao1="Orgasmo nasceu como a tradução do auge emocional, do instante máximo em que tudo se concentra: intensidade, desejo, beleza e entrega. É uma criação feita para celebrar o ponto mais alto da experiência sensorial."
        descricao2="Cada detalhe desta bebida é uma homenagem à coragem de sentir por inteiro. A sua presença foi pensada para provocar impacto, mas também para tocar de forma íntima, revelando uma energia que é ao mesmo tempo vibrante, luxuosa e profundamente memorável."
        descricao3="Orgasmo é a marca do instante absoluto — aquele que se vive uma vez, mas permanece como memória viva muito depois de ter passado."
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

        <AddToCartButton id="orgasmo" nome="Orgasmo" imagem="/orgasmo.png" />
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