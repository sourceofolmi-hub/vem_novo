"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import CartButton from "./components/CartButton";
import AddToCartButton from "./components/AddToCartButton";

type Gama = "Intensa" | "Mistério" | "Sensual" | "Vício";
type GamaFiltro = "Todas" | Gama;

type Bebida = {
  id: string;
  nome: string;
  gama: Gama;
  img: string;
  href: string;
  frase: string;
  notas: string;
  ritual: string;
  assinatura: string;
  cor: string;
};

const bebidas: Bebida[] = [
  {
    id: "pachacha",
    nome: "Pachacha",
    gama: "Sensual",
    img: "/pachacha.png",
    href: "/pachacha",
    frase: "Original, sensível e irreverente.",
    notas: "Fruta madura, doçura leve e final delicadamente provocador.",
    ritual: "Servir fresco, em copo elegante, como início de conversa.",
    assinatura: "A criação que abriu o universo Vem T'Aki.",
    cor: "#ff6b8f",
  },
  {
    id: "climax",
    nome: "Clímax",
    gama: "Intensa",
    img: "/climax.png",
    href: "/climax",
    frase: "Intenso, vibrante e memorável.",
    notas: "Frutos vermelhos, calor especiado e final prolongado.",
    ritual: "Perfeito para o ponto alto da noite.",
    assinatura: "Uma garrafa feita para marcar presença.",
    cor: "#d9412e",
  },
  {
    id: "desejo",
    nome: "Desejo",
    gama: "Sensual",
    img: "/desejo.png",
    href: "/desejo",
    frase: "Sedução, delicadeza e sofisticação.",
    notas: "Toque floral, doçura elegante e final suave.",
    ritual: "Servir lentamente, com luz baixa e música envolvente.",
    assinatura: "A garrafa mais delicada da linha sensual.",
    cor: "#e58aac",
  },
  {
    id: "tantrico",
    nome: "Tântrico",
    gama: "Mistério",
    img: "/tantrico.png",
    href: "/tantrico",
    frase: "Mistério, profundidade e exotismo.",
    notas: "Especiarias doces, corpo aveludado e final quente.",
    ritual: "Criado para momentos reservados e experiências demoradas.",
    assinatura: "Uma presença ritualista, profunda e envolvente.",
    cor: "#7b4fe0",
  },
  {
    id: "obsessao",
    nome: "Obsessão",
    gama: "Vício",
    img: "/obsessao.png",
    href: "/obsessao",
    frase: "Escuro, elegante e marcante.",
    notas: "Notas densas, elegância escura e final persistente.",
    ritual: "Servir como peça central de uma mesa sofisticada.",
    assinatura: "Uma garrafa com magnetismo e poder visual.",
    cor: "#2e2a34",
  },
  {
    id: "orgasmo",
    nome: "Orgasmo",
    gama: "Intensa",
    img: "/orgasmo.png",
    href: "/orgasmo",
    frase: "O auge da experiência sensorial.",
    notas: "Explosão aromática, corpo sedoso e final memorável.",
    ritual: "Guardar para o momento que merece ser lembrado.",
    assinatura: "A criação mais celebratória da coleção.",
    cor: "#f04a3a",
  },
  {
    id: "fantasia",
    nome: "Fantasia",
    gama: "Mistério",
    img: "/fantasia.png",
    href: "/fantasia",
    frase: "Colorida, ousada e impossível de ignorar.",
    notas: "Brilho tropical, doçura vibrante e final exuberante.",
    ritual: "Para noites criativas, festas privadas e momentos fora do óbvio.",
    assinatura: "A garrafa mais visual e fantasiosa da coleção.",
    cor: "#c83bff",
  },
  {
    id: "luxuria",
    nome: "Luxúria",
    gama: "Sensual",
    img: "/luxuria.png",
    href: "/luxuria",
    frase: "Intensa, quente e irresistivelmente elegante.",
    notas: "Frutos vermelhos, calor especiado e final envolvente.",
    ritual: "Ideal para servir a dois, com luz baixa e presença.",
    assinatura: "Uma criação feita para despertar desejo.",
    cor: "#b91f1f",
  },
  {
    id: "veneno",
    nome: "Veneno",
    gama: "Mistério",
    img: "/veneno.png",
    href: "/veneno",
    frase: "Perigosa, verde e hipnótica.",
    notas: "Ervas doces, frescura misteriosa e final provocador.",
    ritual: "Servir bem fresco, como início de uma noite imprevisível.",
    assinatura: "Uma garrafa magnética, escura e viciante.",
    cor: "#91c933",
  },
  {
    id: "insonia",
    nome: "Insónia",
    gama: "Mistério",
    img: "/insonia.png",
    href: "/insonia",
    frase: "Noturna, profunda e magnética.",
    notas: "Ameixa escura, baunilha subtil e final envolvente.",
    ritual: "Para noites longas, conversas demoradas e ambientes íntimos.",
    assinatura: "Criada para quem não quer que a noite acabe.",
    cor: "#7b33d6",
  },
  {
    id: "prazer",
    nome: "Prazer",
    gama: "Sensual",
    img: "/prazer.png",
    href: "/prazer",
    frase: "Doce, rosa e sedutora.",
    notas: "Morango, creme suave e final delicado.",
    ritual: "Perfeita para brindar ao prazer simples e memorável.",
    assinatura: "A expressão mais suave e romântica da coleção.",
    cor: "#ff4f9a",
  },
  {
    id: "vertigem",
    nome: "Vertigem",
    gama: "Intensa",
    img: "/vertigem.png",
    href: "/vertigem",
    frase: "Escura, elegante e arrebatadora.",
    notas: "Cacau, especiarias negras e final profundo.",
    ritual: "Servir como peça central de uma noite intensa.",
    assinatura: "Uma garrafa com força, silêncio e impacto.",
    cor: "#a7a7a7",
  },
  {
    id: "tentacao",
    nome: "Tentação",
    gama: "Sensual",
    img: "/tentacao.png",
    href: "/tentacao",
    frase: "Quente, vermelha e provocante.",
    notas: "Cereja, canela e final envolvente.",
    ritual: "Criada para momentos de desejo e celebração.",
    assinatura: "A garrafa que convida ao primeiro gole.",
    cor: "#ff3a22",
  },
  {
    id: "delirio",
    nome: "Delírio",
    gama: "Vício",
    img: "/delirio.png",
    href: "/delirio",
    frase: "Azul, elétrica e viciante.",
    notas: "Fruta azul, frescura intensa e final luminoso.",
    ritual: "Servir gelada, em ambiente de festa e energia.",
    assinatura: "Uma criação feita para repetir.",
    cor: "#1976ff",
  },
  {
    id: "seducao",
    nome: "Sedução",
    gama: "Sensual",
    img: "/seducao.png",
    href: "/seducao",
    frase: "Vermelha, elegante e envolvente.",
    notas: "Frutos vermelhos, toque floral e final sedoso.",
    ritual: "Para momentos íntimos e brindes demorados.",
    assinatura: "A garrafa mais clássica da gama sensual.",
    cor: "#c91818",
  },
  {
    id: "extase",
    nome: "Êxtase",
    gama: "Intensa",
    img: "/extase.png",
    href: "/extase",
    frase: "Roxa, vibrante e explosiva.",
    notas: "Amora, especiarias doces e final energético.",
    ritual: "Para momentos altos, festas e noites memoráveis.",
    assinatura: "A garrafa do impacto máximo.",
    cor: "#8f34ff",
  },
];

const gamas: GamaFiltro[] = ["Todas", "Intensa", "Mistério", "Sensual", "Vício"];

export default function Page() {
  const [isAdultConfirmed, setIsAdultConfirmed] = useState(false);
  const [showRejected, setShowRejected] = useState(false);
  const [selectedGama, setSelectedGama] = useState<GamaFiltro>("Todas");
  const [selectedDrink, setSelectedDrink] = useState("pachacha");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const bebidasFiltradas = useMemo(
    () =>
      selectedGama === "Todas"
        ? bebidas
        : bebidas.filter((bebida) => bebida.gama === selectedGama),
    [selectedGama]
  );

  const activeDrink =
    bebidas.find((bebida) => bebida.id === selectedDrink) ?? bebidas[0];

  useEffect(() => {
    const verified = localStorage.getItem("ageVerified");

    if (verified === "true") {
      setIsAdultConfirmed(true);
      window.dispatchEvent(new Event("startGlobalMusic"));
    }
  }, []);

  useEffect(() => {
    if (!bebidasFiltradas.some((b) => b.id === selectedDrink)) {
      setSelectedDrink(bebidasFiltradas[0]?.id ?? "pachacha");
    }
  }, [bebidasFiltradas, selectedDrink]);

  const changeDrink = (id: string) => {
    if (id === selectedDrink || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
  setSelectedDrink(id);
  setTimeout(() => {
    setIsTransitioning(false);
  }, 120);
}, 220);
  };
  const prevDrink = () => {
    const index = bebidasFiltradas.findIndex((b) => b.id === selectedDrink);
    const prevIndex = index <= 0 ? bebidasFiltradas.length - 1 : index - 1;
    changeDrink(bebidasFiltradas[prevIndex].id);
  };

  const nextDrink = () => {
    const index = bebidasFiltradas.findIndex((b) => b.id === selectedDrink);
    const nextIndex = index < 0 ? 0 : (index + 1) % bebidasFiltradas.length;
    changeDrink(bebidasFiltradas[nextIndex].id);
  };

  useEffect(() => {
    if (!isAdultConfirmed || bebidasFiltradas.length < 2) return;
    const interval = setInterval(nextDrink, 6500);
    return () => clearInterval(interval);
  }, [isAdultConfirmed, selectedDrink, selectedGama]);

  const handleAdultYes = () => {
    localStorage.setItem("ageVerified", "true");
    setShowRejected(false);
    setIsAdultConfirmed(true);
    window.dispatchEvent(new Event("startGlobalMusic"));
  };

  const goHome = () => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: #050505;
        }
.menu-link {
  display: flex;
  align-items: center;
  gap: 18px;
  text-decoration: none !important;
  color: #e7d4ad !important;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 17px;
  margin: 12px 0;
  transition: all 0.25s ease;
}

.menu-link span {
  color: #c5a96e;
  font-size: 13px;
  letter-spacing: 0.12em;
}

.menu-link:hover {
  color: #ffffff !important;
  transform: translateX(8px);
}

/* remover azul default */
a {
  color: inherit;
  text-decoration: none;
}
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bottleFloat {
          0%,
          100% {
            transform: translateY(0) scale(1.02);
          }
          50% {
            transform: translateY(-14px) scale(1.055);
          }
        }

        @keyframes pulseGlow {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.95;
          }
        }

        @keyframes menuReveal {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.98);
            filter: blur(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        .fade-up {
          animation: fadeUp 900ms ease both;
        }

        .bottle-float {
          animation: bottleFloat 6s ease-in-out infinite;
        }

        .menu-reveal {
          animation: menuReveal 360ms cubic-bezier(0.2, 0.9, 0.2, 1) both;
        }

        .hover-lux {
          transition: transform 260ms ease, box-shadow 260ms ease,
            border-color 260ms ease, background 260ms ease;
        }

        .hover-lux:hover {
          transform: translateY(-3px);
          box-shadow: 0 24px 70px rgba(0, 0, 0, 0.38),
            0 0 28px rgba(197, 169, 110, 0.14);
          border-color: rgba(245, 230, 200, 0.28) !important;
        }

        .menu-link {
          transition: all 240ms ease;
        }

        .menu-link:hover {
          transform: translateX(5px);
          background: rgba(255, 255, 255, 0.06) !important;
          color: #fff3d9 !important;
        }

        .arrow-lux {
          transition: transform 220ms ease, background 220ms ease,
            box-shadow 220ms ease;
        }

        .arrow-lux:hover {
          transform: translateY(-50%) scale(1.08);
          background: rgba(245, 230, 200, 0.12) !important;
          box-shadow: 0 0 34px rgba(197, 169, 110, 0.22);
        }

        @media (max-width: 768px) {
          .menu-reveal {
            left: 16px !important;
            right: 16px !important;
            width: auto !important;
          }
        }
      `}</style>

      {!isAdultConfirmed && (
        <div className="ageGate">
          <div className="ageCard">
            <img src="/logo.png" alt="Vem T'Aki" className="ageLogo" />
            <div className="eyebrow">Entrada reservada</div>
            <h1 className="ageTitle">Atreves-te?</h1>
            <p className="ageText">Tens mais de 18 anos?</p>

            {!showRejected ? (
              <div className="ageActions">
                <button onClick={handleAdultYes} className="primaryBtn">
                  Sim
                </button>
                <button onClick={() => setShowRejected(true)} className="secondaryBtn">
                  Não
                </button>
              </div>
            ) : (
              <div className="rejectedBox">
                O acesso a este universo é reservado a maiores de 18 anos.
              </div>
            )}
          </div>
        </div>
      )}

      {isAdultConfirmed && (
        <main className="main">
          <header className="header">
            <div className="headerInner">
              <button onClick={goHome} className="brandBtn">
                <img src="/logo.png" alt="Vem T'Aki" className="brandLogo" />
                <div>
                  <div className="smallLabel">Coleção de autor</div>
                  <div className="brandName">Vem T'Aki</div>
                </div>
              </button>

              <div className="headerActions">
                <CartButton />
                <button
                  onClick={() => setMenuOpen((open) => !open)}
                  className="hamburgerBtn hover-lux"
                  aria-label="Abrir menu"
                >
                  ☰
                </button>
              </div>
            </div>

            {menuOpen && (
              <nav className="menuBox menu-reveal">
                <div className="menuTitle">Universo Vem T'Aki</div>
                <button onClick={goHome} className="menuItem menu-link">
                  <span>01</span> Início
                </button>
                <Link href="/gamas" onClick={() => setMenuOpen(false)} className="menuItem menu-link">
                  <span>02</span> Gamas
                </Link>
                <Link href="/garrafas" onClick={() => setMenuOpen(false)} className="menuItem menu-link">
                  <span>03</span> Garrafas
                </Link>
                <Link href="/packs" onClick={() => setMenuOpen(false)} className="menuItem menu-link">
                  <span>04</span> Packs
                </Link>
                <Link href="/historia" onClick={() => setMenuOpen(false)} className="menuItem menu-link">
                  <span>05</span> História
                </Link>
                <a
                  href="https://instagram.com/vem_t_aki"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="menuItem menu-link"
                >
                  <span>IG</span> Instagram
                </a>
              </nav>
            )}
          </header>

          <section className="hero">
  <div className="heroReveal">
    <img
      src="/garrafas-luxo.png"
      alt="Coleção Vem T'Aki"
      className="heroRevealImg"
    />
    <div className="heroRevealOverlay" />
  </div>

            <div className="heroInner">
              <div className="heroCopy fade-up">
                <div className="eyebrow">Licor premium · Coleção autoral</div>
                <h1 className="heroTitle">
                  O sabor
                  <br />
                  como desejo.
                </h1>
                <p className="heroText">
                  Uma coleção de licores premium criada em quatro gamas:
                  intensidade, mistério, sensualidade e vício visual.
                </p>
              </div>

              <Link href="/gamas" className="heroBtn hover-lux">
                Explorar gamas
              </Link>
            </div>
          </section>

          <section id="gamas" className="section gamasSection">
            <div className="sectionIntro">
              <div className="eyebrow">Quatro universos</div>
              <h2 className="sectionTitle">Escolhe a tua gama.</h2>
              <p className="sectionText">
                Cada gama foi pensada como um estado de espírito. Uma linguagem visual,
                aromática e emocional própria dentro do universo Vem T'Aki.
              </p>
            </div>

            <div className="gamasGrid">
              {gamas.map((gama) => (
                <button
                  key={gama}
                  onClick={() => setSelectedGama(gama)}
                  className={`gamaCard hover-lux ${selectedGama === gama ? "active" : ""}`}
                >
                  <div className="gamaName">{gama}</div>
                  <div className="gamaDescription">
                    {gama === "Todas" && "A coleção completa."}
                    {gama === "Intensa" && "Impacto, força e presença."}
                    {gama === "Mistério" && "Noite, magnetismo e profundidade."}
                    {gama === "Sensual" && "Desejo, suavidade e sedução."}
                    {gama === "Vício" && "Energia, repetição e prazer visual."}
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section id="colecao" className="section collection">
            <div className="drinkTabs">
              {bebidasFiltradas.map((bebida) => (
                <button
                  key={bebida.id}
                  onClick={() => changeDrink(bebida.id)}
                  className={`drinkTab hover-lux ${bebida.id === selectedDrink ? "active" : ""}`}
                >
                  {bebida.nome}
                </button>
              ))}
            </div>

            <div className="productGrid">
              <div
                className="bottleCard fade-up"
                style={{ boxShadow: `0 0 90px ${activeDrink.cor}22` }}
              >
                <div
                  className="bottleGlow"
                  style={{
                    background: `radial-gradient(circle at 50% 38%, ${activeDrink.cor}55, transparent 32%), radial-gradient(circle at 50% 100%, rgba(255,255,255,0.05), transparent 36%)`,
                  }}
                />

                <button onClick={prevDrink} className="arrowBtn arrowLeft arrow-lux" aria-label="Garrafa anterior">
                  ‹
                </button>

                <button onClick={nextDrink} className="arrowBtn arrowRight arrow-lux" aria-label="Garrafa seguinte">
                  ›
                </button>

                <div className="bottleStage">
                  <img
                    src={activeDrink.img}
                    alt={activeDrink.nome}
                    className="bottleImg bottle-float"
                    style={{
  opacity: isTransitioning ? 0.985 : 1,
  transform: isTransitioning
    ? "scale(1.008)"
    : "scale(1)",
}}
                  />
                </div>

                <div className="storyButtonWrap">
  <Link href={activeDrink.href} className="storyBtn">
    Descobrir a História
  </Link>
</div>
              </div>

              <div className="infoCard fade-up">
                <div className="eyebrow">{activeDrink.gama}</div>
                <h3 className="drinkTitle">{activeDrink.nome}</h3>
                <p className="drinkFrase">{activeDrink.frase}</p>

                <div className="luxuryGrid">
                  <div className="luxuryCard hover-lux">
                    <div className="smallLabel">Notas</div>
                    <p>{activeDrink.notas}</p>
                  </div>

                  <div className="luxuryCard hover-lux">
                    <div className="smallLabel">Ritual</div>
                    <p>{activeDrink.ritual}</p>
                  </div>

                  <div className="luxuryCard hover-lux">
                    <div className="smallLabel">Assinatura</div>
                    <p>{activeDrink.assinatura}</p>
                  </div>
                </div>

                <div className="purchaseGrid">
                  <div className="priceBox hover-lux">
                    <div className="smallLabel">Preço unitário</div>
                    <div className="priceRow">
                      <div className="priceText">15 €</div>
                      <AddToCartButton
                        id={activeDrink.id}
                        nome={activeDrink.nome}
                        imagem={activeDrink.img}
                      />
                    </div>
                  </div>

                  <div className="packHighlight hover-lux">
                    <div className="smallLabel">Pack recomendado</div>
                    <div className="priceText">3 por 40 €</div>
                    <div className="savingBadge">✨ Poupa 5 € ao escolher o pack</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="packs" className="section packsSection">
            <div className="eyebrow">Packs por gama</div>
            <h2 className="sectionTitle">Rituais preparados.</h2>
            <p className="sectionText">Packs criados para descobrir cada universo da coleção.</p>

            <div className="packsGrid">
              
{[
  {
    id: "pack-descoberta",
    nome: "Pack Descoberta",
    gama: "Descoberta",
    preco: 20,
    descricao: "3 sabores à escolha para descobrir a coleção.",
    oferta: "Oferta de Cartas da Sedução",
    imagem: "/packs/pack-descoberta.png",
  },
  {
    id: "pack-seducao",
    nome: "Pack Sedução",
    gama: "Sensual",
    preco: 20,
    descricao: "Uma seleção sensual para momentos especiais.",
    oferta: "Oferta de Pena Vermelha",
    imagem: "/packs/pack-seducao.png",
  },
  {
    id: "pack-intenso",
    nome: "Pack Intenso",
    gama: "Intensa",
    preco: 20,
    descricao: "Clímax, Orgasmo, Vertigem ou Êxtase.",
    oferta: "Oferta Surpresa",
    imagem: "/packs/pack-intenso.png",
  },
].map((pack) => (
  <div key={pack.id} className="packCard hover-lux">
    <img
      src={pack.imagem}
      alt={pack.nome}
      className="packPoster"
    />

    <div className="eyebrow">{pack.gama}</div>

    <h3>{pack.nome}</h3>

    <p>{pack.descricao}</p>

    <div className="priceText">
      {pack.preco} €
    </div>

    <div className="packOffer">
      🎁 {pack.oferta}
    </div>

    <div style={{ marginTop: 22 }}>
      <AddToCartButton
        id={pack.id}
        nome={pack.nome}
        imagem={pack.imagem}
      />
    </div>
  </div>
))}


            </div>
          </section>

          <section id="historia" className="section storySection">
            <div className="eyebrow">A essência da marca</div>
            <h2 className="sectionTitle">Feita com tempo, intenção e carácter.</h2>
            <p className="sectionText">
              A Vem T'Aki nasceu para criar mais do que bebidas: nasceu para criar presença.
              Cada garrafa é pensada como objeto de desejo, peça visual e experiência sensorial.
            </p>
          </section>

          <footer className="footer">
            <div className="footerBox">
              <button onClick={goHome} className="brandBtn">
                <img src="/logo.png" alt="Vem T'Aki" className="footerLogo" />
                <div>
                  <div className="smallLabel">Licor premium</div>
                  <div className="brandName">Vem T'Aki</div>
                </div>
              </button>

              <div className="footerLinks">
                <Link href="/privacidade">Privacidade</Link>
                <Link href="/cookies">Cookies</Link>
                <Link href="/termos">Termos</Link>
                <Link href="/entregas">Entregas</Link>
              </div>
            </div>

            <div className="copyright">
              © {new Date().getFullYear()} Vem T'Aki · Venda exclusiva para maiores de 18 anos
            </div>
          </footer>
        </main>
      )}

      <style jsx>{`
        .ageGate {
          position: fixed;
          inset: 0;
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
         background:
  linear-gradient(
    rgba(4, 4, 4, 0.72),
    rgba(4, 4, 4, 0.88)
  ),
  url("/garrafas-luxo.png")
  center center / cover
  no-repeat;
        }
.menu-link {
  display: block;
  text-decoration: none;
  color: #d4bea0;
  font-family: "Playfair Display", serif;
  font-size: 16px;
  margin: 8px 0;
  transition: 0.3s;
}

.menu-link span {
  color: #a88c5b;
  margin-right: 10px;
}

.menu-link:hover {
  color: #fff;
  transform: translateX(6px);
}

/* remove azul dos links */
a {
  text-decoration: none;
  color: inherit;
}
        .ageCard {
          width: 100%;
          max-width: 760px;
          padding: 54px 42px;
          border-radius: 28px;
          background: rgba(8, 8, 8, 0.7);
          border: 1px solid rgba(214, 197, 160, 0.14);
          box-shadow: 0 0 36px rgba(0, 0, 0, 0.34);
          text-align: center;
          color: #f2ede5;
          backdrop-filter: blur(10px);
        }

        .ageLogo {
          width: 96px;
          display: block;
          margin: 0 auto 18px;
          opacity: 0.95;
        }

        .ageTitle {
          margin: 0 0 12px;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 58px;
          line-height: 1;
          font-weight: 400;
          color: #efe4cf;
        }

        .ageText {
          margin: 0;
          font-family: Arial, sans-serif;
          font-size: 20px;
          line-height: 1.7;
          color: rgba(242, 237, 229, 0.8);
        }

        .ageActions {
          margin-top: 30px;
          display: flex;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .primaryBtn,
        .secondaryBtn {
          min-width: 160px;
          border-radius: 999px;
          padding: 15px 24px;
          border: 1px solid rgba(214, 197, 160, 0.18);
          font-family: Arial, sans-serif;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
        }

        .primaryBtn {
          background: linear-gradient(180deg, #eadfc8, #c5a96e);
          color: #17110a;
        }

        .secondaryBtn {
          background: rgba(14, 14, 14, 0.46);
          color: #d9c7a5;
        }

        .rejectedBox {
          margin-top: 24px;
          padding: 18px;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.03);
          color: rgba(242, 237, 229, 0.76);
        }

.main {
  position: relative;
  min-height: 100vh;

  background:
    linear-gradient(
      180deg,
      rgba(5,5,5,0.90),
      rgba(4,4,4,0.96)
    );

  overflow: hidden;
}

        .main::before {
  content: "";
  position: absolute;
  inset: 0;

  background:
    url("/garrafas-luxo.png")
    center center / 80%
    no-repeat;

  opacity: 0.16;

  z-index: 0;
  pointer-events: none;
opacity: 0;
  animation: luxuryReveal 2.5s ease forwards;  
}

.main > * {
  position: relative;
  z-index: 1;
}
@keyframes luxuryReveal {
  from {
    opacity: 0;
    transform: scale(1.06);
  }

  to {
    opacity: 0.14;
    transform: scale(1);
  }
      }  
  .main::after {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;

  background:
    radial-gradient(
      circle at 50% 20%,
      rgba(212,190,160,0.08),
      transparent 45%
    );

  mix-blend-mode: screen;
}

        .header {
          position: sticky;
          top: 0;
          z-index: 50;
          border-bottom: 1px solid rgba(214, 197, 160, 0.16);
          background: rgba(8, 8, 8, 0.56);
          backdrop-filter: blur(14px);
        }

        .headerInner {
          max-width: 1440px;
          margin: 0 auto;
          padding: 18px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
        }

        .brandBtn {
          display: flex;
          align-items: center;
          gap: 14px;
          background: transparent;
          border: none;
          padding: 0;
          cursor: pointer;
          text-align: left;
        }

        .brandLogo {
          width: 54px;
          opacity: 0.95;
        }

        .smallLabel {
          font-family: Arial, sans-serif;
          font-size: 15px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #c7b087;
          margin-bottom: 6px;
        }

        .brandName {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 28px;
          color: #f0e3cb;
          line-height: 1;
        }

        .headerActions {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .hamburgerBtn {
          width: 48px;
          height: 48px;
          border-radius: 999px;
          border: 1px solid rgba(214, 197, 160, 0.22);
          background: rgba(255, 255, 255, 0.035);
          color: #eadfc8;
          font-size: 28px;
          cursor: pointer;
          line-height: 1;
        }

        .menuBox {
          position: absolute;
          top: 82px;
          right: 28px;
          z-index: 80;
          width: 290px;
          padding: 14px;
          border-radius: 22px;
          background: linear-gradient(180deg, rgba(16, 14, 12, 0.96), rgba(6, 6, 6, 0.96));
          border: 1px solid rgba(214, 197, 160, 0.18);
          box-shadow: 0 28px 80px rgba(0, 0, 0, 0.45);
          display: grid;
          gap: 8px;
        }

        .menuTitle {
          padding: 6px 14px 12px;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 18px;
          color: #f3e7cf;
          border-bottom: 1px solid rgba(214, 197, 160, 0.12);
          margin-bottom: 6px;
        }

        .menuItem {
          padding: 13px 14px;
          border-radius: 14px;
          color: #eadfc8;
          text-decoration: none;
          font-family: Arial, sans-serif;
          font-weight: 700;
          background: transparent;
          border: none;
          cursor: pointer;
          text-align: left;
        }

        .menuItem span {
          display: inline-flex;
          min-width: 34px;
          font-size: 11px;
          letter-spacing: 0.12em;
          color: #c5a96e;
        }

        .hero {
          position: relative;
          min-height: 92vh;
          overflow: hidden;
          border-bottom: 1px solid rgba(214, 197, 160, 0.1);
        }

        .heroReveal,
.heroRevealOverlay {
  position: absolute;
  inset: 0;
}

.heroReveal {
  overflow: hidden;
}

.heroRevealImg {
  width: 100%;
  height: 100%;
  object-fit: contain;

  opacity: 0.85;

  filter:
    blur(2px)
    brightness(1.2)
    saturate(1.25);

  transform: scale(0.98);

  animation: luxuryReveal 5s
    cubic-bezier(.22,1,.36,1)
    forwards;
}

.heroRevealOverlay {
  background:
    linear-gradient(
      180deg,
      rgba(0,0,0,0.08),
      rgba(0,0,0,0.18)
    );
}

@keyframes luxuryReveal {
  0% {
    opacity: 0;
    filter:
      blur(20px)
      brightness(0.9)
      saturate(0.8);

    transform: scale(1.06);
  }

  100% {
    opacity: 0.85;
    filter:
      blur(2px)
      brightness(1.2)
      saturate(1.25);

    transform: scale(0.98);
  }
}
  100% {
    opacity: 1;
    filter:
      blur(10px)
      brightness(0.35)
      saturate(1.15);
    transform: scale(1.12);
  }
}

        .heroInner {
          position: relative;
          z-index: 2;
          max-width: 1440px;
          margin: 0 auto;
          min-height: 92vh;
          padding: 64px 34px 44px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .heroCopy {
          max-width: 660px;
          margin-top: 90px;
        }

        .eyebrow {
          font-family: Arial, sans-serif;
          font-size: 11px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #c9b286;
          margin-bottom: 16px;
        }

        .heroTitle {
          margin: 0 0 18px;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 96px;
          line-height: 0.9;
          font-weight: 400;
          color: #f5ecdd;
        }

        .heroText,
        .sectionText {
          margin: 0;
          max-width: 560px;
          font-family: Arial, sans-serif;
          font-size: 18px;
          line-height: 1.9;
          color: rgba(242, 237, 229, 0.78);
        }

       .heroBtn {
  width: fit-content;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 18px 42px;
  border-radius: 999px;
  background: linear-gradient(
    180deg,
    #f5e8c6 0%,
    #d4b26b 100%
  );
  color: #111;
  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.08em;

  box-shadow:
    0 12px 30px rgba(212,190,160,0.25),
    0 0 50px rgba(212,190,160,0.12);

  transition:
    transform .5s ease,
    box-shadow .5s ease,
    filter .5s ease;
}

        .section {
          max-width: 1240px;
          margin: 0 auto;
          padding: 82px 28px 46px;
        }

        .sectionIntro {
          text-align: center;
          max-width: 840px;
          margin: 0 auto 34px;
        }

        .sectionTitle {
  margin: 0 0 16px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 62px;
  font-weight: 400;
  color: #ede1c8;

  text-shadow:
    0 0 20px rgba(197,169,110,0.15);
}

        .sectionIntro .sectionText,
        .storySection .sectionText {
          margin: 0 auto;
        }

        .gamasGrid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 16px;
        }

        .gamaCard {
          min-height: 150px;
          padding: 22px;
          border-radius: 28px;
          border: 1px solid rgba(214, 197, 160, 0.12);
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.045), rgba(255, 255, 255, 0.018));
          color: #efe4cf;
          cursor: pointer;
          text-align: left;
        }

        .gamaCard.active {
          border-color: rgba(245, 230, 200, 0.38);
          background: linear-gradient(180deg, rgba(235, 224, 203, 0.14), rgba(197, 169, 110, 0.08));
        }

        .gamaName {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 28px;
          color: #efe4cf;
          margin-bottom: 12px;
        }

        .gamaDescription {
          font-family: Arial, sans-serif;
          font-size: 13px;
          line-height: 1.7;
          color: rgba(242, 237, 229, 0.68);
        }

        .collection {
          max-width: 1440px;
          padding-top: 46px;
          padding-bottom: 110px;
        }

        .drinkTabs {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: center;
          margin-bottom: 28px;
        }

        .drinkTab {
          white-space: nowrap;
          border-radius: 999px;
          padding: 13px 22px;
          border: 1px solid rgba(214, 197, 160, 0.16);
          background: rgba(14, 14, 14, 0.46);
          color: #d8c6a5;
          font-family: Arial, sans-serif;
          font-weight: 800;
          font-size: 14px;
          cursor: pointer;
        }

        .drinkTab.active {
          border-color: rgba(229, 214, 186, 0.32);
          background: linear-gradient(180deg, rgba(235, 224, 203, 0.95), rgba(194, 166, 115, 0.95));
          color: #18120a;
        }

        .productGrid {
          display: grid;
          grid-template-columns: 1.08fr 0.92fr;
          gap: 28px;
          align-items: stretch;
        }

        .bottleCard {
          position: relative;
          min-height: 900px;
          border-radius: 34px;
          overflow: hidden;
          background: linear-gradient(180deg, rgba(10, 10, 10, 0.72), rgba(8, 8, 8, 0.94));
          border: 1px solid rgba(214, 197, 160, 0.12);
        }

        .bottleGlow {
          position: absolute;
          inset: 0;
          animation: pulseGlow 4.5s ease-in-out infinite;
           filter: blur(70px);
            opacity: 0.75;
        }

        .arrowBtn {
          position: absolute;
          top: 50%;
          z-index: 10;
          width: 54px;
          height: 54px;
          border-radius: 999px;
          border: 1px solid rgba(214, 197, 160, 0.22);
          background: rgba(8, 8, 8, 0.55);
          color: #eadfc8;
          font-size: 42px;
          line-height: 0.8;
          cursor: pointer;
          backdrop-filter: blur(8px);
          transform: translateY(-50%);
        }

        .arrowLeft {
          left: 24px;
        }

        .arrowRight {
          right: 24px;
        }

        .bottleStage {
          position: absolute;
          top: 54px;
          left: 82px;
          right: 82px;
          bottom: 112px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .bottleImg {
  width: 102%;
  height: 100%;
  max-height: 820px;
  object-fit: contain;

  filter:
    drop-shadow(0 20px 80px rgba(0,0,0,0.8))
    drop-shadow(0 0 90px rgba(212,190,160,0.18));

  transition:
    opacity 1800ms cubic-bezier(0.22,1,0.36,1),
    transform 2200ms cubic-bezier(0.22,1,0.36,1),
    filter 2200ms ease;
}

.storyButtonWrap {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 90px;

  display: flex;
  justify-content: center;
  z-index: 30;
}

:global(.storyBtn) {
  position: relative;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-width: 320px;
  height: 62px;
  padding: 0 42px;

  border-radius: 32px;
  border: 1px solid rgba(212,190,160,0.28);

background: rgba(18,18,18,0.60);
backdrop-filter: blur(24px);
-webkit-backdrop-filter: blur(24px);
border: 1px solid rgba(255,255,255,0.10);

  color: #f5e8c6;
  text-decoration: none;

  font-family: Georgia, "Times New Roman", serif;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 0.08em;

  box-shadow:
    0 18px 50px rgba(0,0,0,0.70),
    inset 0 1px 0 rgba(255,255,255,0.08),
    0 0 35px rgba(212,190,160,0.12);

  transition: all .4s ease;
}

:global(.storyBtn)::before {
  content: "";
  position: absolute;
  inset: 1px;
  border-radius: 31px;

  background:
    linear-gradient(
      180deg,
      rgba(255,255,255,0.04),
      transparent 45%
    );

  pointer-events: none;
}

:global(.storyBtn:hover) {
  transform: translateY(-3px);

  border-color: rgba(212,190,160,0.45);

  box-shadow:
    0 24px 60px rgba(0,0,0,0.80),
    0 0 45px rgba(212,190,160,0.22);
}

:global(.storyBtn:hover)::before {
  left: 140%;
}

:global(.storyBtn:hover) {
  transform: translateY(-3px);
  border-color: rgba(212,190,160,.35);

  box-shadow:
    0 22px 60px rgba(0,0,0,.7),
    0 0 40px rgba(212,190,160,.12);
}

:global(.storyBtn:hover)::before {
  left: 135%;
}

.infoCard {

          border-radius: 34px;
          background: rgba(10, 10, 10, 0.52);
          border: 1px solid rgba(214, 197, 160, 0.12);
          padding: 44px 38px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .drinkTitle {
          margin: 0 0 14px;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 74px;
          line-height: 1;
          font-weight: 400;
          color: #efe4cf;
        }

        .drinkFrase {
          margin: 0 0 26px;
          font-family: Arial, sans-serif;
          font-size: 19px;
          line-height: 1.9;
          color: rgba(242, 237, 229, 0.8);
          max-width: 540px;
        }

        .luxuryGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 22px;
        }

        .luxuryCard {
          padding: 16px;
          border-radius: 18px;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.045), rgba(255, 255, 255, 0.018));
          border: 1px solid rgba(214, 197, 160, 0.1);
        }

        .luxuryCard p {
          margin: 0;
          font-family: Arial, sans-serif;
          font-size: 13px;
          line-height: 1.65;
          color: rgba(242, 237, 229, 0.74);
        }

        .purchaseGrid {
          display: grid;
          gap: 16px;
        }

        .priceBox,
        .packHighlight {
          padding: 18px;
          border-radius: 18px;
          border: 1px solid rgba(214, 197, 160, 0.1);
        }

        .priceBox {
          background: rgba(255, 255, 255, 0.02);
        }

        .packHighlight {
          background: linear-gradient(180deg, rgba(235, 224, 203, 0.08), rgba(194, 166, 115, 0.08));
        }

        .priceRow {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          flex-wrap: wrap;
        }

        .priceText {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 30px;
          color: #efe4cf;
        }

        .savingBadge {
          display: inline-block;
          margin-top: 10px;
          padding: 10px 16px;
          border-radius: 999px;
          background: linear-gradient(135deg, #f5e6c8, #c5a96e);
          color: #1a1208;
          font-weight: 800;
          font-family: Arial, sans-serif;
          font-size: 13px;
        }

        .packsGrid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
          margin-top: 28px;
        }

        .packCard {
  position: relative;
  padding: 34px;
  border-radius: 32px;

  background:
    radial-gradient(
      circle at top,
      rgba(197,169,110,0.08),
      rgba(8,8,8,0.98)
    );

  border: 1px solid rgba(214,197,160,0.16);

  box-shadow:
    0 35px 90px rgba(0,0,0,0.45),
    inset 0 1px 0 rgba(255,255,255,0.05);

  text-align: center;
  overflow: hidden;
}

        .packCard h3 {
          margin: 0 0 10px;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 32px;
          color: #eadfc8;
          font-weight: 400;
        }

        .packCard p {
          margin: 0 0 18px;
          color: rgba(242, 237, 229, 0.68);
          font-family: Arial, sans-serif;
          line-height: 1.7;
        }

       .packPoster {
  width: 100%;
  max-width: 220px;
  height: 320px;
  object-fit: contain;

  filter:
    drop-shadow(0 25px 50px rgba(0,0,0,0.8))
    drop-shadow(0 0 40px rgba(197,169,110,0.18));

  transition: all 600ms ease;
}

.packCard:hover .packPoster {
  transform: translateY(-8px);
}

.packOffer {
  display: inline-block;
  margin-top: 16px;
  padding: 10px 18px;
  border-radius: 999px;
  background: linear-gradient(
    180deg,
    #eadfc8,
    #c5a96e
  );
  color: #17110a;
  font-weight: 700;
  font-size: 13px;
}
        .storySection {
          max-width: 900px;
          text-align: center;
          padding-bottom: 100px;
        }

        .footer {
          max-width: 1200px;
          margin: 0 auto;
          padding: 10px 28px 80px;
        }

        .footerBox {
          border-radius: 28px;
          padding: 34px 30px;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.02));
          border: 1px solid rgba(214, 197, 160, 0.1);
          display: flex;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }

        .footerLogo {
          width: 58px;
        }

        .footerLinks {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          align-items: center;
        }

        .footerLinks a {
          color: #d9c7a5;
          text-decoration: none;
          font-family: Arial, sans-serif;
          font-size: 14px;
        }

        .copyright {
          margin-top: 18px;
          text-align: center;
          font-family: Arial, sans-serif;
          font-size: 12px;
          color: rgba(242, 237, 229, 0.44);
          letter-spacing: 0.05em;
        }

        @media (max-width: 768px) {
          .ageCard {
            padding: 38px 22px;
          }

          .ageLogo {
            width: 78px;
          }

          .ageTitle {
            font-size: 40px;
          }

          .headerInner {
            padding: 14px 16px;
          }

          .brandLogo {
            width: 42px;
          }

          .brandName {
            font-size: 24px;
          }

          .hero,
          .heroInner {
            min-height: 62vh;
          }

          .heroInner {
            padding: 32px 16px;
          }

          .heroCopy {
            margin-top: 28px;
          }

          .heroTitle {
            font-size: 48px;
            line-height: 0.96;
          }

          .heroText,
          .sectionText {
            font-size: 14px;
          }

          .section {
            padding: 52px 16px 28px;
          }

          .sectionTitle {
            font-size: 36px;
          }

          .gamasGrid,
          .productGrid,
          .luxuryGrid,
          .packsGrid {
            grid-template-columns: 1fr;
          }

          .drinkTabs {
            justify-content: flex-start;
            overflow-x: auto;
            flex-wrap: nowrap;
            padding-bottom: 8px;
          }

          .bottleCard {
            min-height: 640px;
          }

          .bottleStage {
            top: 48px;
            left: 54px;
            right: 54px;
            bottom: 104px;
          }

          .bottleImg {
            width: 108%;
            max-height: 570px;
          }

          .arrowLeft {
            left: 12px;
          }

          .arrowRight {
            right: 12px;
          }

          .infoCard {
            padding: 26px 20px;
          }

          .drinkTitle {
            font-size: 48px;
          }

          .drinkFrase {
            font-size: 16px;
          }

          .footer {
            padding: 10px 16px 60px;
          }

          .footerBox {
            padding: 24px 20px;
          }
        }
      `}</style>
    </>
  );
}
