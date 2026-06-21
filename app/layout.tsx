import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Goon — Custom 3D Printed Figurines, Shipped in 72 Hours",
  description:
    "Goon turns your ideas into ultra-detailed, full-color 3D prints — no modeling skills needed. Describe what you want, and we handle the design, printing, and shipping.",
  openGraph: {
    title: "Goon — Custom 3D Printed Figurines, Shipped in 72 Hours",
    description: "Describe It. Print It. Ship It.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="font-body bg-ink text-white antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
