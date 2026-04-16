import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hybrid Form AI Demo",
  description:
    "Test paper form extraction with hybrid-form-ai – configure your LLM provider, upload scanned forms, and see intelligent extraction in action.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">{children}</body>
    </html>
  );
}
