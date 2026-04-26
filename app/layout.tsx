import type { Metadata } from "next";
import { CartProvider } from "./components/CartContext";
import CookieBanner from "./components/CookieBanner";
import WhatsAppButton from "./components/WhatsAppButton";
import GlobalAudio from "./components/GlobalAudio";

export const metadata: Metadata = {
  title: "Vem T'Aki",
  description: "Coleção sensorial Vem T'Aki",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body
        style={{
          margin: 0,
          padding: 0,
          background: "#050505",
        }}
      >
        <CartProvider>
          <GlobalAudio />
          {children}
          <CookieBanner />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
