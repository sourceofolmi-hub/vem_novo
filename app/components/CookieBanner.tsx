"use client";

import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = window.localStorage.getItem("vemtaki-cookie-consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    window.localStorage.setItem("vemtaki-cookie-consent", "accepted");
    setVisible(false);
  };

  const rejectCookies = () => {
    window.localStorage.setItem("vemtaki-cookie-consent", "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        left: "16px",
        right: "16px",
        bottom: "16px",
        zIndex: 999999,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "980px",
          borderRadius: "24px",
          padding: "20px",
          background: "rgba(8,8,8,0.94)",
          border: "1px solid rgba(214,197,160,0.14)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.35)",
          backdropFilter: "blur(12px)",
          color: "#f2ede5",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "16px",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "Arial, sans-serif",
                fontSize: "11px",
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "#c8ab78",
                marginBottom: "10px",
              }}
            >
              Cookies e privacidade
            </div>

            <p
              style={{
                margin: 0,
                fontFamily: "Arial, sans-serif",
                fontSize: "14px",
                lineHeight: 1.8,
                color: "rgba(242,237,229,0.80)",
              }}
            >
              Utilizamos cookies e armazenamento local para melhorar a sua
              experiência, manter funcionalidades essenciais do site e recordar
              preferências. Pode consultar os detalhes na nossa{" "}
              <a
                href="/cookies"
                style={{
                  color: "#efe4cf",
                  textDecoration: "underline",
                }}
              >
                Política de Cookies
              </a>{" "}
              e{" "}
              <a
                href="/privacidade"
                style={{
                  color: "#efe4cf",
                  textDecoration: "underline",
                }}
              >
                Política de Privacidade
              </a>
              .
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={acceptCookies}
              style={{
                borderRadius: "999px",
                padding: "12px 20px",
                border: "1px solid rgba(214,197,160,0.18)",
                background: "linear-gradient(180deg, #eadfc8, #c5a96e)",
                color: "#17110a",
                fontFamily: "Arial, sans-serif",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Aceitar
            </button>

            <button
              onClick={rejectCookies}
              style={{
                borderRadius: "999px",
                padding: "12px 20px",
                border: "1px solid rgba(214,197,160,0.18)",
                background: "rgba(14,14,14,0.46)",
                color: "#d9c7a5",
                fontFamily: "Arial, sans-serif",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Rejeitar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
