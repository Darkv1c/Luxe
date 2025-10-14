import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Luxe - E-commerce Premium",
  description: "E-commerce de productos premium con diseño moderno y elegante",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
