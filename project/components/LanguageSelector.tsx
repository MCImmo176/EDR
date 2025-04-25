import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

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

  const handleLanguageChange = (lang: string) => {
    const currentPath = pathname;
    const newPath = currentPath.replace(/^\/(fr|en|el|ru|it)/, `/${lang}`);
    router.push(newPath);
  };

  return (
    <div className="flex items-center space-x-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          className="flex items-center space-x-1 p-2 hover:bg-gray-100 rounded-full"
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