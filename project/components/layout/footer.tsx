"use client";

import Link from "next/link";
import { useLanguage } from "@/components/providers/language-provider";
import { cn } from "@/lib/utils";

type Language = "fr" | "en" | "it" | "el" | "ru";

export function Footer() {
  const { language, setLanguage, t } = useLanguage();

  const languageOptions: { code: Language; label: string; flag: string }[] = [
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "it", label: "Italiano", flag: "🇮🇹" },
    { code: "el", label: "Ελληνικά", flag: "🇬🇷" },
    { code: "ru", label: "Русский", flag: "🇷🇺" },
  ];

  return (
    <footer className="border-t border-border py-12">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="space-y-6 md:space-y-0 md:space-x-6 flex flex-col md:flex-row items-center mb-8 md:mb-0">
            <Link 
              href="/terms" 
              className="text-sm text-muted-foreground underline-animation"
            >
              {t("footer.terms")}
            </Link>
            <Link 
              href="/sales-terms" 
              className="text-sm text-muted-foreground underline-animation"
            >
              {t("footer.sales")}
            </Link>
          </div>
          
          <div className="language-switcher">
            {languageOptions.map((option) => (
              <button
                key={option.code}
                onClick={() => setLanguage(option.code)}
                className={cn(language === option.code && "active")}
                title={option.label}
                aria-label={`Switch to ${option.label}`}
              >
                <span className="text-lg">{option.flag}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border text-center text-muted-foreground text-xs">
          <p>© {new Date().getFullYear()} Villa Azur. {t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
}