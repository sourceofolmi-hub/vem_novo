"use client";

import { useMemo, useState, useEffect } from "react";
import { useCart } from "../components/CartContext";

export default function Page() {
  const { items, totalItems, totalPrice, totalSavings } = useCart();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [morada, setMorada] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedMarketing, setAcceptedMarketing] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const resumo = useMemo(() => {
    return items.map((item) => `- ${item.nome} x${item.quantidade}`).join("\n");
  }, [items]);

  const validar = () => {
    if (items.length === 0) {
      alert("O carrinho está vazio.");
      return false;
    }

    if (!nome.trim() || !email.trim() || !telefone.trim() || !morada.trim()) {
      alert("Preencha nome, email, telefone e morada.");
      return false;
    }

    if (!acceptedTerms) {
      alert("Tem de aceitar os termos para continuar.");
      return false;
    }

    return true;
  };

  const irParaPagamento = async () => {
    if (!validar()) return;

    try {
      setLoading(true);

      const consentTimestamp = new Date().toISOString();
      const termsVersion = "v1.0";

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          email,
          telefone,
          morada,
          observacoes,
          items,
          acceptedTerms,
          acceptedMarketing,
          consentTimestamp,
          termsVersion,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        console.error("Resposta /api/checkout:", data);
        alert(data.error || "Erro ao iniciar pagamento.");
        return;
      }

      window.location.href = data.url;
    } catch (error: any) {
      console.error("Erro pagamento frontend:", error?.message || error, error);
      alert(error?.message || "Não foi possível iniciar o pagamento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          'linear-gradient(180deg, rgba(5,5,5,0.96) 0%, rgba(4,4,4,0.98) 100%), url("/fundo-luxo.png") center/cover no-repeat',
        color: "#f2ede5",
      }}
    >
      <section
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: isMobile ? "24px 16px 40px" : "34px 28px 56px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "center",
            gap: "16px",
            flexDirection: isMobile ? "column" : "row",
            marginBottom: isMobile ? "20px" : "28px",
          }}
        >
          <a href="/carrinho" style={backBtn}>
            ← Voltar ao carrinho
          </a>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <img
              src="/logo.png"
              alt="Vem T'Aki"
              style={{
                width: isMobile ? "42px" : "48px",
                opacity: 0.92,
              }}
            />
            <div>
              <div style={eyebrowMini}>Pagamento seguro</div>
              <div style={brandTitle}>Vem T'Aki</div>
            </div>
          </div>
        </div>

        <div
          style={{
            maxWidth: "860px",
            marginBottom: isMobile ? "24px" : "34px",
          }}
        >
          <div style={eyebrow}>Finalização da encomenda</div>

          <h1
            style={{
              margin: "0 0 14px",
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: isMobile ? "42px" : "64px",
              lineHeight: 1,
              fontWeight: 400,
              color: "#efe4cf",
            }}
          >
            Um último passo
            <br />
            antes da experiência.
          </h1>

          <p
            style={{
              margin: 0,
              maxWidth: "760px",
              fontFamily: "Arial, sans-serif",
              fontSize: isMobile ? "15px" : "17px",
              lineHeight: 1.95,
              color: "rgba(242,237,229,0.76)",
            }}
          >
            Preencha os seus dados para concluir a encomenda com toda a
            segurança. O pagamento será processado pela Stripe e receberá uma
            confirmação automática após a compra.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.08fr 0.92fr",
            gap: isMobile ? "18px" : "26px",
            alignItems: "start",
          }}
        >
          <div style={panel}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
                marginBottom: "20px",
                flexWrap: "wrap",
              }}
            >
              <h2 style={sectionTitle(isMobile)}>Os seus dados</h2>

              <div style={tag}>
                <span style={tagDot} />
                Checkout protegido
              </div>
            </div>

            <div style={fieldWrap}>
              <label style={labelStyle}>Nome completo</label>
              <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                style={inputStyle}
                placeholder="O seu nome"
              />
            </div>

            <div style={fieldWrap}>
              <label style={labelStyle}>Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
                placeholder="exemplo@email.com"
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr",
                gap: "16px",
              }}
            >
              <div style={fieldWrap}>
                <label style={labelStyle}>Telefone</label>
                <input
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  style={inputStyle}
                  placeholder="912345678"
                />
              </div>
            </div>

            <div style={fieldWrap}>
              <label style={labelStyle}>Morada</label>
              <textarea
                value={morada}
                onChange={(e) => setMorada(e.target.value)}
                style={{
                  ...inputStyle,
                  minHeight: "110px",
                  resize: "vertical",
                }}
                placeholder="Indique a morada de entrega"
              />
            </div>

            <div style={fieldWrap}>
              <label style={labelStyle}>Observações</label>
              <textarea
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                style={{
                  ...inputStyle,
                  minHeight: "110px",
                  resize: "vertical",
                }}
                placeholder="Alguma nota adicional para a encomenda"
              />
            </div>

            <div
              style={{
                marginTop: "16px",
                display: "grid",
                gap: "12px",
                padding: isMobile ? "18px 16px" : "20px 18px",
                borderRadius: "20px",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(214,197,160,0.08)",
              }}
            >
              <label style={checkboxRow}>
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                />
                <span>
                  Li e aceito a{" "}
                  <a href="/privacidade">Política de Privacidade</a> e os{" "}
                  <a href="/termos">Termos e Condições</a>.
                </span>
              </label>

              <label style={checkboxRow}>
                <input
                  type="checkbox"
                  checked={acceptedMarketing}
                  onChange={(e) => setAcceptedMarketing(e.target.checked)}
                />
                <span>
                  Aceito receber comunicações promocionais (opcional).
                </span>
              </label>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gap: "18px",
            }}
          >
            <div style={panel}>
              <h2 style={sectionTitle(isMobile)}>Resumo da encomenda</h2>

              {items.length === 0 ? (
                <p style={textStyle}>O carrinho está vazio.</p>
              ) : (
                <>
                  <div
                    style={{
                      display: "grid",
                      gap: "12px",
                      marginBottom: "18px",
                    }}
                  >
                    {items.map((item) => (
                      <div
                        key={item.id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: "12px",
                          paddingBottom: "12px",
                          borderBottom: "1px solid rgba(214,197,160,0.08)",
                        }}
                      >
                        <span style={textStyle}>{item.nome}</span>
                        <span style={textStyle}>x{item.quantidade}</span>
                      </div>
                    ))}
                  </div>

                  <div style={summaryBox}>
                    <div style={summaryRow}>
                      <span style={summaryLabel}>Total de unidades</span>
                      <span style={summaryValue}>{totalItems}</span>
                    </div>

                    <div style={summaryRow}>
                      <span style={summaryLabel}>Total</span>
                      <span
                        style={{
                          ...summaryValue,
                          fontSize: isMobile ? "26px" : "30px",
                          color: "#efe4cf",
                        }}
                      >
                        {totalPrice} €
                      </span>
                    </div>

                    {totalSavings > 0 && (
                      <div
                        style={{
                          marginTop: "8px",
                          fontFamily: "Arial, sans-serif",
                          fontSize: "14px",
                          color: "#8fd19e",
                        }}
                      >
                        Está a poupar {totalSavings} €
                      </div>
                    )}
                  </div>

                  <pre
                    style={{
                      whiteSpace: "pre-wrap",
                      margin: "18px 0 0",
                      fontFamily: "Arial, sans-serif",
                      fontSize: "14px",
                      lineHeight: 1.8,
                      color: "rgba(242,237,229,0.66)",
                      background: "rgba(255,255,255,0.02)",
                      padding: "14px",
                      borderRadius: "16px",
                      border: "1px solid rgba(214,197,160,0.08)",
                    }}
                  >
                    {resumo}
                  </pre>
                </>
              )}
            </div>

            <div style={panel}>
              <h2 style={sectionTitle(isMobile)}>Confiança e segurança</h2>

              <div
                style={{
                  display: "grid",
                  gap: "14px",
                }}
              >
                <div style={featureRow}>
                  <span style={featureIcon}>✓</span>
                  <span style={featureText}>
                    Pagamento processado pela Stripe
                  </span>
                </div>

                <div style={featureRow}>
                  <span style={featureIcon}>✓</span>
                  <span style={featureText}>
                    Confirmação automática após compra
                  </span>
                </div>

                <div style={featureRow}>
                  <span style={featureIcon}>✓</span>
                  <span style={featureText}>
                    Dados protegidos e tratamento seguro
                  </span>
                </div>
              </div>

              <p
                style={{
                  marginTop: "18px",
                  fontSize: "13px",
                  lineHeight: 1.8,
                  color: "#cfc5b3",
                  fontFamily: "Arial, sans-serif",
                }}
              >
                Ao prosseguir, será redirecionado para um ambiente de pagamento
                seguro. Após confirmação, receberá um email com o resumo da sua
                encomenda.
              </p>

              <button
                onClick={irParaPagamento}
                style={checkoutBtn}
                disabled={loading}
              >
                {loading ? "A preparar pagamento..." : "Pagar com Stripe"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

const panel: React.CSSProperties = {
  borderRadius: "28px",
  padding: "24px",
  background: "rgba(10,10,10,0.50)",
  border: "1px solid rgba(214,197,160,0.10)",
  boxShadow: "0 0 18px rgba(0,0,0,0.16)",
};

const backBtn: React.CSSProperties = {
  borderRadius: "999px",
  padding: "12px 18px",
  border: "1px solid rgba(214,197,160,0.18)",
  background: "rgba(14,14,14,0.46)",
  color: "#d9c7a5",
  textDecoration: "none",
  fontFamily: "Arial, sans-serif",
  fontWeight: 700,
  display: "inline-flex",
  alignItems: "center",
};

const eyebrowMini: React.CSSProperties = {
  fontFamily: "Arial, sans-serif",
  fontSize: "11px",
  letterSpacing: "0.24em",
  textTransform: "uppercase",
  color: "#c9b286",
  marginBottom: "4px",
};

const brandTitle: React.CSSProperties = {
  fontFamily: 'Georgia, "Times New Roman", serif',
  fontSize: "24px",
  color: "#efe4cf",
  lineHeight: 1,
};

const eyebrow: React.CSSProperties = {
  fontFamily: "Arial, sans-serif",
  fontSize: "11px",
  letterSpacing: "0.30em",
  textTransform: "uppercase",
  color: "#c9b286",
  marginBottom: "16px",
};

const sectionTitle = (isMobile: boolean): React.CSSProperties => ({
  margin: 0,
  fontFamily: 'Georgia, "Times New Roman", serif',
  fontSize: isMobile ? "28px" : "34px",
  lineHeight: 1,
  fontWeight: 400,
  color: "#efe4cf",
});

const tag: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: "8px 12px",
  borderRadius: "999px",
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(214,197,160,0.10)",
  color: "#d9c7a5",
  fontFamily: "Arial, sans-serif",
  fontSize: "12px",
  fontWeight: 700,
};

const tagDot: React.CSSProperties = {
  width: "8px",
  height: "8px",
  borderRadius: "999px",
  background: "#8fd19e",
  display: "inline-block",
};

const fieldWrap: React.CSSProperties = {
  display: "grid",
  gap: "8px",
  marginBottom: "16px",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "Arial, sans-serif",
  color: "rgba(242,237,229,0.76)",
  fontSize: "14px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  borderRadius: "18px",
  border: "1px solid rgba(214,197,160,0.12)",
  background: "rgba(255,255,255,0.03)",
  color: "#f2ede5",
  padding: "15px 16px",
  fontFamily: "Arial, sans-serif",
  fontSize: "15px",
  outline: "none",
};

const checkboxRow: React.CSSProperties = {
  display: "flex",
  gap: "10px",
  fontSize: "14px",
  lineHeight: 1.7,
  fontFamily: "Arial, sans-serif",
  color: "rgba(242,237,229,0.78)",
};

const textStyle: React.CSSProperties = {
  fontFamily: "Arial, sans-serif",
  color: "rgba(242,237,229,0.76)",
  fontSize: "15px",
};

const summaryBox: React.CSSProperties = {
  padding: "18px",
  borderRadius: "18px",
  background:
    "linear-gradient(180deg, rgba(235,224,203,0.06), rgba(194,166,115,0.06))",
  border: "1px solid rgba(214,197,160,0.10)",
};

const summaryRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
  marginBottom: "10px",
};

const summaryLabel: React.CSSProperties = {
  fontFamily: "Arial, sans-serif",
  fontSize: "14px",
  color: "#d3c4a6",
};

const summaryValue: React.CSSProperties = {
  fontFamily: 'Georgia, "Times New Roman", serif',
  fontSize: "22px",
  color: "#dbc39a",
};

const featureRow: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const featureIcon: React.CSSProperties = {
  width: "24px",
  height: "24px",
  borderRadius: "999px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(143,209,158,0.12)",
  color: "#8fd19e",
  fontWeight: 700,
  fontFamily: "Arial, sans-serif",
  flexShrink: 0,
};

const featureText: React.CSSProperties = {
  fontFamily: "Arial, sans-serif",
  fontSize: "14px",
  color: "rgba(242,237,229,0.78)",
  lineHeight: 1.7,
};

const checkoutBtn: React.CSSProperties = {
  width: "100%",
  marginTop: "18px",
  borderRadius: "999px",
  padding: "16px 24px",
  border: "1px solid rgba(214,197,160,0.18)",
  background: "linear-gradient(180deg, #eadfc8, #c5a96e)",
  color: "#17110a",
  fontWeight: 700,
  cursor: "pointer",
  fontFamily: "Arial, sans-serif",
  fontSize: "15px",
};
