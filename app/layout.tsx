import type { Metadata, Viewport } from "next";
import { inter } from "@/app/fonts";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Provider } from "@/lib/provider";
import NextTopLoader from 'nextjs-toploader';

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: {
    template: "E-Filling-app",
    default: "E-Filling App",
  },
  description:
    "Court Filling systerm",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body
        className={`${inter.variable} ${inter.variable} font-inter antialiased bg-background min-h-dvh overflow-hidden w-full`}
      >
        <Provider>{children}</Provider>
        <NextTopLoader showSpinner={false} color="#6F4E37" />
        <Toaster />
      </body>
    </html>
  );
}
