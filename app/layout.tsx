import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Goon — Custom 3D Printing for Makers",
  description:
    "Describe it, sketch it, print it. Goon is a custom 3D printing service built for hobbyist makers who want professional results without the hassle.",
  keywords: ["3D printing", "custom printing", "maker", "hobbyist", "rapid prototyping"],
  openGraph: {
    title: "Goon — Custom 3D Printing for Makers",
    description: "Describe it, sketch it, print it.",
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
