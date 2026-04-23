import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Form Response Extractor Demo",
  description:
    "Test paper form extraction with ai-form-response-extractor – configure your LLM provider, upload scanned forms, and see intelligent extraction in action.",
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
