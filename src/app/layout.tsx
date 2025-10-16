import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Luxe - E-commerce Premium",
  description: "Premium e-commerce for curated products with modern, elegant design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
