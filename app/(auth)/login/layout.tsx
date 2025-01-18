import { LogoIcon } from "@/components/svg/logoIcon";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative w-full min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="w-full bg-white shadow-sm px-2 py-6">
        <div className="flex items-center justify-between mx-8">
          {/* Logo and Title */}
          <div className="flex items-center space-x-2">
            <LogoIcon className="h-6 w-6" />
            <span className="text-sm font-light text-gray-800 col">
              <span>Abuja</span>
              <span>
                E-filling Portal
              </span>
            </span>
          </div>

          {/* Call-to-Action */}
          <div className="hidden md:flex items-center text-app-primary">
            <a
              href="/signup"
              className="text-sm font-medium text-app-primary hover:underline"
            >
              Create an Account
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {children}
      </section>
    </main>
  );
}
