import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://qualipedia-bruna.comprasbru1807.chatgpt.site"),
  title: { default: "QualiPédia | Gestão da qualidade aplicada", template: "%s | QualiPédia" },
  description: "Biblioteca para encontrar ferramentas e métodos de qualidade a partir de problemas reais, áreas e objetivos de melhoria.",
  other: { "codex-preview": "development" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body className="antialiased">{children}</body></html>;
}
