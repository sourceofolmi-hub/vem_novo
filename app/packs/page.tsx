"use client";

import AddToCartButton from "../components/AddToCartButton";

const packs = [
  {
    id: "pack-descoberta",
    nome: "Pack Descoberta",
    descricao: "3 sabores à escolha para descobrir a coleção.",
    preco: "3 por 40 €",
    oferta: "🎁 Oferta de 1 copo Vem T'Aki",
    imagem: "/packs/pack-descoberta.png",
  },
  {
    id: "pack-seducao",
    nome: "Pack Sedução",
    descricao: "Desejo, Pachacha e uma seleção sensual.",
    preco: "3 por 40 €",
    oferta: "🎁 Oferta de 1 copo Vem T'Aki",
    imagem: "/packs/pack-seducao.png",
  },
  {
    id: "pack-intenso",
    nome: "Pack Intenso",
    descricao: "Clímax, Orgasmo, Vertigem ou Êxtase.",
    preco: "3 por 40 €",
    oferta: "🎁 Oferta de 1 copo Vem T'Aki",
    imagem: "/packs/pack-intenso.png",
  },
];

export default function Packs() {
  return (
    <main className="page">
      <div className="intro">
        <div className="eyebrow">Packs exclusivos</div>
        <h1 className="title">Rituais preparados.</h1>

        <p className="subtitle">
          Descobre os packs criados para viver cada universo Vem T'Aki.
        </p>
      </div>

      <div className="grid">
        {packs.map((pack) => (
          <div key={pack.id} className="card">

            <div className="imageWrap">
              <img
                src={pack.imagem}
                alt={pack.nome}
                className="packImage"
              />
            </div>

            <div className="content">
              <h2>{pack.nome}</h2>

              <p className="description">
                {pack.descricao}
              </p>

              <div className="price">
                {pack.preco}
              </div>

              <div className="offer">
                {pack.oferta}
              </div>

              <div className="buttonWrap">
                <AddToCartButton
                  id={pack.id}
                  nome={pack.nome}
                  imagem={pack.imagem}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .page {
          min-height: 100vh;
          padding: 80px 30px;
          background: #050505;
          color: #fff;
        }

        .intro {
          text-align: center;
          margin-bottom: 60px;
        }

        .eyebrow {
          font-size: 12px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #c5a96e;
          margin-bottom: 16px;
        }

        .title {
          margin: 0 0 16px;
          font-family: Georgia, serif;
          font-size: 60px;
          color: #f0e3cb;
          font-weight: 400;
        }

        .subtitle {
          max-width: 600px;
          margin: auto;
          color: rgba(255,255,255,0.7);
          line-height: 1.8;
        }

        .grid {
  display: grid;
  grid-template-columns:
    repeat(auto-fit, minmax(450px, 1fr));
  gap: 50px;
  max-width: 1700px;
  margin: 0 auto;
}

        .card {
          background: linear-gradient(
            180deg,
            rgba(255,255,255,0.05),
            rgba(255,255,255,0.02)
          );

          border: 1px solid rgba(214,197,160,0.12);
          border-radius: 34px;
          overflow: hidden;

          box-shadow:
            0 30px 80px rgba(0,0,0,0.4);

          transition: all .35s ease;
        }

        .card:hover {
          transform: translateY(-8px);

          box-shadow:
            0 40px 100px rgba(0,0,0,0.55),
            0 0 40px rgba(197,169,110,0.15);
        }

        .imageWrap {
          padding: 35px;
          display: flex;
          justify-content: center;
          align-items: center;
          background:
            radial-gradient(
              circle at center,
              rgba(197,169,110,0.08),
              transparent 70%
            );
        }

        .packImage {
  width: 100%;
  max-width: 320px;
  height: 460px;
  object-fit: contain;

  filter:
    drop-shadow(
      0 0 45px rgba(212,190,160,0.35)
    );
}

        .content {
  padding: 40px 42px 46px;
  text-align: center;
}

        .content h2 {
  margin: 0 0 18px;
  font-family: Georgia, serif;
  font-size: 42px;
  font-weight: 400;
  color: #f0e3cb;
}

        .description {
          color: rgba(255,255,255,0.72);
          line-height: 1.8;
          min-height: 60px;
        }

        .price {
  margin-top: 32px;
  font-size: 48px;
  font-family: Georgia, serif;
  color: #f5e8c6;
  letter-spacing: -0.03em;
}

        .offer {
          margin-top: 18px;
          padding: 12px 18px;

          display: inline-block;

          border-radius: 999px;

          background:
            linear-gradient(
              135deg,
              #f5e6c8,
              #c5a96e
            );

          color: #17110a;
          font-weight: 700;
        }

        .buttonWrap {
          margin-top: 28px;
        }

        @media (max-width: 768px) {
          .page {
            padding: 50px 20px;
          }

          .title {
            font-size: 42px;
          }

          .packImage {
            height: 280px;
          }
        }
      `}</style>
    </main>
  );
}
