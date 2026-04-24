"use client";

import { useEffect, useState } from "react";
import { useCart } from "../components/CartContext";

export default function Page() {
  const {
    items,
    increaseItem,
    decreaseItem,
    removeItem,
    clearCart,
    totalItems,
    totalPrice,
    totalSavings,
  } = useCart();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const faltaParaPack = totalItems % 3 === 0 ? 0 : 3 - (totalItems % 3);

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          'linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.95)), url("/fundo-luxo.png") center/cover no-repeat',
        color: "#f2ede5",
        padding: isMobile ? "24px 14px" : "40px 20px",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <a href="/" style={backLink}>
          ← Voltar e continuar a comprar
        </a>

        <div style={eyebrow}>Carrinho</div>

        <h1
          style={{
            fontSize: isMobile ? "36px" : "48px",
            margin: "0 0 24px",
            color: "#dbc39a",
            fontFamily: 'Georgia, "Times New Roman", serif',
          }}
        >
          A sua seleção
        </h1>

        {items.length === 0 ? (
          <div style={emptyBox}>
            <p style={emptyText}>O carrinho está vazio.</p>
          </div>
        ) : (
          <>
            <div
              style={{
                display: "grid",
                gap: "18px",
                marginBottom: "24px",
              }}
            >
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "120px 1fr auto",
                    gap: "18px",
                    alignItems: "center",
                    borderRadius: "24px",
                    padding: "20px",
                    background: "rgba(12,12,12,0.5)",
                    border: "1px solid rgba(200,171,120,0.12)",
                  }}
                >
                  <img
                    src={item.imagem}
                    alt={item.nome}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "contain",
                      justifySelf: "center",
                    }}
                  />

                  <div style={{ textAlign: isMobile ? "center" : "left" }}>
                    <h3
                      style={{
                        margin: "0 0 8px",
                        color: "#dbc39a",
                        fontSize: isMobile ? "24px" : "28px",
                        fontFamily: 'Georgia, "Times New Roman", serif',
                      }}
                    >
                      {item.nome}
                    </h3>

                    <p
                      style={{
                        margin: "0 0 6px",
                        fontFamily: "Arial, sans-serif",
                        color: "rgba(242,239,229,0.78)",
                      }}
                    >
                      Quantidade: {item.quantidade}
                    </p>

                    <p
                      style={{
                        margin: 0,
                        fontFamily: "Arial, sans-serif",
                        color: "#c8ab78",
                        fontSize: "14px",
                      }}
                    >
                      15€ / unidade • 3 por 40€
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      flexWrap: "wrap",
                      justifyContent: isMobile ? "center" : "flex-end",
                    }}
                  >
                    <button
                      onClick={() => decreaseItem(item.id)}
                      style={btnStyle}
                    >
                      -1
                    </button>

                    <button
                      onClick={() => increaseItem(item.id)}
                      style={btnStyle}
                    >
                      +1
                    </button>

                    <button
                      onClick={() => removeItem(item.id)}
                      style={dangerBtnStyle}
                    >
                      Remover
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                borderRadius: "24px",
                padding: "24px",
                background: "rgba(12,12,12,0.5)",
                border: "1px solid rgba(200,171,120,0.12)",
                display: "flex",
                justifyContent: "space-between",
                gap: "16px",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  textAlign: isMobile ? "center" : "left",
                  width: isMobile ? "100%" : "auto",
                }}
              >
                <div
                  style={{
                    color: "#dbc39a",
                    fontSize: isMobile ? "24px" : "28px",
                    marginBottom: "6px",
                    fontFamily: 'Georgia, "Times New Roman", serif',
                  }}
                >
                  Total de unidades: {totalItems}
                </div>

                <div
                  style={{
                    color: "#dbc39a",
                    fontSize: isMobile ? "26px" : "30px",
                    marginBottom: "6px",
                    fontFamily: 'Georgia, "Times New Roman", serif',
                  }}
                >
                  {totalPrice} €
                </div>

                {totalSavings > 0 && (
                  <div
                    style={{
                      color: "#8fd19e",
                      fontSize: "14px",
                      fontFamily: "Arial, sans-serif",
                      letterSpacing: "0.05em",
                      marginBottom: "6px",
                    }}
                  >
                    Está a poupar {totalSavings} €
                  </div>
                )}

                {faltaParaPack > 0 && (
                  <div
                    style={{
                      marginTop: "6px",
                      color: "#c8ab78",
                      fontSize: "13px",
                      fontFamily: "Arial, sans-serif",
                    }}
                  >
                    Adicione mais {faltaParaPack} para ativar pack de 40€
                  </div>
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                  justifyContent: isMobile ? "center" : "flex-end",
                  width: isMobile ? "100%" : "auto",
                }}
              >
                <button onClick={clearCart} style={dangerBtnStyle}>
                  Limpar carrinho
                </button>

                <a href="/encomendas" style={checkoutLinkStyle}>
                  Continuar encomenda
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

const eyebrow: React.CSSProperties = {
  color: "#c8ab78",
  textTransform: "uppercase",
  letterSpacing: "0.28em",
  fontSize: "12px",
  marginBottom: "14px",
  fontFamily: "Arial, sans-serif",
};

const backLink: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  marginBottom: "18px",
  borderRadius: "999px",
  padding: "12px 18px",
  border: "1px solid rgba(200,171,120,0.18)",
  background: "rgba(20,14,10,0.45)",
  color: "#d4bea0",
  textDecoration: "none",
  fontFamily: "Arial, sans-serif",
  fontWeight: 700,
};

const emptyBox: React.CSSProperties = {
  borderRadius: "24px",
  padding: "28px",
  background: "rgba(12,12,12,0.5)",
  border: "1px solid rgba(200,171,120,0.12)",
};

const emptyText: React.CSSProperties = {
  margin: 0,
  fontFamily: "Arial, sans-serif",
  color: "rgba(242,237,229,0.76)",
};

const btnStyle: React.CSSProperties = {
  borderRadius: "999px",
  padding: "10px 14px",
  border: "1px solid rgba(200,171,120,0.18)",
  background: "rgba(20,14,10,0.45)",
  color: "#d4bea0",
  fontWeight: 700,
  cursor: "pointer",
  fontFamily: "Arial, sans-serif",
};

const dangerBtnStyle: React.CSSProperties = {
  borderRadius: "999px",
  padding: "10px 14px",
  border: "1px solid rgba(150,100,100,0.22)",
  background: "rgba(40,10,10,0.35)",
  color: "#f0dcdc",
  fontWeight: 700,
  cursor: "pointer",
  fontFamily: "Arial, sans-serif",
};

const checkoutLinkStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "999px",
  padding: "14px 22px",
  border: "1px solid rgba(200,171,120,0.18)",
  background: "linear-gradient(180deg, #dbc39a, #b48f54)",
  color: "#120d08",
  fontWeight: 700,
  textDecoration: "none",
  fontFamily: "Arial, sans-serif",
};
