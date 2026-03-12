import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.espacobuscabusca.com.br"),
  title: {
    default:
      "Busca Busca | Eletrônicos, Calçados, Ferramentas, Roupas e Muito Mais",
    template: "%s | Busca Busca",
  },
  description:
    "Loja virtual de ferramentas, elétrica, solda, autopeças e utilidades com ofertas e compra rápida.",
  keywords: [
    "ferramentas",
    "loja online",
    "equipamentos",
    "eletrônicos",
    "calçados",
    "roupas",
  ],
  openGraph: {
    title: "Busca Busca",
    description:
      "Loja virtual de ferramentas, elétrica, solda, autopeças e utilidades.",
    type: "website",
    locale: "pt_BR",
    siteName: "Busca Busca",
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${montserrat.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
