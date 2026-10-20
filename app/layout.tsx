import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { CurrencyProvider } from "@/components/CurrencyProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shopfinity — Endless Finds. One Shop.",
  description:
    "Shopfinity demo store: trending tech gadgets, smart home, audio and wearables with PHP/USD pricing.",
  icons: { icon: "/logo-transparent.png" },
  openGraph: {
    title: "Shopfinity — Endless Finds. One Shop.",
    description: "Demo e-commerce storefront built with Next.js, Tailwind and Zustand.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans">
        <CurrencyProvider>{children}</CurrencyProvider>
      </body>
    </html>
  );
}
