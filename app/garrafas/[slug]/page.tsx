import { bebidas } from "@/data/bebidas"

export async function generateStaticParams() {
  return bebidas.map((b) => ({
    slug: b.slug,
  }))
}

export default function Garrafa({ params }: any) {
  const bebida = bebidas.find((b) => b.slug === params.slug)

  if (!bebida) return <div>Não encontrada</div>

  return (
    <main className="container">
      <img src={bebida.imagem} className="heroImg" />

      <h1>{bebida.nome}</h1>
      <p className="gama">{bebida.gama}</p>
      <p className="desc">{bebida.descricao}</p>

      <button className="btn">Comprar experiência</button>

    </main>
  )
}