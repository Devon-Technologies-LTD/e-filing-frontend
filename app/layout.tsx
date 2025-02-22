import type { Metadata, Viewport } from "next";
import { inter } from "@/app/fonts";
import "./globals.css";
import { AppProvider } from "@/lib/provider";
import NextTopLoader from "nextjs-toploader";
import Head from "next/head";
import React, { Suspense } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner"
import SuspenseLoader from "@/components/suspense-loader";



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
      <Head>
        <title>E-Filling Portal</title>
        <meta
          name="description"
          content="E-Filling Portal - Manage your records seamlessly."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <body
        className={`${inter.variable} ${inter.variable} font-inter antialiased bg-background min-h-dvh overflow-hidden w-full`}
      >
        <Suspense fallback={<SuspenseLoader />}>
          <Toaster richColors expand={true} position="top-center" />
          <TooltipProvider>
            <AppProvider>{children}</AppProvider>
            <NextTopLoader showSpinner={false} color="#6F4E37" />
          </TooltipProvider>
        </Suspense>
      </body>
    </html>
  );
}
