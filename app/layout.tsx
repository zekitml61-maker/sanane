import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "C'Propre - Pressing Professionnel | Nettoyage à Domicile",
  description: "Service de pressing professionnel avec collecte à domicile. Abonnements flexibles, suivi par QR code, collecte chaque lundi.",
  keywords: "pressing, nettoyage, pressing domicile, collecte linge, abonnement pressing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
