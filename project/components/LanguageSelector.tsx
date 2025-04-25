import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useLocale } from 'next-intl';

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

  const handleLanguageChange = (newLocale: string) => {
    const currentPath = pathname;
    const newPath = currentPath.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div className="flex items-center space-x-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          className={`flex items-center space-x-1 p-2 hover:bg-gray-100 rounded-full ${
            locale === lang.code ? 'bg-gray-100' : ''
          }`}
          title={lang.name}
        >
          <Image
            src={lang.flag}
            alt={lang.name}
            width={24}
            height={24}
            className="rounded-full"
          />
        </button>
      ))}
    </div>
  );
} 