"use client";

import Link from "next/link";
import { bebidas, gamas } from "../../data/bebidas";

export default function GamasPage() {
  return (
    <main className="page">
      <Link href="/" className="back">← Voltar</Link>
      <section className="hero">
        <div className="eyebrow">Universos Vem T'Aki</div>
        <h1>Gamas</h1>
        <p>Quatro estados de espírito para descobrir a coleção.</p>
      </section>

      <section className="grid">
        {gamas.map((gama) => {
          const lista = bebidas.filter((b) => b.gama === gama);
          return (
            <Link key={gama} href={`/garrafas?gama=${encodeURIComponent(gama)}`} className="card">
              <div className="eyebrow">{lista.length} criações</div>
              <h2>{gama}</h2>
              <p>{lista.map((b) => b.nome).join(", ")}</p>
            </Link>
          );
        })}
      </section>

      <style jsx>{`
        .page { min-height: 100vh; padding: 34px; color: #f2ede5; background: radial-gradient(circle at 50% 0%, rgba(197,169,110,.16), transparent 34%), #050505; }
        .back { color: #d9c7a5; text-decoration: none; font-family: Arial, sans-serif; }
        .hero { max-width: 880px; margin: 80px auto 42px; text-align: center; }
        .eyebrow { color: #c9b286; text-transform: uppercase; letter-spacing: .28em; font: 700 11px Arial, sans-serif; margin-bottom: 14px; }
        h1 { margin: 0; font: 400 76px Georgia, serif; color: #efe4cf; }
        .hero p { margin: 18px auto 0; max-width: 640px; color: rgba(242,237,229,.76); font: 17px/1.9 Arial, sans-serif; }
        .grid { max-width: 1180px; margin: 0 auto; display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
        .card { min-height: 260px; padding: 26px; border-radius: 30px; text-decoration: none; color: #f2ede5; background: linear-gradient(180deg, rgba(255,255,255,.07), rgba(255,255,255,.025)); border: 1px solid rgba(214,197,160,.14); box-shadow: 0 26px 80px rgba(0,0,0,.32); transition: .28s ease; }
        .card:hover { transform: translateY(-6px); border-color: rgba(245,230,200,.32); box-shadow: 0 30px 90px rgba(0,0,0,.48), 0 0 38px rgba(197,169,110,.18); }
        .card h2 { margin: 0 0 18px; font: 400 40px Georgia, serif; color: #efe4cf; }
        .card p { margin: 0; color: rgba(242,237,229,.7); font: 14px/1.8 Arial, sans-serif; }
        @media (max-width: 900px) { .grid { grid-template-columns: 1fr; } h1 { font-size: 48px; } .page { padding: 22px; } }
      `}</style>
    </main>
  );
}
