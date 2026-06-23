"use client";
import Link from "next/link";

export default function HistoriaPage() {
  return (
    <main className="page">
      <Link href="/" className="back">← Voltar</Link>
      <section className="hero">
        <div className="eyebrow">A essência da marca</div>
        <h1>História</h1>
        <p>
          A Vem T'Aki nasceu para criar mais do que bebidas: nasceu para criar presença.
          Cada garrafa é pensada como objeto de desejo, peça visual e experiência sensorial.
        </p>
      </section>
      <section className="content">
        <article>
          <h2>Feita com tempo</h2>
          <p>Cada detalhe nasce da procura por intensidade, atmosfera e memória.</p>
        </article>
        <article>
          <h2>Intenção premium</h2>
          <p>A linguagem visual combina contraste, brilho, cor e uma assinatura provocante.</p>
        </article>
        <article>
          <h2>Coleção de autor</h2>
          <p>As gamas Intensa, Mistério, Sensual e Vício organizam a experiência por estados de espírito.</p>
        </article>
      </section>

      <style jsx>{`
        .page { min-height: 100vh; padding: 34px; color: #f2ede5; background: radial-gradient(circle at 50% 0%, rgba(197,169,110,.14), transparent 34%), #050505; }
        .back { color: #d9c7a5; text-decoration: none; font-family: Arial, sans-serif; }
        .hero { max-width: 900px; margin: 86px auto 42px; text-align: center; }
        .eyebrow { color: #c9b286; text-transform: uppercase; letter-spacing: .28em; font: 700 11px Arial, sans-serif; margin-bottom: 16px; }
        h1 { margin: 0; font: 400 82px Georgia, serif; color: #efe4cf; }
        .hero p { margin: 20px auto 0; max-width: 760px; color: rgba(242,237,229,.76); font: 18px/1.95 Arial, sans-serif; }
        .content { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        article { padding: 28px; border-radius: 28px; background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02)); border: 1px solid rgba(214,197,160,.14); }
        h2 { margin: 0 0 12px; font: 400 30px Georgia, serif; color: #eadfc8; }
        article p { margin: 0; color: rgba(242,237,229,.7); font: 14px/1.8 Arial, sans-serif; }
        @media (max-width: 800px) { .content { grid-template-columns: 1fr; } h1 { font-size: 50px; } .page { padding: 22px; } }
      `}</style>
    </main>
  );
}
