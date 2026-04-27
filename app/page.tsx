"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import CartButton from "./components/CartButton";
import AddToCartButton from "./components/AddToCartButton";

export default function Page() {
  const [isAdultConfirmed, setIsAdultConfirmed] = useState(false);
  const [showRejected, setShowRejected] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedDrink, setSelectedDrink] = useState("pachacha");

  useEffect(() => {
    const verified = localStorage.getItem("ageVerified");

    if (verified === "true") {
      setIsAdultConfirmed(true);
      window.dispatchEvent(new Event("startGlobalMusic"));
    }

    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const handleAdultYes = () => {
    localStorage.setItem("ageVerified", "true");
    setShowRejected(false);
    setIsAdultConfirmed(true);
    window.dispatchEvent(new Event("startGlobalMusic"));
  };

  const handleAdultNo = () => {
    setShowRejected(true);
  };

  const bebidas = [
    {
      id: "pachacha",
      nome: "Pachacha",
      img: "/pachacha.png",
      href: "/pachacha",
      frase: "Original, sensível e irreverente.",
    },
    {
      id: "climax",
      nome: "Clímax",
      img: "/climax.png",
      href: "/climax",
      frase: "Intenso, vibrante e memorável.",
    },
    {
      id: "desejo",
      nome: "Desejo",
      img: "/desejo.png",
      href: "/desejo",
      frase: "Sedução, delicadeza e sofisticação.",
    },
    {
      id: "tantrico",
      nome: "Tântrico",
      img: "/tantrico.png",
      href: "/tantrico",
      frase: "Mistério, profundidade e exotismo.",
    },
    {
      id: "obsessao",
      nome: "Obsessão",
      img: "/obsessao.png",
      href: "/obsessao",
      frase: "Escuro, elegante e marcante.",
    },
    {
      id: "orgasmo",
      nome: "Orgasmo",
      img: "/orgasmo.png",
      href: "/orgasmo",
      frase: "O auge da experiência sensorial.",
    },
  ];

  const activeDrink = useMemo(
    () => bebidas.find((b) => b.id === selectedDrink) ?? bebidas[0],
    [selectedDrink]
  );

  return (
    <>
      {!isAdultConfirmed && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              'linear-gradient(rgba(4,4,4,0.88), rgba(4,4,4,0.95)), url("/fundo-luxo.png") center/cover no-repeat',
            padding: "20px",
          }}
        >
          <div
            style={{
              position: "relative",
              zIndex: 2,
              width: "100%",
              maxWidth: "760px",
              padding: isMobile ? "38px 22px" : "54px 42px",
              borderRadius: "28px",
              background: "rgba(8,8,8,0.70)",
              border: "1px solid rgba(214,197,160,0.14)",
              boxShadow: "0 0 36px rgba(0,0,0,0.34)",
              textAlign: "center",
              color: "#f2ede5",
              backdropFilter: "blur(10px)",
            }}
          >
            <img
              src="/logo.png"
              alt="Vem T'Aki"
              style={{
                width: isMobile ? "78px" : "96px",
                display: "block",
                margin: "0 auto 18px",
                opacity: 0.95,
              }}
            />

            <div
              style={{
                fontFamily: "Arial, sans-serif",
                fontSize: "11px",
                letterSpacing: "0.34em",
                textTransform: "uppercase",
                color: "#c9b286",
                marginBottom: "14px",
              }}
            >
              Entrada reservada
            </div>

            <h1
              style={{
                margin: "0 0 12px",
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: isMobile ? "40px" : "58px",
                lineHeight: 1,
                fontWeight: 400,
                color: "#efe4cf",
              }}
            >
              Atreves-te?
            </h1>

            <p
              style={{
                margin: 0,
                fontFamily: "Arial, sans-serif",
                fontSize: isMobile ? "18px" : "22px",
                lineHeight: 1.7,
                color: "rgba(242,237,229,0.80)",
              }}
            >
              Tens mais de 18 anos?
            </p>

            {!showRejected ? (
              <div
                style={{
                  marginTop: "30px",
                  display: "flex",
                  justifyContent: "center",
                  gap: "14px",
                  flexWrap: "wrap",
                }}
              >
                <button onClick={handleAdultYes} style={primaryBtn}>
                  Sim
                </button>
                <button onClick={handleAdultNo} style={secondaryBtn}>
                  Não
                </button>
              </div>
            ) : (
              <div
                style={{
                  marginTop: "24px",
                  padding: "18px",
                  borderRadius: "18px",
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontFamily: "Arial, sans-serif",
                    fontSize: "15px",
                    lineHeight: 1.8,
                    color: "rgba(242,237,229,0.76)",
                  }}
                >
                  O acesso a este universo é reservado a maiores de 18 anos.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {isAdultConfirmed && (
        <main
          style={{
            minHeight: "100vh",
            background:
              'linear-gradient(180deg, rgba(5,5,5,0.96) 0%, rgba(4,4,4,0.98) 100%), url("/fundo-luxo.png") center/cover no-repeat',
            color: "#f2ede5",
          }}
        >
          <header
            style={{
              position: "sticky",
              top: 0,
              zIndex: 50,
              borderBottom: "1px solid rgba(214,197,160,0.16)",
              background: "rgba(8,8,8,0.38)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div
              style={{
                maxWidth: "1440px",
                margin: "0 auto",
                padding: isMobile ? "14px 16px" : "18px 28px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "18px",
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <img
                  src="/logo.png"
                  alt="Vem T'Aki"
                  style={{ width: isMobile ? "42px" : "54px", opacity: 0.95 }}
                />

                <div>
                  <div
                    style={{
                      fontFamily: "Arial, sans-serif",
                      fontSize: "11px",
                      letterSpacing: "0.30em",
                      textTransform: "uppercase",
                      color: "#c9b286",
                      marginBottom: "3px",
                    }}
                  >
                    Coleção de autor
                  </div>

                  <div
                    style={{
                      fontFamily: 'Georgia, "Times New Roman", serif',
                      fontSize: isMobile ? "24px" : "28px",
                      color: "#f0e3cb",
                      lineHeight: 1,
                    }}
                  >
                    Vem T'Aki
                  </div>
                </div>
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
                <CartButton />
                <Link href="/encomendas" style={topActionBtn}>
                  Encomendar
                </Link>
              </div>
            </div>
          </header>

          <section
            style={{
              position: "relative",
              minHeight: isMobile ? "56vh" : "92vh",
              overflow: "hidden",
              borderBottom: "1px solid rgba(214,197,160,0.10)",
            }}
          >
            <video
  src="/marca.mp4"
  autoPlay
  muted
  playsInline
  poster="/fundo-luxo.png"
  onEnded={(e) => e.currentTarget.pause()}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />

            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(rgba(6,6,6,0.35), rgba(6,6,6,0.62))",
              }}
            />

            <div
              style={{
                position: "relative",
                zIndex: 2,
                maxWidth: "1440px",
                margin: "0 auto",
                minHeight: isMobile ? "56vh" : "92vh",
                padding: isMobile ? "22px 16px 22px" : "48px 34px 40px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  maxWidth: isMobile ? "100%" : "580px",
                  marginTop: isMobile ? "20px" : "90px",
                }}
              >
                <div style={eyebrow}>Assinatura sensorial</div>

                <h1
                  style={{
                    margin: "0 0 16px",
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    fontSize: isMobile ? "44px" : "86px",
                    lineHeight: isMobile ? 0.96 : 0.92,
                    fontWeight: 400,
                    color: "#f5ecdd",
                  }}
                >
                  O sabor
                  <br />
                  como
                  <br />
                  memória.
                </h1>

                <p
                  style={{
                    margin: 0,
                    maxWidth: "520px",
                    fontFamily: "Arial, sans-serif",
                    fontSize: isMobile ? "15px" : "19px",
                    lineHeight: 1.8,
                    color: "rgba(242,237,229,0.82)",
                  }}
                >
                  Cada criação Vem T'Aki nasce da procura por intensidade,
                  detalhe e emoção. Uma coleção pensada para transformar um
                  instante num ritual íntimo e memorável.
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: isMobile ? "center" : "flex-start",
                  marginTop: isMobile ? "20px" : "0",
                }}
              >
                <Link href="#colecao" style={heroBtn}>
                  Descobrir coleção
                </Link>
              </div>
            </div>
          </section>

          <section
            style={{
              maxWidth: "1440px",
              margin: "0 auto",
              padding: isMobile ? "24px 16px 10px" : "44px 28px 10px",
            }}
          >
            <div
              style={{
                maxWidth: "860px",
                margin: isMobile ? "0 auto" : "0",
                textAlign: isMobile ? "center" : "left",
              }}
            >
              <div style={eyebrow}>A essência da marca</div>

              <h2
                style={{
                  margin: "0 0 16px",
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  fontSize: isMobile ? "28px" : "54px",
                  lineHeight: 1,
                  fontWeight: 400,
                  color: "#ede1c8",
                }}
              >
                Feita com tempo,
                <br />
                intenção e carácter.
              </h2>

              <p style={sectionText(isMobile)}>
                A Vem T'Aki nasceu do desejo de criar mais do que bebidas:
                nasceu da vontade de criar presenças. Cada garrafa foi pensada
                para carregar identidade, atmosfera e um lado emocional que se
                revela no olhar, no gesto e na memória.
              </p>

              <p style={sectionText(isMobile)}>
                A nossa linguagem é feita de contraste, de sofisticação contida,
                de intensidade elegante. Procuramos equilíbrio entre visual,
                nome, cor e sensação — para que cada criação seja reconhecida
                não apenas pelo sabor, mas pela experiência que deixa.
              </p>
            </div>
          </section>

          <section
            id="colecao"
            style={{
              maxWidth: "1440px",
              margin: "0 auto",
              padding: isMobile ? "16px 16px 56px" : "38px 28px 100px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                justifyContent: isMobile ? "flex-start" : "center",
                marginBottom: "26px",
                overflowX: "auto",
                paddingBottom: "6px",
              }}
            >
                               
  {bebidas.map((bebida) => {
  const active = bebida.id === selectedDrink;

  return (
    <button
      key={bebida.id}
      onClick={() => setSelectedDrink(bebida.id)}
      style={{
        whiteSpace: "nowrap",
        borderRadius: "999px",
        padding: isMobile ? "12px 18px" : "14px 24px",
        border: active
          ? "1px solid rgba(229,214,186,0.26)"
          : "1px solid rgba(214,197,160,0.18)",
        background: active
          ? "linear-gradient(180deg, rgba(235,224,203,0.95), rgba(194,166,115,0.95))"
          : "rgba(14,14,14,0.46)",
        color: active ? "#18120a" : "#d8c6a5",
        fontFamily: "Arial, sans-serif",
        fontWeight: 700,
        fontSize: "14px",
        cursor: "pointer",
      }}
    >
      {bebida.nome}
    </button>
  );
})}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1.02fr 0.98fr",
                gap: isMobile ? "18px" : "28px",
                alignItems: "stretch",
              }}
            >
              <div
                style={{
                  position: "relative",
                  minHeight: isMobile ? "500px" : "760px",
                  borderRadius: "28px",
                  overflow: "hidden",
                  background:
                    "linear-gradient(180deg, rgba(10,10,10,0.75), rgba(8,8,8,0.92))",
                  border: "1px solid rgba(214,197,160,0.10)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "radial-gradient(circle at 50% 40%, rgba(215,188,138,0.10), transparent 28%), radial-gradient(circle at 50% 100%, rgba(255,255,255,0.03), transparent 35%)",
                  }}
                />

                <div
                  style={{
                    position: "relative",
                    zIndex: 2,
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: isMobile ? "28px 28px 105px" : "40px 40px 120px",
                  }}
                >
                  <img
                    src={activeDrink.img}
                    alt={activeDrink.nome}
                    style={{
                      width: isMobile ? "76%" : "68%",
                      maxHeight: isMobile ? "360px" : "620px",
                      objectFit: "contain",
                      filter: "drop-shadow(0 0 30px rgba(212,190,160,0.10))",
                    }}
                  />

                  <div
                    style={{
                      position: "absolute",
                      bottom: isMobile ? "22px" : "34px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      zIndex: 3,
                      width: isMobile ? "calc(100% - 32px)" : "auto",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <AddToCartButton
                      id={activeDrink.id}
                      nome={activeDrink.nome}
                      imagem={activeDrink.img}
                    />
                  </div>
                </div>
              </div>

              <div
                style={{
                  borderRadius: "28px",
                  background: "rgba(10,10,10,0.50)",
                  border: "1px solid rgba(214,197,160,0.10)",
                  padding: isMobile ? "24px 20px" : "40px 36px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={eyebrow}>Seleção Vem T'Aki</div>

                  <h3
                    style={{
                      margin: "0 0 14px",
                      fontFamily: 'Georgia, "Times New Roman", serif',
                      fontSize: isMobile ? "42px" : "64px",
                      lineHeight: 1,
                      fontWeight: 400,
                      color: "#efe4cf",
                    }}
                  >
                    {activeDrink.nome}
                  </h3>

                  <p
                    style={{
                      margin: "0 0 24px",
                      fontFamily: "Arial, sans-serif",
                      fontSize: isMobile ? "16px" : "18px",
                      lineHeight: 1.9,
                      color: "rgba(242,237,229,0.78)",
                      maxWidth: "520px",
                    }}
                  >
                    {activeDrink.frase}
                  </p>

                  <div style={{ display: "grid", gap: "14px", marginBottom: "24px" }}>
                    <div
                      style={{
                        padding: "18px",
                        borderRadius: "18px",
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(214,197,160,0.08)",
                      }}
                    >
                      <div style={smallLabel}>Preço unitário</div>
                      <div style={priceText}>15 €</div>
                    </div>

                    <div
                      style={{
                        padding: "18px",
                        borderRadius: "18px",
                        background:
                          "linear-gradient(180deg, rgba(235,224,203,0.08), rgba(194,166,115,0.08))",
                        border: "1px solid rgba(214,197,160,0.12)",
                      }}
                    >
                      <div style={smallLabel}>Pack recomendado</div>
                      <div style={priceText}>3 por 40 €</div>
                      <div
                        style={{
                          fontFamily: "Arial, sans-serif",
                          fontSize: "14px",
                          color: "#8fd19e",
                        }}
                      >
                        Poupa 5 € ao escolher o pack
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
  <AddToCartButton
    id={activeDrink.id}
    nome={activeDrink.nome}
    imagem={activeDrink.img}
  />

  <Link href={activeDrink.href} style={heroBtn}>
    Descobrir história
  </Link>

  <Link href="/encomendas" style={secondaryTopBtn}>
    Finalizar compra
  </Link>
</div>
</div>
</div>
</div>
</section>

          <section
            style={{
              maxWidth: "1100px",
              margin: "0 auto",
              padding: isMobile ? "0 16px 60px" : "0 28px 80px",
            }}
          >
            <div
              style={{
                marginTop: "40px",
                padding: "24px",
                borderRadius: "24px",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                border: "1px solid rgba(214,197,160,0.10)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "#c8ab78",
                  marginBottom: "12px",
                  fontFamily: "Arial, sans-serif",
                }}
              >
                A experiência continua
              </div>

              <p
                style={{
                  margin: "0 0 14px",
                  fontSize: "15px",
                  color: "rgba(242,237,229,0.72)",
                  fontFamily: "Arial, sans-serif",
                  lineHeight: 1.8,
                }}
              >
                Descubra bastidores, novas criações e momentos exclusivos.
              </p>

              <a
                href="https://instagram.com/vem_t_aki"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "14px 22px",
                  borderRadius: "999px",
                  border: "1px solid rgba(214,197,160,0.18)",
                  background: "rgba(20,14,10,0.45)",
                  color: "#efe4cf",
                  textDecoration: "none",
                  fontWeight: 700,
                  fontFamily: "Arial, sans-serif",
                }}
              >
                📸 @vem_t_aki
              </a>
            </div>
          </section>

          <footer
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              padding: isMobile ? "10px 16px 60px" : "10px 28px 80px",
            }}
          >
            <div
              style={{
                borderRadius: "28px",
                padding: isMobile ? "24px 20px" : "34px 30px",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                border: "1px solid rgba(214,197,160,0.10)",
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1.2fr 0.8fr 0.8fr",
                gap: "24px",
                alignItems: "start",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    marginBottom: "16px",
                  }}
                >
                  <img
                    src="/logo.png"
                    alt="Vem T'Aki"
                    style={{ width: isMobile ? "52px" : "60px", opacity: 0.95 }}
                  />

                  <div>
                    <div style={smallLabel}>Assinatura sensorial</div>
                    <div
                      style={{
                        fontFamily: 'Georgia, "Times New Roman", serif',
                        fontSize: isMobile ? "24px" : "28px",
                        color: "#efe4cf",
                        lineHeight: 1,
                      }}
                    >
                      Vem T'Aki
                    </div>
                  </div>
                </div>

                <p
                  style={{
                    margin: 0,
                    maxWidth: "420px",
                    fontFamily: "Arial, sans-serif",
                    fontSize: "15px",
                    lineHeight: 1.9,
                    color: "rgba(242,237,229,0.72)",
                  }}
                >
                  Uma coleção criada para transformar sabor, presença e emoção
                  numa memória inesquecível.
                </p>
              </div>

              <div>
                <div style={smallLabel}>Acompanhe-nos</div>

                <a
                  href="https://instagram.com/vem_t_aki"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "12px 18px",
                    borderRadius: "999px",
                    border: "1px solid rgba(214,197,160,0.18)",
                    background: "rgba(20,14,10,0.45)",
                    color: "#efe4cf",
                    textDecoration: "none",
                    fontWeight: 700,
                    fontFamily: "Arial, sans-serif",
                    marginBottom: "12px",
                  }}
                >
                  📸 @vem_t_aki
                </a>

                <div
                  style={{
                    fontFamily: "Arial, sans-serif",
                    fontSize: "14px",
                    color: "rgba(242,237,229,0.62)",
                    lineHeight: 1.8,
                  }}
                >
                  Descubra bastidores, novas criações e momentos exclusivos.
                </div>
              </div>

              <div>
                <div style={smallLabel}>Informação</div>

                <div style={{ display: "grid", gap: "10px" }}>
                  <Link href="/privacidade" style={footerLink}>
                    Política de Privacidade
                  </Link>
                  <Link href="/cookies" style={footerLink}>
                    Política de Cookies
                  </Link>
                  <Link href="/termos" style={footerLink}>
                    Termos e Condições
                  </Link>
                  <Link href="/entregas" style={footerLink}>
                    Entregas e Devoluções
                  </Link>
                  <Link href="/encomendas" style={footerLink}>
                    Encomendar
                  </Link>
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: "18px",
                textAlign: "center",
                fontFamily: "Arial, sans-serif",
                fontSize: "12px",
                color: "rgba(242,237,229,0.44)",
                letterSpacing: "0.05em",
              }}
            >
              © {new Date().getFullYear()} Vem T'Aki • Venda exclusiva para
              maiores de 18 anos
            </div>
          </footer>
        </main>
      )}
    </>
  );
}

const eyebrow: React.CSSProperties = {
  fontFamily: "Arial, sans-serif",
  fontSize: "11px",
  letterSpacing: "0.30em",
  textTransform: "uppercase",
  color: "#c9b286",
  marginBottom: "16px",
};

const smallLabel: React.CSSProperties = {
  fontFamily: "Arial, sans-serif",
  fontSize: "12px",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "#c7b087",
  marginBottom: "6px",
};

const priceText: React.CSSProperties = {
  fontFamily: 'Georgia, "Times New Roman", serif',
  fontSize: "30px",
  color: "#efe4cf",
};

const footerLink: React.CSSProperties = {
  color: "#d9c7a5",
  textDecoration: "none",
  fontFamily: "Arial, sans-serif",
  fontSize: "14px",
};

const sectionText = (isMobile: boolean): React.CSSProperties => ({
  margin: "0 0 14px",
  fontFamily: "Arial, sans-serif",
  fontSize: isMobile ? "14px" : "17px",
  lineHeight: isMobile ? 1.75 : 1.95,
  color: "rgba(242,237,229,0.76)",
});

const topActionBtn: React.CSSProperties = {
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

const heroBtn: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "999px",
  padding: "14px 24px",
  border: "1px solid rgba(229,214,186,0.24)",
  background: "linear-gradient(180deg, #eadfc8, #c5a96e)",
  color: "#17110a",
  textDecoration: "none",
  fontFamily: "Arial, sans-serif",
  fontWeight: 700,
};

const secondaryTopBtn: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "999px",
  padding: "14px 24px",
  border: "1px solid rgba(214,197,160,0.18)",
  background: "rgba(14,14,14,0.46)",
  color: "#d9c7a5",
  textDecoration: "none",
  fontFamily: "Arial, sans-serif",
  fontWeight: 700,
};

const primaryBtn: React.CSSProperties = {
  minWidth: "160px",
  borderRadius: "999px",
  padding: "15px 24px",
  border: "1px solid rgba(214,197,160,0.18)",
  fontFamily: "Arial, sans-serif",
  fontWeight: 700,
  fontSize: "15px",
  cursor: "pointer",
  background: "linear-gradient(180deg, #eadfc8, #c5a96e)",
  color: "#17110a",
};

const secondaryBtn: React.CSSProperties = {
  minWidth: "160px",
  borderRadius: "999px",
  padding: "15px 24px",
  border: "1px solid rgba(214,197,160,0.18)",
  fontFamily: "Arial, sans-serif",
  fontWeight: 700,
  fontSize: "15px",
  cursor: "pointer",
  background: "rgba(14,14,14,0.46)",
  color: "#d9c7a5",
};