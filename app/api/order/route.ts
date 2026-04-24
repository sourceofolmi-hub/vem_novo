export const runtime = "nodejs";

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { product, quantity, customerName, address } = await req.json();

    if (!product || !quantity || !customerName || !address) {
      return NextResponse.json(
        { error: "Dados incompletos." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.verify();

    await transporter.sendMail({
      from: `"Vem T'Aki" <${process.env.SMTP_USER}>`,
      to: process.env.ORDER_TO_EMAIL,
      subject: `Nova encomenda - ${product}`,
      text: `Produto: ${product}
Quantidade: ${quantity}
Nome: ${customerName}
Morada: ${address}`,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("ERRO REAL SMTP:", error);
    return NextResponse.json(
      { error: error?.message || "Erro ao enviar email." },
      { status: 500 }
    );
  }
}
