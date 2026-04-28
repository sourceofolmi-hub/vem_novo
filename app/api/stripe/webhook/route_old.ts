export const runtime = "nodejs";

import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const rawBody = await req.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature error:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const nome = session.metadata?.nome || "";
      const email = session.metadata?.email || session.customer_details?.email || "";
      const telefone = session.metadata?.telefone || "";
      const morada = session.metadata?.morada || "";
      const observacoes = session.metadata?.observacoes || "-";
      const totalItems = session.metadata?.totalItems || "0";
      const totalPrice = session.metadata?.totalPrice || "0";
      const totalSavings = session.metadata?.totalSavings || "0";
      const acceptedTerms = session.metadata?.acceptedTerms || "false";
      const acceptedMarketing = session.metadata?.acceptedMarketing || "false";
      const termsVersion = session.metadata?.termsVersion || "v1.0";
      const consentTimestamp = session.metadata?.consentTimestamp || "-";
      const orderSummary = session.metadata?.orderSummary || "-";

      const ownerHtml = `
        <div style="background:#050505;padding:30px;font-family:Arial,sans-serif;color:#f2ede5;">
          <div style="max-width:720px;margin:0 auto;border:1px solid rgba(212,190,160,0.12);background:#0a0a0a;border-radius:20px;overflow:hidden;">
            <div style="padding:32px;border-bottom:1px solid rgba(212,190,160,0.12);text-align:center;">
              <div style="font-size:11px;letter-spacing:.28em;text-transform:uppercase;color:#c8ab78;margin-bottom:12px;">Pagamento confirmado</div>
              <div style="font-family:Georgia,'Times New Roman',serif;font-size:40px;color:#dbc39a;">Vem T'Aki</div>
            </div>

            <div style="padding:28px;">
              <h2 style="font-family:Georgia,'Times New Roman',serif;color:#dbc39a;margin:0 0 16px;">Nova encomenda</h2>

              <p><strong>Nome:</strong> ${nome}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Telefone:</strong> ${telefone}</p>
              <p><strong>Morada:</strong> ${morada}</p>
              <p><strong>Produtos:</strong> ${orderSummary}</p>
              <p><strong>Total de unidades:</strong> ${totalItems}</p>
              <p><strong>Total pago:</strong> ${totalPrice} €</p>
              <p><strong>Poupança:</strong> ${totalSavings} €</p>
              <p><strong>Observações:</strong> ${observacoes || "-"}</p>

              <hr style="border:none;border-top:1px solid rgba(212,190,160,0.12);margin:24px 0;" />

              <p><strong>Consentimento legal:</strong> ${acceptedTerms === "true" ? "Sim" : "Não"}</p>
              <p><strong>Marketing:</strong> ${acceptedMarketing === "true" ? "Sim" : "Não"}</p>
              <p><strong>Versão dos termos:</strong> ${termsVersion}</p>
              <p><strong>Data do consentimento:</strong> ${consentTimestamp}</p>
              <p><strong>Stripe Session:</strong> ${session.id}</p>
            </div>
          </div>
        </div>
      `;

      const customerHtml = `
        <div style="background:#050505;padding:30px;font-family:Arial,sans-serif;color:#f2ede5;">
          <div style="max-width:720px;margin:0 auto;border:1px solid rgba(212,190,160,0.12);background:#0a0a0a;border-radius:20px;overflow:hidden;">
            <div style="padding:32px;border-bottom:1px solid rgba(212,190,160,0.12);text-align:center;">
              <div style="font-size:11px;letter-spacing:.28em;text-transform:uppercase;color:#c8ab78;margin-bottom:12px;">Encomenda confirmada</div>
              <div style="font-family:Georgia,'Times New Roman',serif;font-size:40px;color:#dbc39a;">Vem T'Aki</div>
            </div>

            <div style="padding:28px;">
              <h2 style="font-family:Georgia,'Times New Roman',serif;color:#dbc39a;margin:0 0 16px;">Obrigado, ${nome}</h2>
              <p>Recebemos o seu pagamento com sucesso.</p>
              <p><strong>Resumo:</strong> ${orderSummary}</p>
              <p><strong>Total pago:</strong> ${totalPrice} €</p>
              <p><strong>Total de unidades:</strong> ${totalItems}</p>
              <p><strong>Poupança:</strong> ${totalSavings} €</p>
              <p>Entraremos em contacto para acompanhar a entrega da sua encomenda.</p>
            </div>
          </div>
        </div>
      `;

      await resend.emails.send({
        from: "Vem T'Aki <onboarding@resend.dev>",
        to: [process.env.SALES_EMAIL!],
        subject: `Nova encomenda paga • ${nome}`,
        html: ownerHtml,
      });

      if (email) {
        await resend.emails.send({
          from: "Vem T'Aki <onboarding@resend.dev>",
          to: [email],
          subject: "A sua encomenda foi confirmada",
          html: customerHtml,
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
