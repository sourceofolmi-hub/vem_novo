import Link from "next/link";
export default function Page() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          'linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.95)), url("/fundo-luxo.png") center/cover no-repeat',
        color: "#f2ede5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          maxWidth: "760px",
          width: "100%",
          padding: "40px 28px",
          borderRadius: "24px",
          background: "rgba(10,10,10,0.58)",
          border: "1px solid rgba(214,197,160,0.12)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: "11px",
            letterSpacing: "0.30em",
            textTransform: "uppercase",
            color: "#c9b286",
            marginBottom: "14px",
          }}
        >
          Pagamento confirmado
        </div>

        <h1
          style={{
            margin: "0 0 14px",
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: "52px",
            color: "#efe4cf",
            fontWeight: 400,
            lineHeight: 1,
          }}
        >
          Obrigado.
        </h1>

        <p
          style={{
            margin: "0 auto 22px",
            maxWidth: "620px",
            fontFamily: "Arial, sans-serif",
            fontSize: "17px",
            lineHeight: 1.9,
            color: "rgba(242,237,229,0.78)",
          }}
        >
          O seu pagamento foi confirmado com sucesso. Receberá um email com a
          confirmação da encomenda, e entraremos em contacto para acompanhar a entrega.
        </p>

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Link href="/" style={btnPrimary}>
            Voltar ao início
          </Link>

          <Link href="/carrinho" style={btnSecondary}>
            Ver carrinho
          </Link>
        </div>
      </div>
    </main>
  );
}

const btnPrimary: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "999px",
  padding: "14px 22px",
  border: "1px solid rgba(200,171,120,0.18)",
  background: "linear-gradient(180deg, #dbc39a, #b48f54)",
  color: "#120d08",
  textDecoration: "none",
  fontWeight: 700,
  fontFamily: "Arial, sans-serif",
};

const btnSecondary: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "999px",
  padding: "14px 22px",
  border: "1px solid rgba(214,197,160,0.18)",
  background: "rgba(14,14,14,0.46)",
  color: "#d9c7a5",
  textDecoration: "none",
  fontWeight: 700,
  fontFamily: "Arial, sans-serif",
};
