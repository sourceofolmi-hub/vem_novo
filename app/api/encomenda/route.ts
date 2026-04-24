import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      nome,
      telefone,
      morada,
      observacoes,
      items,
      total,
      totalPrice,
      totalSavings,
    } = body;

    const produtosTexto = items
      .map((item: any) => `- ${item.nome} x${item.quantidade}`)
      .join("\n");

    const produtosHtml = items
      .map(
        (item: any) => `
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(212,190,160,0.12); color: #f2ede5; font-family: Arial, sans-serif; font-size: 15px;">
              ${item.nome}
            </td>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(212,190,160,0.12); color: #d4bea0; font-family: Arial, sans-serif; font-size: 15px; text-align: right;">
              x${item.quantidade}
            </td>
          </tr>
        `
      )
      .join("");

    const html = `
      <div style="margin:0; padding:0; background:#050505;">
        <div style="max-width: 720px; margin: 0 auto; background: linear-gradient(180deg, #090909 0%, #050505 100%); border: 1px solid rgba(212,190,160,0.10);">
          
          <div style="padding: 40px 32px 24px; text-align: center; border-bottom: 1px solid rgba(212,190,160,0.10);">
            <div style="font-family: Arial, sans-serif; font-size: 11px; letter-spacing: 0.32em; text-transform: uppercase; color: #c8ab78; margin-bottom: 16px;">
              Nova Encomenda
            </div>
            <div style="font-family: Georgia, 'Times New Roman', serif; font-size: 40px; line-height: 1; color: #dbc39a; margin-bottom: 12px;">
              Vem T'Aki
            </div>
            <div style="font-family: Arial, sans-serif; font-size: 15px; line-height: 1.8; color: rgba(242,237,229,0.76);">
              Uma nova encomenda foi registada no site.
            </div>
          </div>

          <div style="padding: 28px 32px;">
            <div style="margin-bottom: 26px; padding: 24px; border-radius: 20px; background: rgba(255,255,255,0.02); border: 1px solid rgba(212,190,160,0.08);">
              <div style="font-family: Arial, sans-serif; font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase; color: #c8ab78; margin-bottom: 14px;">
                Dados do cliente
              </div>

              <div style="font-family: Arial, sans-serif; font-size: 15px; line-height: 1.9; color: #f2ede5;">
                <strong style="color:#dbc39a;">Nome:</strong> ${nome}<br />
                <strong style="color:#dbc39a;">Telefone:</strong> ${telefone}<br />
                <strong style="color:#dbc39a;">Morada:</strong> ${morada}
              </div>
            </div>

            <div style="margin-bottom: 26px; padding: 24px; border-radius: 20px; background: rgba(255,255,255,0.02); border: 1px solid rgba(212,190,160,0.08);">
              <div style="font-family: Arial, sans-serif; font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase; color: #c8ab78; margin-bottom: 14px;">
                Produtos
              </div>

              <table style="width:100%; border-collapse: collapse;">
                ${produtosHtml}
              </table>
            </div>

            <div style="margin-bottom: 26px; padding: 24px; border-radius: 20px; background: rgba(255,255,255,0.02); border: 1px solid rgba(212,190,160,0.08);">
              <div style="font-family: Arial, sans-serif; font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase; color: #c8ab78; margin-bottom: 14px;">
                Resumo
              </div>

              <div style="font-family: Arial, sans-serif; font-size: 15px; line-height: 1.9; color: #f2ede5;">
                <div><strong style="color:#dbc39a;">Total de unidades:</strong> ${total}</div>
                <div style="margin-top: 8px; font-size: 24px; color: #dbc39a; font-family: Georgia, 'Times New Roman', serif;">
                  ${totalPrice} €
                </div>
                <div style="margin-top: 6px; color: #8fd19e; font-size: 14px;">
                  Poupança: ${totalSavings || 0} €
                </div>
              </div>
            </div>

            <div style="padding: 24px; border-radius: 20px; background: rgba(255,255,255,0.02); border: 1px solid rgba(212,190,160,0.08);">
              <div style="font-family: Arial, sans-serif; font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase; color: #c8ab78; margin-bottom: 14px;">
                Observações
              </div>

              <div style="font-family: Arial, sans-serif; font-size: 15px; line-height: 1.9; color: #f2ede5;">
                ${observacoes || "-"}
              </div>
            </div>
          </div>

          <div style="padding: 20px 32px 34px; text-align: center; border-top: 1px solid rgba(212,190,160,0.10);">
            <div style="font-family: Arial, sans-serif; font-size: 12px; color: rgba(242,237,229,0.45); letter-spacing: 0.08em;">
              Vem T'Aki • Encomenda recebida com sucesso
            </div>
          </div>
        </div>
      </div>
    `;

    const texto = `
Nova encomenda Vem T'Aki

DADOS DO CLIENTE
Nome: ${nome}
Telefone: ${telefone}
Morada: ${morada}

PRODUTOS
${produtosTexto}

RESUMO
Total de unidades: ${total}
Total final: ${totalPrice} €
Poupança: ${totalSavings || 0} €

OBSERVAÇÕES
${observacoes || "-"}
`;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Vem T'Aki <onboarding@resend.dev>",
        to: ["sourceofolmi@gmail.com"], // troca pelo teu email real
        subject: "Nova encomenda Vem T'Aki",
        html,
        text: texto,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Erro Resend:", data);
      return NextResponse.json(
        { error: "Erro ao enviar email", details: data },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Erro interno:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}
