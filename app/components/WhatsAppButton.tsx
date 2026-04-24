"use client";

export default function WhatsAppButton() {
  const phone = "351916300255";

  const message =
    "Olá! Gostaria de falar convosco sobre uma encomenda da Vem T'Aki.";

  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        right: "20px",
        bottom: "20px",
        zIndex: 9999,
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        padding: "14px 18px",
        borderRadius: "999px",

        // 🎯 visual premium
        background: "rgba(10, 10, 10, 0.85)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(214,197,160,0.25)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.6)",

        color: "#d6c5a0", // dourado suave
        textDecoration: "none",
        fontWeight: 600,
        fontFamily: "Arial, sans-serif",
        fontSize: "14px",
      }}
    >
      💬 WhatsApp
    </a>
  );
}
