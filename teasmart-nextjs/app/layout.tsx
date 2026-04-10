import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TeaSmart Dashboard",
  description: "Smart tea farm operation and sustainability dashboard"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body>
        <main className="mx-auto min-h-screen max-w-6xl px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
