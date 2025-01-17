import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Login',
};


export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="overflow-hidden w-full min-h-dvh">
      {children}
    </main>
  );
}
