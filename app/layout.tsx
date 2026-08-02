import type { Metadata } from "next";
import Script from "next/script";
// Ignore missing type declarations for global CSS import in this environment
// @ts-ignore
import "./globals.css";

export const metadata: Metadata = {
  title: "Nexora — Premium design marketplace",
  description: "Discover and sell remarkable digital design assets.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
     <body>
  {children}

  <Script
    src="https://checkout.razorpay.com/v1/checkout.js"
    strategy="beforeInteractive"
  />
</body>
    </html>
  );
}