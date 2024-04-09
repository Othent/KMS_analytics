import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { TransactionsProvider } from "../contexts/TransactionsContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tag-lytics",
  description: "Easy Arweave GraphQL tag retrieval dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <TransactionsProvider>
        <body className={inter.className}>{children}</body>
      </TransactionsProvider>
    </html>
  );
}
