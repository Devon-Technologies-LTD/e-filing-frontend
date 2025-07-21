import React, { useState, useEffect } from "react";
import { cn, getAuthorizedLinks } from "@/lib/utils";
import { Button } from "./ui/button";
import { ROLES } from "@/types/auth";
import { useAppSelector } from "@/hooks/redux";
import { clearCaseTypeError, clearForm } from "@/redux/slices/case-filing-slice";
import { useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { LogoIcon } from "./svg/logoIcon";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { NavItem } from "@/types/nav";
import { TextHeader } from "./textHeader";
import HelpCircleComponent from "./help-circle";
import Notifications from "./notifications";
import { UserNav } from "./user-nav";

export function DashboardHeader() {
  const { data: user } = useAppSelector((state) => state.profile);
  const dispatch = useDispatch();
  const router = useRouter();
  const navLinks = getAuthorizedLinks(user?.role as ROLES);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when changing routes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  if (!user?.role) return null;

  const handleNavClick = () => {
    dispatch(clearForm());
    dispatch(clearCaseTypeError());
    setMenuOpen(false);
  };

  const handleFileCase = () => {
    dispatch(clearForm());
    dispatch(clearCaseTypeError());
    router.push("/case-filing");
    setMenuOpen(false);
  };

  return (
    <>

      <header className="sticky top-0 z-50 w-full py-2 border-b bg-background/95 backdrop-blur-sm shadow-sm supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex gap-6">
              <Link href="/" className="flex items-center gap-2 relative z-20">
                <LogoIcon className="h-7 w-7 md:h-8 md:w-8" />
              </Link>
              <nav className="items-center gap-6 hidden md:flex ">
                {navLinks.map((link) => (
                  <DesktopNavLink key={link.href} {...link} onClick={handleNavClick} />
                ))}

                {[ROLES.LAWYER, ROLES.USER].includes(user.role) && (
                  <Button
                    onClick={handleFileCase}
                    className="uppercase font-medium px-5 py-2 transition-all hover:scale-105"
                    variant="default"
                  >
                    File a Case
                  </Button>
                )}
              </nav>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center space-x-4 border-l pl-4">
                <TextHeader />
                {/* <HelpCircleComponent /> */}
                <Notifications />
                <UserNav />
              </div>
            </div>


            {/* Mobile Menu Button and Right Side Icons */}
            <div className="flex md:hidden items-center gap-2">
              <div className="flex items-center space-x-3">
                <Notifications />
                <UserNav />
              </div>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 ml-2 rounded-md focus:outline-none hover:bg-secondary transition-colors relative z-20"
                aria-label="Toggle navigation menu"
                aria-expanded={menuOpen}
              >
                {menuOpen ? (
                  <X size={24} className="text-black" />
                ) : (
                  <Menu size={24} />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <header>
        <div className={cn(
          "fixed inset-0 bg-slate-100 z-10 transition-opacity h-1/2 duration-300 ease-in-out md:hidden flex flex-col justify-center",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}>
          <div className="flex flex-col items-center justify-center h-1/2">
            <nav className="flex flex-col items-center space-y-6 my-10">
              {navLinks.map((link) => (
                <MobileNavLink key={link.href} {...link} onClick={handleNavClick} />
              ))}

              {[ROLES.LAWYER, ROLES.USER].includes(user.role) && (
                <Button
                  onClick={handleFileCase}
                  className="uppercase font-medium px-5 py-2 transition-all hover:scale-105"
                  variant="default"
                >
                  File a Case
                </Button>
              )}
            </nav>
          </div>
        </div>
      </header>

    </>

  );
}

interface NavLinkProps extends Omit<NavItem, "roles"> {
  className?: string;
  onClick?: () => void;
}

export function DesktopNavLink({ href, title, isActive, className, onClick }: NavLinkProps) {
  const pathname = usePathname();
  const isLinkActive = isActive?.(pathname) || pathname.startsWith(href);

  return (
    <div className="relative group">
      <Link href={href} onClick={onClick}
        className={cn(
          "px-3 py-2 rounded-md text-sm font-medium transition-colors relative",
          isLinkActive
            ? "text-primary font-bold"
            : "text-gray-700 hover:text-primary",
          className
        )}>{title}</Link>
      <div className="my-1"></div>
      <div className={cn(
        "absolute h-1  bg-primary rounded-full left-0 right-0 bottom-0 transition-transform duration-300",
        isLinkActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
      )} />

    </div>
  );
}

export function MobileNavLink({ href, title, isActive, className, onClick }: NavLinkProps) {
  const pathname = usePathname();
  const isLinkActive = isActive?.(pathname) || pathname.startsWith(href);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "text-md font-medium text-black transition-colors relative",
        isLinkActive ? "font-bold" : "",
        className
      )}
    >
      {title}
      {isLinkActive && (
        <div className="absolute h-1 bg-black rounded-full left-0 right-0 -bottom-2"></div>
      )}
    </Link>
  );
}