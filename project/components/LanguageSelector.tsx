import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const languages = [
  { code: 'fr', name: 'Français', flag: '/flags/fr.svg' },
  { code: 'en', name: 'English', flag: '/flags/gb.svg' },
  { code: 'el', name: 'Ελληνικά', flag: '/flags/gr.svg' },
  { code: 'ru', name: 'Русский', flag: '/flags/ru.svg' },
  { code: 'it', name: 'Italiano', flag: '/flags/it.svg' }
];

export default function LanguageSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (newLocale: string) => {
    const currentPath = pathname;
    const newPath = currentPath.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
    setIsOpen(false);
  };

  // Trouver la langue active
  const activeLanguage = languages.find(lang => lang.code === locale) || languages[0];

  return (
    <div className="relative z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-[#b7a66b]/20 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-sm"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Image
          src={activeLanguage.flag}
          alt={activeLanguage.name}
          width={20}
          height={20}
          className="rounded-full"
        />
        <span className="text-sm font-medium text-gray-700 hidden sm:inline-block">{activeLanguage.name}</span>
        <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden border border-[#b7a66b]/10 backdrop-blur-sm py-1"
          onClick={() => setIsOpen(false)}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-[#b7a66b]/5 transition-colors ${
                locale === lang.code ? 'bg-[#b7a66b]/10 font-medium' : 'text-gray-700'
              }`}
            >
              <Image
                src={lang.flag}
                alt={lang.name}
                width={20}
                height={20}
                className="rounded-full"
              />
              <span className="text-sm">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 