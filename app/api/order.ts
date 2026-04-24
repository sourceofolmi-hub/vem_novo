import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { product, quantity, customerName, address } = req.body;

    if (!product || !quantity || !customerName || !address) {
      return res.status(400).json({ error: "Dados incompletos." });
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

    await transporter.sendMail({
      from: `"Vem T'Aki" <${process.env.SMTP_USER}>`,
      to: process.env.ORDER_TO_EMAIL,
      subject: `Nova encomenda - ${product}`,
      text: `Produto: ${product}
Quantidade: ${quantity}
Nome: ${customerName}
Morada: ${address}`,
    });

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error("SMTP ERROR:", error);
    return res
      .status(500)
      .json({ error: error?.message || "Erro ao enviar email." });
  }
}
