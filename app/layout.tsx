import type { Metadata, Viewport } from "next";
// import { Inter } from 'next/font/google';

import "./globals.css";
import { AppProvider } from "@/lib/provider";
import NextTopLoader from "nextjs-toploader";
import Head from "next/head";
import React, { Suspense } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import SuspenseLoader from "@/components/suspense-loader";
import { inter } from "./fonts";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover", // Ensures better rendering on iOS devices
};

export const metadata: Metadata = {
  title: {
    template: "DocketMaster",
    default: "DocketMaster",
  },
  description: "Court Filing System",
  icons: {
    icon: "/favicon.png", // or "/favicon.ico"
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <Head>
        <title>DocketMaster</title>
        <meta
          name="description"
          content="DocketMaster - Manage your records seamlessly."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"/>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <body className={`${inter.variable} font-inter antialiased bg-background min-h-screen w-full flex flex-col`}>
        <AppProvider>
          <Suspense fallback={<SuspenseLoader />}>
            <Toaster richColors expand={true} position="top-center" />
            <TooltipProvider>
              {children}
              <NextTopLoader showSpinner={false} color="#6F4E37" />
            </TooltipProvider>
          </Suspense>
        </AppProvider>
      </body>
    </html>
  );
}
