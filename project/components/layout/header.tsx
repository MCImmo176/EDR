"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useLanguageContext } from "@/components/providers/language-provider";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage } = useLanguageContext();
  const t = useTranslations();

  // Handle scroll event to change header style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when changing route
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/villa", label: t("nav.villa") },
    { href: "/galerie", label: t("nav.gallery") },
    { href: "/decouvrir", label: t("nav.discover") },
    { href: "/#contact", label: t("nav.contact") },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-background/95 backdrop-blur-sm py-4 shadow-sm"
          : "bg-transparent py-6"
      )}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        <Link href="/" className="relative">
          <Image 
            src="/images/logo.png"
            alt="Les Étoiles du Rocher"
            width={100}
            height={25}
            className="h-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "nav-link",
                pathname === link.href && "active"
              )}
              scroll={link.href.startsWith('/#') ? true : undefined}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/#contact" scroll className="luxury-btn ml-6 px-6 py-2 text-base font-semibold shadow-md hover:scale-105 transition-transform duration-200">
            Demander une visite
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "fixed inset-0 bg-background z-40 flex flex-col justify-center items-center space-y-8 transition-all duration-300 md:hidden",
            isMobileMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "nav-link text-xl",
                pathname === link.href && "active"
              )}
              scroll={link.href.startsWith('/#') ? true : undefined}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/#contact" scroll className="luxury-btn px-8 py-3 text-lg font-semibold shadow-md hover:scale-105 transition-transform duration-200">
            Demander une visite
          </Link>
        </div>
      </div>
    </header>
  );
}