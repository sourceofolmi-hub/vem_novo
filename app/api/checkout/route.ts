import { NextResponse } from "next/server";
import Stripe from "stripe";

type CartItem = {
  nome: string;
  quantidade: number;
};

export async function POST(req: Request) {
  // Ler variáveis de ambiente
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!stripeKey) {
    return NextResponse.json(
      { error: "STRIPE_SECRET_KEY não está definida." },
      { status: 500 }
    );
  }

  if (!siteUrl) {
    return NextResponse.json(
      { error: "NEXT_PUBLIC_SITE_URL não está definida." },
      { status: 500 }
    );
  }

  // Criar Stripe APENAS depois de validar a key
  const stripe = new Stripe(stripeKey);

  try {
    const body = await req.json();

    const { nome, email, telefone, morada, observacoes, items, acceptedTerms } =
      body as {
        nome: string;
        email: string;
        telefone: string;
        morada: string;
        observacoes?: string;
        items: CartItem[];
        acceptedTerms: boolean;
      };

    // Validações básicas
    if (!nome || !email || !telefone || !morada) {
      return NextResponse.json(
        { error: "Preencha nome, email, telefone e morada." },
        { status: 400 }
      );
    }

    if (!items || !items.length) {
      return NextResponse.json(
        { error: "O carrinho está vazio." },
        { status: 400 }
      );
    }

    if (!acceptedTerms) {
      return NextResponse.json(
        { error: "Tem de aceitar os termos para continuar." },
        { status: 400 }
      );
    }

    const totalItems = items.reduce((sum, item) => sum + item.quantidade, 0);

    const orderSummary = items
      .map((item) => `${item.nome} x${item.quantidade}`)
      .join(" | ");

    // Criar sessão Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      success_url: `${siteUrl}/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/encomendas`,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Encomenda Vem T'Aki",
              description: orderSummary.slice(0, 500),
            },
            unit_amount: 1500, // €15.00 em cêntimos
          },
          quantity: totalItems,
        },
      ],
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Erro Stripe:", error);

    return NextResponse.json(
      {
        error: error?.message || "Erro ao iniciar pagamento.",
        code: error?.code,
        type: error?.type,
      },
      { status: 500 }
    );
  }
}
