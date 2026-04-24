export default function Entregas() {
  return (
    <main
      style={{
        padding: "40px",
        maxWidth: "800px",
        margin: "0 auto",
        color: "#efe4cf",
      }}
    >
      <h1>Entregas e Devoluções</h1>
      <h2>Envios</h2>
      <p>As encomendas são processadas em 24-72h úteis.</p>
      <h2>Prazos</h2>
      <p>Entrega estimada entre 2 a 5 dias úteis.</p>
      <h2>Devoluções</h2>
      <p>
        Por razões de higiene, não aceitamos devoluções após abertura do
        produto.
      </p>
      <h2>Problemas</h2>
      <p>
        Caso haja algum problema com a encomenda, contacte-nos imediatamente.
      </p>
      import CookieBanner from "./components/CookieBanner";
    </main>
  );
}
