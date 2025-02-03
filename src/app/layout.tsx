import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";


export const metadata: Metadata = {
  title: "Todo App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en">
        <body>
            {children}
        </body>
      </html>
    </SessionProvider>
  );
}
