"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type CartItem = {
  id: string;
  nome: string;
  imagem: string;
  quantidade: number;
  preco: number;
};

export default function EncomendasPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    morada: "",
    codigoPostal: "",
    cidade: "",
    notas: "",
  });

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
  }, []);

  const subtotal = cart.reduce((s, i) => s + i.preco * i.quantidade, 0);
  const totalItems = cart.reduce((s, i) => s + i.quantidade, 0);
  const desconto = totalItems >= 3 ? 5 : 0;
  const total = subtotal - desconto;

  const updateQty = (id: string, delta: number) => {
    const next = cart.map((item) =>
      item.id === id
        ? { ...item, quantidade: Math.max(1, item.quantidade + delta) }
        : item
    );

    setCart(next);
    localStorage.setItem("cart", JSON.stringify(next));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeItem = (id: string) => {
    const next = cart.filter((item) => item.id !== id);
    setCart(next);
    localStorage.setItem("cart", JSON.stringify(next));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart, cliente: form }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
        return;
      }

      alert("Pedido registado. Entraremos em contacto para confirmar.");
    } catch {
      alert("Não foi possível finalizar a encomenda.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={page}>
      <header style={header}>
        <Link href="/" style={backLink}>← Continuar a comprar</Link>
        <div style={brand}>Vem T'Aki</div>
      </header>

      <section style={layout}>
        <div style={left}>
          <div style={steps}>
            <Step active={step >= 1} number="1" label="Carrinho" />
            <Step active={step >= 2} number="2" label="Entrega" />
            <Step active={step >= 3} number="3" label="Pagamento" />
          </div>

          {step === 1 && (
            <div style={card}>
              <h1 style={title}>O seu carrinho</h1>

              {cart.length === 0 ? (
                <div style={emptyBox}>
                  <p>O carrinho está vazio.</p>
                  <Link href="/" style={goldBtn}>Ver coleção</Link>
                </div>
              ) : (
                <>
                  {cart.map((item) => (
                    <div key={item.id} style={itemRow}>
                      <img src={item.imagem} alt={item.nome} style={itemImg} />

                      <div style={{ flex: 1 }}>
                        <div style={itemName}>{item.nome}</div>
                        <div style={muted}>Licor premium • 15 €</div>

                        <div style={itemControls}>
                          <div style={qtyBox}>
                            <button style={qtyBtn} onClick={() => updateQty(item.id, -1)}>−</button>
                            <strong>{item.quantidade}</strong>
                            <button style={qtyBtn} onClick={() => updateQty(item.id, 1)}>+</button>
                          </div>

                          <strong>{item.preco * item.quantidade} €</strong>
                        </div>

                        <button style={removeBtn} onClick={() => removeItem(item.id)}>
                          Remover
                        </button>
                      </div>
                    </div>
                  ))}

                  <button style={goldBtn} onClick={() => setStep(2)}>
                    Continuar para entrega
                  </button>
                </>
              )}
            </div>
          )}

          {step === 2 && (
            <div style={card}>
              <h1 style={title}>Dados de entrega</h1>

              <div style={formGrid}>
                <input style={input} placeholder="Nome completo" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
                <input style={input} placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <input style={input} placeholder="Telefone" value={form.telefone} onChange={(e) => setForm({ ...form, telefone: e.target.value })} />
                <input style={input} placeholder="Morada" value={form.morada} onChange={(e) => setForm({ ...form, morada: e.target.value })} />
                <input style={input} placeholder="Código postal" value={form.codigoPostal} onChange={(e) => setForm({ ...form, codigoPostal: e.target.value })} />
                <input style={input} placeholder="Cidade" value={form.cidade} onChange={(e) => setForm({ ...form, cidade: e.target.value })} />
              </div>

              <textarea
                style={{ ...input, minHeight: "110px", resize: "vertical" }}
                placeholder="Notas adicionais"
                value={form.notas}
                onChange={(e) => setForm({ ...form, notas: e.target.value })}
              />

              <div style={actions}>
                <button style={darkBtn} onClick={() => setStep(1)}>Voltar</button>
                <button style={goldBtn} onClick={() => setStep(3)}>Continuar para pagamento</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={card}>
              <h1 style={title}>Pagamento seguro</h1>

              <div style={paymentBox}>
                <div style={{ fontSize: "32px" }}>🔒</div>
                <div>
                  <strong>Checkout seguro</strong>
                  <p style={muted}>
                    A encomenda será processada com segurança. Confirma os dados antes de finalizar.
                  </p>
                </div>
              </div>

              <div style={actions}>
                <button style={darkBtn} onClick={() => setStep(2)}>Voltar</button>
                <button style={goldBtn} onClick={handleCheckout} disabled={loading}>
                  {loading ? "A processar..." : "Finalizar encomenda"}
                </button>
              </div>
            </div>
          )}
        </div>

        <aside style={summary}>
          <h2 style={summaryTitle}>Resumo</h2>

          <div style={summaryLine}>
            <span>Produtos</span>
            <strong>{totalItems}</strong>
          </div>

          <div style={summaryLine}>
            <span>Subtotal</span>
            <strong>{subtotal} €</strong>
          </div>

          <div style={summaryLine}>
            <span>Poupança pack</span>
            <strong style={{ color: "#d7b870" }}>−{desconto} €</strong>
          </div>

          <div style={totalLine}>
            <span>Total</span>
            <strong>{total} €</strong>
          </div>

          <div style={secureBox}>
            <strong>Experiência premium</strong>
            <p>Entrega acompanhada, pagamento seguro e confirmação personalizada.</p>
          </div>
        </aside>
      </section>
    </main>
  );
}

function Step({ active, number, label }: { active: boolean; number: string; label: string }) {
  return (
    <div style={{ ...stepItem, opacity: active ? 1 : 0.45 }}>
      <span style={stepCircle}>{number}</span>
      {label}
    </div>
  );
}

const page: React.CSSProperties = {
  minHeight: "100vh",
  background: "linear-gradient(180deg, #050505, #0b0b0b)",
  color: "#f2ede5",
  padding: "24px",
};

const header: React.CSSProperties = {
  maxWidth: "1200px",
  margin: "0 auto 28px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const backLink: React.CSSProperties = {
  color: "#d9c7a5",
  textDecoration: "none",
  fontWeight: 700,
};

const brand: React.CSSProperties = {
  fontFamily: 'Georgia, "Times New Roman", serif',
  fontSize: "28px",
  color: "#eadfc8",
};

const layout: React.CSSProperties = {
  maxWidth: "1200px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "1fr 380px",
  gap: "28px",
};

const left: React.CSSProperties = {
  display: "grid",
  gap: "18px",
};

const steps: React.CSSProperties = {
  display: "flex",
  gap: "14px",
  flexWrap: "wrap",
};

const stepItem: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  color: "#eadfc8",
  fontWeight: 800,
};

const stepCircle: React.CSSProperties = {
  width: "30px",
  height: "30px",
  borderRadius: "999px",
  background: "linear-gradient(180deg, #f5e6c8, #c5a96e)",
  color: "#17110a",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
};

const card: React.CSSProperties = {
  borderRadius: "28px",
  padding: "28px",
  background: "rgba(255,255,255,0.035)",
  border: "1px solid rgba(214,197,160,0.12)",
  boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
};

const title: React.CSSProperties = {
  margin: "0 0 22px",
  fontFamily: 'Georgia, "Times New Roman", serif',
  fontSize: "42px",
  fontWeight: 400,
  color: "#efe4cf",
};

const itemRow: React.CSSProperties = {
  display: "flex",
  gap: "18px",
  padding: "18px 0",
  borderBottom: "1px solid rgba(214,197,160,0.10)",
};

const itemImg: React.CSSProperties = {
  width: "86px",
  height: "110px",
  objectFit: "cover",
  borderRadius: "18px",
  background: "#111",
};

const itemName: React.CSSProperties = {
  fontSize: "18px",
  fontWeight: 900,
};

const muted: React.CSSProperties = {
  color: "rgba(242,237,229,0.62)",
  lineHeight: 1.6,
};

const itemControls: React.CSSProperties = {
  marginTop: "12px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const qtyBox: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const qtyBtn: React.CSSProperties = {
  width: "34px",
  height: "34px",
  borderRadius: "999px",
  border: "1px solid rgba(214,197,160,0.22)",
  background: "rgba(255,255,255,0.04)",
  color: "#eadfc8",
  cursor: "pointer",
};

const removeBtn: React.CSSProperties = {
  marginTop: "10px",
  background: "transparent",
  border: 0,
  color: "#c5a96e",
  cursor: "pointer",
};

const formGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "14px",
  marginBottom: "14px",
};

const input: React.CSSProperties = {
  width: "100%",
  padding: "15px 16px",
  borderRadius: "16px",
  border: "1px solid rgba(214,197,160,0.14)",
  background: "rgba(0,0,0,0.25)",
  color: "#f2ede5",
  outline: "none",
};

const actions: React.CSSProperties = {
  marginTop: "22px",
  display: "flex",
  justifyContent: "space-between",
  gap: "14px",
  flexWrap: "wrap",
};

const goldBtn: React.CSSProperties = {
  border: 0,
  borderRadius: "999px",
  padding: "15px 24px",
  background: "linear-gradient(180deg, #f5e6c8, #c5a96e)",
  color: "#17110a",
  fontWeight: 900,
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-flex",
  justifyContent: "center",
};

const darkBtn: React.CSSProperties = {
  borderRadius: "999px",
  padding: "15px 24px",
  border: "1px solid rgba(214,197,160,0.18)",
  background: "rgba(255,255,255,0.04)",
  color: "#eadfc8",
  fontWeight: 800,
  cursor: "pointer",
};

const summary: React.CSSProperties = {
  position: "sticky",
  top: "90px",
  height: "fit-content",
  borderRadius: "28px",
  padding: "24px",
  background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.025))",
  border: "1px solid rgba(214,197,160,0.14)",
};

const summaryTitle: React.CSSProperties = {
  margin: "0 0 20px",
  fontFamily: 'Georgia, "Times New Roman", serif',
  fontSize: "30px",
  fontWeight: 400,
};

const summaryLine: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "12px",
};

const totalLine: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "18px",
  paddingTop: "18px",
  borderTop: "1px solid rgba(214,197,160,0.12)",
  fontSize: "24px",
};

const secureBox: React.CSSProperties = {
  marginTop: "22px",
  padding: "16px",
  borderRadius: "18px",
  background: "rgba(197,169,110,0.08)",
  color: "#eadfc8",
};

const paymentBox: React.CSSProperties = {
  display: "flex",
  gap: "18px",
  padding: "20px",
  borderRadius: "20px",
  background: "rgba(255,255,255,0.035)",
  border: "1px solid rgba(214,197,160,0.12)",
};

const emptyBox: React.CSSProperties = {
  display: "grid",
  gap: "18px",
};