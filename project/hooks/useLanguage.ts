import { useTranslations } from 'next-intl';

export function useLanguage() {
  const t = useTranslations();
  const tCommon = useTranslations('common');
  const tHome = useTranslations('home');
  const tAbout = useTranslations('about');
  const tVilla = useTranslations('villa');
  const tGallery = useTranslations('gallery');
  const tContact = useTranslations('contact');
  const tInfo = useTranslations('info');

  return {
    t,
    tCommon,
    tHome,
    tAbout,
    tVilla,
    tGallery,
    tContact,
    tInfo
  };
} 