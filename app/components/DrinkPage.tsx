"use client";

import { useEffect, useState } from "react";

type DrinkPageProps = {
  nome: string;
  imagem: string;
  descricao1: string;
  descricao2: string;
  descricao3: string;
};

export default function DrinkPage({
  nome,
  imagem,
  descricao1,
  descricao2,
  descricao3,
}: DrinkPageProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          'linear-gradient(rgba(0, 0, 0, 0.86), rgba(0, 0, 0, 0.9)), url("/fundo-luxo.png") center/cover no-repeat',
        color: "#f2ede5",
        fontFamily: 'Georgia, "Times New Roman", serif',
      }}
    >
      <div
        style={{
          padding: "18px 24px",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <a
          href="/"
          style={{
            borderRadius: "999px",
            padding: "12px 18px",
            border: "1px solid rgba(200, 171, 120, 0.18)",
            background: "rgba(20, 14, 10, 0.45)",
            color: "#d4bea0",
            textDecoration: "none",
            fontFamily: "Arial, sans-serif",
            fontWeight: 700,
          }}
        >
          ← Voltar
        </a>
      </div>

      <section
        style={{
          minHeight: "calc(100vh - 76px)",
          maxWidth: "1450px",
          margin: "0 auto",
          padding: isMobile ? "10px 16px 30px" : "10px 24px 50px",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1.05fr 0.95fr",
          gap: isMobile ? "20px" : "30px",
          alignItems: "center",
        }}
      >
        <div
          style={{
            minHeight: isMobile ? "auto" : "76vh",
            borderRadius: "34px",
            background: "rgba(10, 10, 10, 0.36)",
            border: "1px solid rgba(200, 171, 120, 0.10)",
            backdropFilter: "blur(8px)",
            boxShadow: "0 0 30px rgba(0, 0, 0, 0.18)",
            padding: isMobile ? "18px" : "24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              color: "#c8ab78",
              textTransform: "uppercase",
              letterSpacing: "0.28em",
              fontSize: "12px",
              marginBottom: "16px",
              fontFamily: "Arial, sans-serif",
            }}
          >
            Coleção Vem T'Aki
          </div>

          <img
            src={imagem}
            alt={nome}
            style={{
              width: "100%",
              maxWidth: isMobile ? "300px" : "520px",
              maxHeight: isMobile ? "420px" : "72vh",
              objectFit: "contain",
              filter: "drop-shadow(0 0 18px rgba(200, 171, 120, 0.12))",
            }}
          />
        </div>

        <div
          style={{
            borderRadius: "34px",
            background: "rgba(10, 10, 10, 0.36)",
            border: "1px solid rgba(200, 171, 120, 0.10)",
            backdropFilter: "blur(8px)",
            boxShadow: "0 0 30px rgba(0, 0, 0, 0.18)",
            padding: isMobile ? "24px 20px" : "38px 34px",
          }}
        >
          <div
            style={{
              color: "#c8ab78",
              textTransform: "uppercase",
              letterSpacing: "0.28em",
              fontSize: "12px",
              marginBottom: "16px",
              fontFamily: "Arial, sans-serif",
            }}
          >
            História da criação
          </div>

          <h1
            style={{
              fontSize: isMobile ? "40px" : "58px",
              margin: "0 0 18px",
              color: "#dbc39a",
              lineHeight: 1,
            }}
          >
            {nome}
          </h1>

          <p
            style={{
              fontSize: isMobile ? "15px" : "17px",
              lineHeight: 1.95,
              color: "rgba(242, 237, 229, 0.76)",
              fontFamily: "Arial, sans-serif",
              marginBottom: "16px",
            }}
          >
            {descricao1}
          </p>

          <p
            style={{
              fontSize: isMobile ? "15px" : "17px",
              lineHeight: 1.95,
              color: "rgba(242, 237, 229, 0.76)",
              fontFamily: "Arial, sans-serif",
              marginBottom: "16px",
            }}
          >
            {descricao2}
          </p>

          <p
            style={{
              fontSize: isMobile ? "15px" : "17px",
              lineHeight: 1.95,
              color: "rgba(242, 237, 229, 0.76)",
              fontFamily: "Arial, sans-serif",
              marginBottom: 0,
            }}
          >
            {descricao3}
          </p>
        </div>
      </section>
    </main>
  );
}
